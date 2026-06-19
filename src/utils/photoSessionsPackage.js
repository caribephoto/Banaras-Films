// Professional Photo Session at Bavaro Beach — currently DR-only.
// Booking reference (external listing on Booking.com):
// https://www.booking.com/attractions/en-gb/prru7zya2zen-professional-photo-session-at-a-bavaro-beach.html

const photoSessions = [
  {
    id: 'photo-session-bavaro',
    title: 'Professional Photoshoot in Punta-Cana',
    // Wide landscape WebP banner for the card header (1920×720 cover crop).
    img: '/img/punta-cana/bavaro-03.webp',
    // Each gallery entry has a small thumb (~15-20 kB) for the grid
    // and a full-size WebP (~100-400 kB) for the lightbox.
    gallery: Array.from({ length: 21 }, (_, i) => {
      const n = String(i + 2).padStart(2, '0');
      return {
        thumb: `/img/punta-cana/bavaro-${n}-thumb.webp`,
        full: `/img/punta-cana/bavaro-${n}.webp`,
      };
    }),
    content: [
      'Up to 4 people',
      'Professional Photographer',
      'Bottled water',
      '1 hour professional photoshoot',
      'Private transportation',
      '50 pictures with manual single-frame color correction in Lightroom',
    ],
    additionalInfo: [
      'Infants are required to sit on an adult’s lap',
      'Specialized infant seats are not available',
      'Suitable for all physical fitness levels',
      'Not wheelchair accessible',
      'You need to be 18 years or older to book',
    ],
    bookingUrl:
      'https://www.booking.com/attractions/en-gb/prru7zya2zen-professional-photo-session-at-a-bavaro-beach.en-gb.html',
    usdPrice: 450,
    paxIncluded: 4,
    countries: ['DO'],
    category: 'photo-session',
  },
];

export { photoSessions };
