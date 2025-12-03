import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
  Container,
  Stack
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import CloseIcon from "@mui/icons-material/Close";
import CartIcon from "../cart/CartIcon";
import { motion } from "framer-motion";

const Header = (props) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();

  const pages = [
    { name: "Home", link: "/" },
    { name: "Services", link: "/services" },
    { name: "Video", link: "/video" },
    { name: "About", link: "/about" },
    { name: "Terms & Conditions", link: "/terms" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {pages.map((page) => (
          <ListItem key={page.name} disablePadding>
            <ListItemButton
              component={Link}
              to={page.link}
              onClick={handleDrawerToggle}
              selected={location.pathname === page.link}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={page.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={1}
        component={motion.div}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{
          backgroundColor: theme.palette.background.paper,
          backgroundImage: 'none'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            {/* Logo */}
            <Button
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: "flex",
                fontFamily: "Poppins",
                fontWeight: 700,
                fontSize: "1.5rem",
                color: "text.primary",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              Caribephoto
            </Button>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: "flex", gap: 2 }}>
                {pages.map((page) => (
                  <Button
                    key={page.name}
                    component={Link}
                    to={page.link}
                    sx={{
                      my: 2,
                      color: location.pathname === page.link ? "primary.main" : "text.primary",
                      display: "block",
                      fontWeight: location.pathname === page.link ? 600 : 400,
                      "&:hover": {
                        color: "primary.main",
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    {page.name}
                  </Button>
                ))}
              </Box>
            )}

            {/* Right Side: Cart & Theme Toggle & Mobile Menu */}
            <Stack direction="row" spacing={1} alignItems="center">
              <Box sx={{ mr: 1 }}>
                <CartIcon />
              </Box>

              <IconButton
                sx={{ ml: 1 }}
                onClick={() => props.setTheme(props.theme === "dark" ? "light" : "dark")}
                color="inherit"
              >
                {props.theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>

              {isMobile && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ ml: 1 }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Box component="nav">
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 240,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Spacer for fixed AppBar */}
      <Toolbar />
    </>
  );
};

export default Header;
