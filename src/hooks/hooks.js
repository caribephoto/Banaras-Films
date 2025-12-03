import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useDocumentTitle = (title) => {
  const location = useLocation();

  useEffect(() => {
    document.title =
      location.pathname === "/"
        ? "Caribephoto - Destination Wedding"
        : `${title} | CaribePhoto - Destination Wedding`;
  }, [title, location.pathname]);

  return null;
};

export const useTakeMeToTheTop = () => {
  const location = useLocation();
  useEffect(() => {
    window.scroll(0, 0);
  }, [location]);
};
