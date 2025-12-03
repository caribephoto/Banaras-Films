// VideoCard.jsx
import { Card, CardMedia, CardContent, Typography, Button, Box } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const VideoCard = ({ item, onOpen }) => {
    const handleClick = () => onOpen(item.videoId, item.coupleName);

    return (
        <Card
            sx={{
                width: "100%",
                maxWidth: 360,
                borderRadius: 3,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                boxShadow: 3,
            }}
            onClick={handleClick}
        >
            <CardMedia
                component="img"
                height="200"
                image={item.thumbnail}
                alt={item.coupleName}
                sx={{ objectFit: "cover" }}
            />

            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" fontWeight="bold" align="center" gutterBottom>
                    {item.coupleName}
                </Typography>

                <Typography variant="body2" align="center" color="text.secondary">
                    {item.venue}, {item.country}
                </Typography>

                <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                    Wedding Video • {item.year}
                </Typography>
            </CardContent>

            <Box sx={{ p: 2 }}>
                <Button
                    fullWidth
                    variant="contained"
                    startIcon={<PlayArrowIcon />}
                    onClick={handleClick}
                >
                    Watch Video
                </Button>
            </Box>
        </Card>
    );
};

export default VideoCard;
