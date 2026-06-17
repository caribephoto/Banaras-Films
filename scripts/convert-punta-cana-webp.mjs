#!/usr/bin/env node
/**
 * Convert Bavaro Beach JPGs to WebP in two sizes:
 *   - Full:  <name>.webp        — max 1600px wide, quality 80 (lightbox)
 *   - Thumb: <name>-thumb.webp  — max 400px wide,  quality 75 (gallery grid)
 *
 * Also produces a landscape banner for the card header:
 *   - banner.webp — 1920×720 cover crop of `nickelodeon-punta-cana.jpg`
 *     (replace this source with a better landscape photo when available).
 *
 * Usage:  node scripts/convert-punta-cana-webp.mjs
 */
import sharp from 'sharp';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public', 'img');
const GALLERY_DIR = path.join(PUBLIC_DIR, 'punta-cana');

const fmt = (n) => `${n.toFixed(1)} kB`;

async function convertGallery() {
    const files = (await fs.readdir(GALLERY_DIR))
        .filter((f) => /^bavaro-\d+\.jpe?g$/i.test(f))
        .sort();

    if (!files.length) {
        console.warn('No bavaro-*.jpg files found in', GALLERY_DIR);
        return;
    }

    let totalIn = 0;
    let totalOut = 0;
    for (const f of files) {
        const src = path.join(GALLERY_DIR, f);
        const stem = path.parse(f).name; // e.g. bavaro-01
        const fullOut = path.join(GALLERY_DIR, `${stem}.webp`);
        const thumbOut = path.join(GALLERY_DIR, `${stem}-thumb.webp`);

        const inStat = await fs.stat(src);
        totalIn += inStat.size;

        await sharp(src)
            .rotate()
            .resize({ width: 1600, withoutEnlargement: true })
            .webp({ quality: 80 })
            .toFile(fullOut);

        await sharp(src)
            .rotate()
            .resize({ width: 400, height: 400, fit: 'cover', position: 'attention' })
            .webp({ quality: 75 })
            .toFile(thumbOut);

        const [fullStat, thumbStat] = await Promise.all([fs.stat(fullOut), fs.stat(thumbOut)]);
        totalOut += fullStat.size + thumbStat.size;
        console.log(`  ${f}  →  ${stem}.webp (${fmt(fullStat.size / 1024)}) + ${stem}-thumb.webp (${fmt(thumbStat.size / 1024)})`);
    }

    console.log('\nGallery totals:');
    console.log(`  input  (JPG):     ${fmt(totalIn / 1024)}`);
    console.log(`  output (WebPx2):  ${fmt(totalOut / 1024)}`);
    console.log(`  savings:          ${((1 - totalOut / totalIn) * 100).toFixed(1)}%`);
}

async function makeBanner() {
    const candidate = path.join(PUBLIC_DIR, 'nickelodeon-punta-cana.jpg');
    const out = path.join(GALLERY_DIR, 'banner.webp');
    try {
        await fs.access(candidate);
    } catch {
        console.warn('Skipping banner: source missing —', candidate);
        return;
    }
    await sharp(candidate)
        .rotate()
        .resize({ width: 1920, height: 720, fit: 'cover', position: 'attention' })
        .webp({ quality: 78 })
        .toFile(out);
    const stat = await fs.stat(out);
    console.log(`\nBanner: ${path.basename(out)} (${fmt(stat.size / 1024)}) — sourced from nickelodeon-punta-cana.jpg`);
    console.log('  Replace with a better landscape photo by overwriting punta-cana/banner-source.jpg and re-running.');
}

(async () => {
    console.log('Converting Punta Cana gallery to WebP…\n');
    await convertGallery();
    await makeBanner();
    console.log('\nDone.');
})().catch((err) => {
    console.error(err);
    process.exit(1);
});
