import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import Video from "./pages/Video";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Error from "./components/common/Error";
import Cart from "./components/cart/Cart";
import Checkout from "./components/cart/Checkout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ThemeProvider, CssBaseline } from "@mui/material";
import getTheme from "./theme/theme";

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "system"
  );

  const element = document.documentElement;
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function onWindowMatch() {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && darkQuery.matches)
    ) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  }

  onWindowMatch();

  useEffect(() => {
    switch (theme) {
      case "dark":
        element.classList.add("dark");
        localStorage.setItem("theme", "dark");
        break;

      case "light":
        element.classList.remove("dark");
        localStorage.setItem("theme", "light");
        break;

      default:
        localStorage.removeItem("theme");
        break;
    }
  }, [theme, element]);

  darkQuery.addEventListener("change", (e) => {
    if (!("theme" in localStorage)) {
      if (e.matches) {
        element.classList.add("dark");
      } else {
        element.classList.remove("dark");
      }
    }
  });

  // Calculate effective theme for MUI
  const systemTheme = darkQuery.matches ? "dark" : "light";
  const effectiveTheme = theme === "system" ? systemTheme : theme;
  const muiTheme = getTheme(effectiveTheme);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <CartProvider>
        <Router>
          <Header theme={theme} setTheme={setTheme} />

          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/video" element={<Video />} />
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<Error />} />
          </Routes>
          <Footer />
          <ScrollToTop />
        </Router>
        <ToastContainer />
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
