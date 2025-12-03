import React, { useState } from "react";
import { useDocumentTitle, useTakeMeToTheTop } from "../hooks/hooks";
import VideoCard from "../components/VideoCard";
import { motion } from "framer-motion";
import { marriageVideo } from "../utils/data";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Modal,
  IconButton,
  Stack
} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PlaceIcon from '@mui/icons-material/Place';
import CloseIcon from '@mui/icons-material/Close';

const Video = () => {
  useDocumentTitle("Video");
  useTakeMeToTheTop();

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState("");

  const handleVideoClick = (videoId, title) => {
    setSelectedVideo(videoId);
    setSelectedTitle(title);
  };

  const closeModal = () => {
    setSelectedVideo(null);
    setSelectedTitle("");
  };


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
          Video Gallery
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ pb: 5 }}>
        <Grid container spacing={3} justifyContent="center">
          {marriageVideo.map((item) => (
            <Grid key={item.id} item xs={12} sm={6} md={4} display="flex" justifyContent="center">
              <VideoCard item={item} onOpen={handleVideoClick} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Modal for expanded video */}
      <Modal
        open={!!selectedVideo}
        onClose={closeModal}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "rgba(0,0,0,0.8)",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100vw",
            height: "100vh",
            bgcolor: "black",
            borderRadius: 0,
            outline: "none",
          }}
        >
          {/* Botón cerrar centrado abajo */}
          <IconButton
            onClick={closeModal}
            sx={{
              position: "absolute",
              bottom: 20,
              left: "50%",
              transform: "translateX(-50%)",
              color: "white",
              bgcolor: "rgba(0,0,0,0.6)",
              width: 56,
              height: 56,
              "&:hover": { bgcolor: "primary.main" },
              zIndex: 20,
            }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>

          {/* Video FULL */}
          <iframe
            style={{
              width: "100%",
              height: "100%",
              border: "none",
            }}
            src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&controls=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Box>
      </Modal>


    </Box>
  );
};

export default Video;
