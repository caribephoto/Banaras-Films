import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDocumentTitle, useTakeMeToTheTop } from "../hooks/hooks";
import { fadeIn, staggerContainer } from "../utils/motions";
import { motion } from "framer-motion";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Avatar,
  useTheme
} from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import MovieIcon from '@mui/icons-material/Movie';
import DescriptionIcon from '@mui/icons-material/Description';

const Home = () => {
  useDocumentTitle("");
  useTakeMeToTheTop();
  const theme = useTheme();

  const allSlideImages = [
    "/img/slide1.jpg",
    "/img/slide2.jpg",
    "/img/slide3.jpg",
    "/img/slide-1.jpg",
    "/img/slide-2.jpg",
    "/img/slide-3.jpg",
    "/img/slide-4.jpg",
    "/img/slide-6.jpg",
  ];

  const [selectedImages, setSelectedImages] = useState([]);
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    const uniqueWithRandomQuery = allSlideImages.map(
      img => `${img}?rand=${Math.random()}`
    );

    const shuffled = shuffleArray(uniqueWithRandomQuery);
    setSelectedImages(shuffled.slice(0, 6));
  }, []);

  const services = [
    {
      icon: <MovieIcon sx={{ fontSize: 30 }} />,
      title: "Videos",
      description: "We have added some videos so that you can watch them and then you can decide.",
      link: "/video",
      buttonText: "Show Videos"
    },
    {
      icon: <SettingsIcon sx={{ fontSize: 30 }} />,
      title: "Our Services",
      description: "Caribephoto makes your wedding's Visual Experience Awesome with our services.",
      link: "/services",
      buttonText: "Show Services"
    },
    {
      icon: <DescriptionIcon sx={{ fontSize: 30 }} />,
      title: "Terms & Conditions",
      description: "Read the terms and conditions included in our packages.",
      link: "/terms",
      buttonText: "Terms and Conditions"
    }
  ];

  if (selectedImages.length === 0) {
    return null;
  }

  return (
    <Box sx={{ bgcolor: "background.default", color: "text.primary", pb: 0 }}>
      {/* Hero Carousel */}
      <Box
        component={motion.div}
        initial={{ y: -500 }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.2,
          stiffness: 100,
          type: "spring",
          damping: 10,
        }}
        sx={{ py: { xs: 2, lg: 4 }, px: { xs: 2, lg: 4 } }}
      >
        <Box sx={{
          bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100',
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: 6
        }}>
          <CarouselProvider
            className="overflow-hidden"
            naturalSlideWidth={200}
            naturalSlideHeight={85}
            totalSlides={5}
            isPlaying={true}
            interval={6000}
            playDirection="backward"
            infinite={true}
            orientation="horizontal"
          >
            <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
              <Box sx={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, rgba(0,0,0,0.4), transparent)',
                zIndex: 10,
                pointerEvents: 'none'
              }} />

              <Slider>
                <Slide index={0}>
                  <img
                    src={selectedImages[0]}
                    alt="Slide 1"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />

                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: { xs: 4, lg: 8 },
                      transform: 'translateY(-50%)',
                      zIndex: 20,
                    }}
                  >
                    <Typography
                      variant="h2"
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        textShadow: "0 10px 30px rgba(0,0,0,0.5)",
                        fontSize: {
                          xs: "1.5rem",   // móviles
                          sm: "2rem",     // tablets pequeñas
                          md: "3rem",     // laptops
                          lg: "3.75rem"   // pantallas grandes
                        }
                      }}
                    >
                      Wedding
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        color: "rgba(255,255,255,0.9)",
                        fontWeight: 300,
                        textShadow: "0 5px 15px rgba(0,0,0,0.5)",
                        fontSize: {
                          xs: "0.9rem",
                          sm: "1.1rem",
                          md: "1.3rem",
                          lg: "1.5rem"
                        }
                      }}
                    >
                      Destination Photography
                    </Typography>
                  </Box>
                </Slide>

                <Slide index={1}>
                  <img
                    src={selectedImages[1]}
                    alt="Slide 2"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Slide>
                <Slide index={2}>
                  <img
                    src={selectedImages[2]}
                    alt="Slide 3"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Slide>
                <Slide index={3}>
                  <img
                    src={selectedImages[3]}
                    alt="Slide 4"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Slide>
                <Slide index={4}>
                  <img
                    src={selectedImages[4]}
                    alt="Slide 5"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Slide>
              </Slider>
            </Box>
          </CarouselProvider>
        </Box>
      </Box>

      {/* Services Section */}
      <Container maxWidth="lg" sx={{ mt: { xs: 6, lg: 10 }, mb: 8, pb: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="overline"
            color="primary"
            sx={{
              fontWeight: 600,
              letterSpacing: 2,
              display: 'block',
              mb: 1,
              fontSize: {
                xs: "0.9rem",
                sm: "1.1rem",
                md: "1.3rem",
                lg: "1.5rem"
              }
            }}
          >
            Explore Our Services
          </Typography>
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold"
            sx={{
              fontSize: {
                xs: "1.5rem",
                sm: "2rem",
                md: "3rem",
                lg: "3.75rem"
              }
            }}>
            Thinking about services?
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              maxWidth: '66%', mx: 'auto',
              fontSize: {
                xs: "0.9rem",
                sm: "1.1rem",
                md: "1.3rem",
                lg: "1.5rem"
              }
            }}
          >
            Let us help you capture your special moments with our professional photography and videography services
          </Typography>
        </Box>

        <Grid
          container
          spacing={3}
          component={motion.div}
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          sx={{ pb: 4 }}
        >
          {services.map((service, index) => (
            <Grid
              item
              xs={12}
              md={4}
              key={index}
              component={motion.div}
              variants={fadeIn("right", "tween", 0.2 * (index + 1), 1)}
              sx={{ display: 'flex' }}
            >
              <Card
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(to bottom right, rgba(255,255,255,0.05), rgba(255,255,255,0.02))'
                    : 'linear-gradient(to bottom right, #fafafa, #f5f5f5)',
                  borderRadius: 4,
                  boxShadow: 3,
                  transition: 'all 0.3s',
                  border: `1px solid ${theme.palette.divider}`,
                  '&:hover': {
                    boxShadow: 8,
                    transform: 'translateY(-8px)',
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 4, display: 'flex', flexDirection: 'column', maxWidth: { xs: "100%", md: "360px" } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: 'primary.main',
                        width: 56,
                        height: 56,
                        mr: 2,
                        background: 'linear-gradient(to bottom right, #ec4899, #db2777)',
                        boxShadow: 3
                      }}
                    >
                      {service.icon}
                    </Avatar>
                    <Typography variant="h6" component="h2" fontWeight="bold" sx={{
                      fontSize: {
                        xs: "0.9rem",
                        sm: "1.1rem",
                        md: "1.3rem",
                        lg: "1.5rem"
                      }
                    }}>
                      {service.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph sx={{
                    fontSize: {
                      xs: "0.9rem",
                      sm: "1.1rem",
                      md: "1.3rem",
                      lg: "1.0rem"
                    }
                  }}>
                    {service.description}
                  </Typography>
                  <Button
                    component={Link}
                    to={service.link}
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 'auto',
                      background: 'linear-gradient(to right, #ec4899, #db2777)',
                      '&:hover': {
                        background: 'linear-gradient(to right, #db2777, #be185d)',
                        boxShadow: 4,
                      },
                      borderRadius: 2,
                      py: 1.5,
                      fontWeight: 600,
                      boxShadow: 2,

                      fontSize: {
                        xs: "0.9rem",
                        sm: "1.1rem",
                        md: "1.0rem",
                        lg: "1.0rem"
                      }
                    }}
                  >
                    {service.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
