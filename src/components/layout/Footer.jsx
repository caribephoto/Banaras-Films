import React from "react";
import {
  AiOutlineMail,
  AiOutlineWhatsApp,
  AiOutlineYoutube,
} from "react-icons/ai";
import { FiFacebook, FiInstagram, FiPhoneCall } from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";
import { handleCopyText } from "../../utils/data";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Link,
  Divider,
  Stack,
  useTheme
} from "@mui/material";

const Footer = () => {
  const theme = useTheme();

  const socialIcons = [
    { icon: <AiOutlineMail />, href: "mailto:info@caribephoto.com", label: "Email" },
    { icon: <FiPhoneCall />, action: () => handleCopyText("9841578632"), label: "Phone" },
    { icon: <AiOutlineWhatsApp />, href: "https://wa.me/+529841578632", label: "WhatsApp" },
    { icon: <FiFacebook />, href: "https://www.facebook.com/CaribePhoto", label: "Facebook" },
    { icon: <FiInstagram />, href: "https://www.instagram.com/caribephoto", label: "Instagram" },
    { icon: <AiOutlineYoutube />, href: "https://www.youtube.com/@CaribephotoRM", label: "YouTube" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        pt: 8,
        pb: 4,
        fontFamily: "Poppins"
      }}
    >
      {/* Contact Section */}
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}>
            Contact Now
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: { xs: "0.9rem", md: "1.1rem" } }}>
            We are always ready to hear you. <br />
            For any query like bookings, pricings, availability, please feel free to contact us.
          </Typography>

          <Grid container spacing={2} justifyContent="center" sx={{ mt: 2, width: { xs: "80%", sm: "80%", md: "60%" }, mx: "auto" }}>
            {socialIcons.map((item, index) => (
              <Grid item key={index}>
                {item.href ? (
                  <IconButton
                    component="a"
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    sx={{
                      border: 1,
                      borderColor: "divider",
                      p: 2,
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                      '&:hover': {
                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                      }
                    }}
                  >
                    <Box sx={{ fontSize: "1.5rem", display: "flex" }}>
                      {item.icon}
                    </Box>
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={item.action}
                    sx={{
                      border: 1,
                      borderColor: "divider",
                      p: 2,
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                      '&:hover': {
                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                      }
                    }}
                  >
                    <Box sx={{ fontSize: "1.5rem", display: "flex" }}>
                      {item.icon}
                    </Box>
                  </IconButton>
                )}
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Promo Section */}
        <Box sx={{ mb: 10 }}>
          <Grid
            container
            spacing={4}
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            {/* TITULOS */}
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h3"
                  fontWeight="800"
                  sx={{
                    textTransform: "uppercase",
                    mb: 1,
                    fontSize: { xs: "1.8rem", md: "2.5rem" }
                  }}
                >
                  Invest Once
                </Typography>

                <Typography
                  variant="h3"
                  fontWeight="800"
                  sx={{
                    textTransform: "uppercase",
                    fontSize: { xs: "1.8rem", md: "2.5rem" }
                  }}
                >
                  Enjoy Forever
                </Typography>
              </Box>
            </Grid>

            {/* IMAGEN */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Box
                  component="img"
                  src="/img/footer.jpg"
                  alt="hero"
                  sx={{
                    width: "100%",
                    maxWidth: 500,       // 🔥 Imagen más grande
                    borderRadius: 4,
                    boxShadow: 4
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Links Section */}
        <Grid container spacing={4} justifyContent={{ xs: 'center', md: 'center' }} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ textTransform: "uppercase" }}>
              Navigations
            </Typography>
            <Stack spacing={1} alignItems={{ xs: 'center', md: 'flex-start' }}>
              <Link component={RouterLink} to="/services" color="inherit" underline="hover">Services</Link>
              <Link component={RouterLink} to="/about" color="inherit" underline="hover">About</Link>
            </Stack>
          </Grid>

          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ textTransform: "uppercase" }}>
              Legal
            </Typography>
            <Stack spacing={1} alignItems={{ xs: 'center', md: 'flex-start' }}>
              <Link component={RouterLink} to="/terms" color="inherit" underline="hover">Terms & Conditions</Link>
            </Stack>
          </Grid>

          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ textTransform: "uppercase" }}>
              Social
            </Typography>
            <Stack spacing={1} alignItems={{ xs: 'center', md: 'flex-start' }}>
              <Link href="mailto:info@caribephoto.com" color="inherit" underline="hover">Email</Link>
              <Link href="https://www.facebook.com/CaribePhoto" target="_blank" rel="noopener" color="inherit" underline="hover">Facebook</Link>
              <Link href="https://wa.me/+529841578632" target="_blank" rel="noopener" color="inherit" underline="hover">Whatsapp</Link>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            All rights reserved. © {new Date().getFullYear()} Caribephoto
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
