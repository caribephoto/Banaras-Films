import React from "react";
import { useDocumentTitle, useTakeMeToTheTop } from "../hooks/hooks";
import { handleCopyText } from "../utils/data";
import { fadeIn, staggerContainer } from "../utils/motions";
import { motion } from "framer-motion";
import about from "../images/about.jpg";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Stack
} from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PersonIcon from '@mui/icons-material/Person';
import VideocamIcon from '@mui/icons-material/Videocam';
import CampaignIcon from '@mui/icons-material/Campaign';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import GroupsIcon from '@mui/icons-material/Groups';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const About = () => {
  useDocumentTitle("About");
  useTakeMeToTheTop();

  const expectations = [
    {
      icon: <PersonIcon sx={{ fontSize: { xs: 48, lg: 64 } }} />,
      title: "Personal Attention",
      description: "You will feel well cared for and heard."
    },
    {
      icon: <VideocamIcon sx={{ fontSize: { xs: 48, lg: 64 } }} />,
      title: "4K Wedding Video",
      description: "You will love your professional wedding film."
    },
    {
      icon: <CampaignIcon sx={{ fontSize: { xs: 48, lg: 64 } }} />,
      title: "Communication",
      description: "We're easily accessible to answer any questions you may have."
    },
    {
      icon: <TaskAltIcon sx={{ fontSize: { xs: 48, lg: 64 } }} />,
      title: "Feel Prepared",
      description: "We'll work with you to craft a wedding film timeline to ensure we capture the moments important to you."
    },
    {
      icon: <GroupsIcon sx={{ fontSize: { xs: 48, lg: 64 } }} />,
      title: "Professional Team",
      description: "Our team conducts themselves in a professional manner that demonstrates respect for your day."
    },
    {
      icon: <PhotoCameraIcon sx={{ fontSize: { xs: 48, lg: 64 } }} />,
      title: "Rapid Moments",
      description: "We know you're excited to see your photos and video quickly."
    }
  ];

  const photographers = [
    {
      location: "Azul Beach Resort Negril - Jamaica",
      role: "Photographer",
      phone: "529841578632",
      email: "jamaica@caribephoto.com",
      image: "jamaica"
    },
    {
      location: "Margaritaville Island Reserve Riviera Maya - Mexico",
      role: "Photographer",
      phone: "7398592004",
      email: "rrmphotoshop@caribephoto.com",
      image: "margarita"
    },
    {
      location: "Margaritaville Island Reserve Riviera Cancun - Mexico",
      role: "Photographer",
      phone: "7080226202",
      email: "mvphotoshop@caribephoto.com",
      image: "cancun"
    },
    {
      location: "Nickelodeon Hotels & Resorts Punta Cana - Dominican Republic",
      role: "Photographer",
      phone: "7080226202",
      email: "mvphotoshop@caribephoto.com",
      image: "dominican"
    }
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary' }}>
      <Box sx={{ textAlign: 'center', py: { xs: 6, lg: 8 } }}>
        <Typography
          variant="h2"
          component="h1"
          fontWeight="800"
          sx={{
            textTransform: 'uppercase',
            fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4.5rem' },
            letterSpacing: 2
          }}
        >
          About Us
        </Typography>
      </Box>

      <Container maxWidth="lg">
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}

          sx={{ textAlign: 'center', mb: 4 }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Box
              component="img"
              src={about}
              alt="about"
              sx={{
                width: "85%",
                maxWidth: 1000,
                borderRadius: 4,
                boxShadow: 6,
              }}
            />
          </Box>

        </Box>

        <Box sx={{ mb: 6 }}>
          <Typography variant="body1" paragraph sx={{ fontSize: { xs: '1rem', lg: '1.25rem' } }}>
            Your wedding day is one of the most important days of your life, and you want to remember it forever. We understand that finding the right videographer for your wedding can be overwhelming. At Caribe Photo, we recognize your concerns and share your dream of a perfect day.
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: { xs: '1rem', lg: '1.25rem' }, pt: 2 }}>
            At Caribephoto, we get it!
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: { xs: '1rem', lg: '1.25rem' }, pt: 2 }}>
            We are here to help make that dream a reality. Over the past decade, we have fulfilled the wishes of thousands of brides from around the world who, like you, wanted their wedding captured in beautiful and unforgettable images through stunning videos and photographs.
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: { xs: '1rem', lg: '1.25rem' }, pt: 2 }}>
            Let's make it real!. Check availability now!
          </Typography>
        </Box>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="center" sx={{ mb: 6 }}>
          <Button
            component="a"
            href="mailto:info@caribephoto.com"
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            startIcon={<EmailIcon />}
            sx={{
              bgcolor: 'grey.600',
              '&:hover': { bgcolor: 'grey.700' },
              px: { xs: 2, lg: 4 },
              py: 1.5
            }}
          >
            <Box component="span" sx={{ display: { xs: 'none', lg: 'block' } }}>Contact via E-mail</Box>
            <Box component="span" sx={{ display: { xs: 'block', lg: 'none' } }}>Contact</Box>
          </Button>

          <Button
            onClick={() => handleCopyText("9889901417")}
            variant="contained"
            startIcon={<PhoneIcon />}
            sx={{
              bgcolor: 'info.main',
              '&:hover': { bgcolor: 'info.dark' },
              px: { xs: 2, lg: 4 },
              py: 1.5
            }}
          >
            <Box component="span" sx={{ display: { xs: 'none', lg: 'block' } }}>Consult on Call</Box>
            <Box component="span" sx={{ display: { xs: 'block', lg: 'none' } }}>Consult</Box>
          </Button>

          <Button
            component="a"
            href="https://wa.me/+529841578632"
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            startIcon={<WhatsAppIcon />}
            sx={{
              bgcolor: 'success.main',
              '&:hover': { bgcolor: 'success.dark' },
              px: { xs: 2, lg: 4 },
              py: 1.5
            }}
          >
            <Box component="span" sx={{ display: { xs: 'none', lg: 'block' } }}>Check on Whatsapp</Box>
            <Box component="span" sx={{ display: { xs: 'block', lg: 'none' } }}>Check</Box>
          </Button>
        </Stack>

        <Typography variant="h4" align="center" gutterBottom sx={{ mt: 8, mb: 6 }}>
          What You Can Expect
        </Typography>

        <Grid
          container
          spacing={4}
          justifyContent="center"
          sx={{ mb: 6 }}
        >
          {expectations.map((item, index) => (
            <Grid
              item
              xs={12}   // 👉 1 por fila en móvil
              sm={6}    // 👉 2 por fila en tablet
              md={4}    // 👉 3 por fila en laptop
              lg={4}    // 👉 3 por fila en desktop
              key={index}
              component={motion.div}
              variants={fadeIn("right", "tween", 0.2 * (index + 1), 1)}
            >
              <Card sx={{ height: "100%", textAlign: "center", borderRadius: 2, width: 350 }}>
                <CardContent>
                  <Box sx={{ color: "primary.main", mb: 2 }}>
                    {item.icon}
                  </Box>
                  <Typography variant="h5" gutterBottom fontWeight="bold">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h4" align="center" gutterBottom sx={{ mt: 8, mb: 4 }}>
          Our Promise to You
        </Typography>

        <Typography variant="body1" paragraph sx={{ fontSize: { xs: '1rem', lg: '1.25rem' }, mb: 6, textAlign: 'center' }}>
          We are committed to exceeding your expectations so you can feel confident that you chose the photographer that is best for your wedding. Our brides rave about the experience they have had working with us and the joy their wedding photos have brought them.
        </Typography>

        <Box
          sx={{
            bgcolor: 'grey.700',
            backgroundImage: 'url("/img/background.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundBlendMode: 'overlay',
            color: 'white',
            py: { xs: 8, md: 10, lg: 16 },
            px: 4,
            my: 6,
            borderRadius: 2
          }}
        >
          <Container maxWidth="md">
            <Typography variant="h4" align="center" gutterBottom>
              Enjoy Your Wedding Forever
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: { xs: '1rem', lg: '1.25rem' }, pt: 2 }}>
              Once you schedule your call, you'll have taken the first step in experiencing the confidence you'll feel knowing you chose the right videographer for you. We believe your wedding day is one of the most important days of your life, and you should be able to re-experience those memories whenever you want. You can be confident Caribephoto capture the special moments of your day and give you a wedding you'll love forever.
            </Typography>
          </Container>
        </Box>

        <Typography variant="h4" align="center" gutterBottom sx={{ mt: 10, mb: 6 }}>
          Meet Our Photographer
        </Typography>

        <Grid
          container
          spacing={4}
          justifyContent="center"
          sx={{ pb: 10 }}
        >
          {photographers.map((photographer, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={index}
              sx={{
                display: "flex",
                justifyContent: "center"
              }}
            >
              <Card
                sx={{
                  height: "380px", // 🔥 ALTURA FIJA para todas
                  width: "280px", // 🔥 ANCHO FIJO para todas
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                  overflow: "hidden", // 🔥 Para que nada se salga
                }}
              >
                <CardContent sx={{
                  flex: 1, // 🔥 Ocupa todo el espacio disponible
                  display: "flex",
                  flexDirection: "column",
                  p: 3,
                  '&:last-child': { pb: 3 } // 🔥 Elimina padding extra
                }}>
                  {/* Imagen del hotel - Parte superior */}
                  <Box sx={{
                    flexShrink: 0,
                    mb: 2,
                    height: "140px",
                    width: "100%",
                    overflow: "hidden",
                    borderRadius: 1,
                    position: "relative"
                  }}>
                    <Box
                      component="img"
                      src={`/img/${photographer.image.toLowerCase().replace(/\s+/g, '-')}.jpg`}
                      alt={`${photographer.image} hotel`}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.05)"
                        }
                      }}
                      onError={(e) => {
                        // Si la imagen no existe, mostrar una imagen por defecto
                        e.target.src = "/img/wedding-vip-12.jpg";
                      }}
                    />
                    {/* Badge del fotógrafo */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        bgcolor: "primary.main",
                        color: "white",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: "0.75rem",
                        fontWeight: "bold"
                      }}
                    >
                      Photographer
                    </Box>
                  </Box>

                  {/* Texto - Parte media que crece */}
                  <Box sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    minHeight: "80px", // 🔥 Espacio mínimo para el texto
                    mb: 2
                  }}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        fontWeight: 600,
                        textAlign: "center",
                        lineHeight: 1.2,
                        fontSize: "1rem", // 🔥 Tamaño fijo
                        height: "2.4em", // 🔥 Altura fija para 2 líneas
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2, // 🔥 Limita a 2 líneas máximo
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {photographer.location}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        textAlign: "center",
                        lineHeight: 1.2
                      }}
                    >
                      {photographer.role}
                    </Typography>
                  </Box>

                  {/* Información de contacto */}
                  <Box sx={{
                    flexShrink: 0,
                    mb: 2,
                    textAlign: "center"
                  }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        display: "block",
                        mb: 0.5
                      }}
                    >
                      Contact:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "0.8rem",
                        fontWeight: 500
                      }}
                    >
                      {photographer.email.split('@')[0]}
                    </Typography>
                  </Box>

                  {/* Botones - Parte inferior fija */}
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    sx={{
                      flexShrink: 0, // 🔥 No se reduce
                      mt: "auto" // 🔥 Empuja hacia abajo
                    }}
                  >
                    <IconButton
                      onClick={() => handleCopyText(photographer.phone)}
                      sx={{
                        bgcolor: "info.main",
                        color: "white",
                        "&:hover": { bgcolor: "info.dark" },
                      }}
                      title="Call photographer"
                    >
                      <PhoneIcon />
                    </IconButton>

                    <IconButton
                      component="a"
                      href={`mailto:${photographer.email}`}
                      sx={{
                        bgcolor: "grey.600",
                        color: "white",
                        "&:hover": { bgcolor: "grey.700" },
                      }}
                      title="Email photographer"
                    >
                      <EmailIcon />
                    </IconButton>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
};

export default About;
