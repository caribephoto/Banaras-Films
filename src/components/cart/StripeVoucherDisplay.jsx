import React from 'react';
import { Box, Typography, Alert, Button, Stack, Paper, Divider } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { toast } from 'react-toastify';

const copy = (text) => {
    navigator.clipboard?.writeText(text);
    toast.success('Copied to clipboard', { autoClose: 1500 });
};

const StripeVoucherDisplay = ({ voucher, paymentMethod }) => {
    if (!voucher) return null;

    if (paymentMethod === 'oxxo' || voucher.hosted_voucher_url) {
        const expires = voucher.expires_after
            ? new Date(voucher.expires_after * 1000).toLocaleString()
            : null;
        return (
            <Paper sx={{ p: 3, mt: 2 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Pay at OXXO
                </Typography>
                <Stack spacing={2}>
                    <Button
                        variant="contained"
                        startIcon={<OpenInNewIcon />}
                        href={voucher.hosted_voucher_url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Open OXXO voucher
                    </Button>
                    {expires && (
                        <Typography variant="body2" color="text.secondary">
                            Expires: <strong>{expires}</strong>
                        </Typography>
                    )}
                    <Alert severity="info">
                        Pay this voucher at any OXXO store. You'll receive a confirmation email within 1–3 business days after payment.
                    </Alert>
                </Stack>
            </Paper>
        );
    }

    // SPEI bank transfer (display_bank_transfer_instructions)
    const spei = voucher.financial_addresses?.[0]?.spei;
    if (paymentMethod === 'customer_balance' || spei) {
        return (
            <Paper sx={{ p: 3, mt: 2 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Pay via SPEI bank transfer
                </Typography>
                <Stack spacing={1.5}>
                    {voucher.reference && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                                <Typography variant="caption" color="text.secondary">Reference</Typography>
                                <Typography fontWeight={600}>{voucher.reference}</Typography>
                            </Box>
                            <Button size="small" startIcon={<ContentCopyIcon />} onClick={() => copy(voucher.reference)}>
                                Copy
                            </Button>
                        </Box>
                    )}
                    {spei?.clabe && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                                <Typography variant="caption" color="text.secondary">CLABE</Typography>
                                <Typography fontWeight={600}>{spei.clabe}</Typography>
                            </Box>
                            <Button size="small" startIcon={<ContentCopyIcon />} onClick={() => copy(spei.clabe)}>
                                Copy
                            </Button>
                        </Box>
                    )}
                    {spei?.bank_name && (
                        <Box>
                            <Typography variant="caption" color="text.secondary">Bank</Typography>
                            <Typography fontWeight={600}>{spei.bank_name}</Typography>
                        </Box>
                    )}
                    <Divider />
                    <Alert severity="info">
                        Transfer to the CLABE above using the reference. You'll receive a confirmation email when the transfer is detected (usually within minutes).
                    </Alert>
                </Stack>
            </Paper>
        );
    }

    return (
        <Alert severity="info" sx={{ mt: 2 }}>
            Your payment is being processed. You'll receive a confirmation email when it completes.
        </Alert>
    );
};

export default StripeVoucherDisplay;
