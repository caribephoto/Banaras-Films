import React, { useState, useEffect } from "react";

import { AiOutlineSetting } from "react-icons/ai";
import { FaFileAlt, FaFilm } from "react-icons/fa";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { Link } from "react-router-dom";
import { useDocumentTitle, useTakeMeToTheTop } from "../components/hooks/hooks";
import { fadeIn, staggerContainer } from "../components/data/motions";
import { motion } from "framer-motion";

const Home = () => {
  useDocumentTitle("");
  useTakeMeToTheTop();

  // Array con todas las imágenes disponibles para el carrusel
  const allSlideImages = [
    "/img/slide1.jpg",
    "/img/slide2.jpg",
    "/img/slide3.jpg",
    "/img/slide-1.jpg",
    "/img/slide-2.jpg",
    "/img/slide-3.jpg",
    "/img/slide-4.jpg",
    "/img/slide-5.jpg",
    "/img/slide-6.jpg",
  ];

  // Estado para almacenar las imágenes seleccionadas aleatoriamente
  const [selectedImages, setSelectedImages] = useState([]);

  // Función para mezclar y seleccionar imágenes aleatorias
  useEffect(() => {
    const shuffleArray = (array) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    // Mezclar y seleccionar 3 imágenes aleatorias
    const shuffled = shuffleArray(allSlideImages);
    setSelectedImages(shuffled.slice(0, 3));
  }, []); // Se ejecuta solo una vez al montar el componente

  // Mostrar un placeholder mientras se cargan las imágenes
  if (selectedImages.length === 0) {
    return null;
  }
  return (
    <>
      <div className="text-gray-600 bg-white dark:bg-[#0b1121] dark:text-white font-[Poppins] pb-0">
        {/* Hero Section */}

        {/* The Carousel */}

        <motion.div
          initial={{ y: -500 }}
          animate={{ y: 0 }}
          transition={{
            duration: 0.2,
            stiffness: 100,
            type: "spring",
            damping: 10,
          }}
          className="py-4 lg:py-8 mx-4 lg:mx-8 transition-all ease-linear duration-500"
        >
          <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
            <CarouselProvider
              className="overflow-hidden"
              naturalSlideWidth={100}
              naturalSlideHeight={45}
              totalSlides={3}
              isPlaying={true}
              interval={4000}
              playDirection="forward"
              infinite={true}
              orientation="horizontal"
            >
              <div className="relative w-full h-full">
                {/* Overlay gradient for better text visibility */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent z-10 pointer-events-none"></div>

                {/* Carrusel */}
                <Slider>
                  <Slide index={0}>
                    <img
                      src={selectedImages[0]}
                      alt="Slide 1"
                      className="w-full h-full object-cover"
                    />
                    {/* Texto mejorado con mejor diseño */}
                    <div className="absolute top-1/2 left-8 lg:left-16 transform -translate-y-1/2 z-20">
                      <h1 className="text-4xl lg:text-6xl font-bold text-white mb-2 drop-shadow-2xl">
                        Wedding
                      </h1>
                      <p className="text-lg lg:text-xl text-white/90 font-light drop-shadow-lg">
                        Destination Photography
                      </p>
                    </div>
                  </Slide>
                  <Slide index={1}>
                    <img
                      src={selectedImages[1]}
                      alt="Slide 2"
                      className="w-full h-full object-cover"
                    />
                  </Slide>
                  <Slide index={2}>
                    <img
                      src={selectedImages[2]}
                      alt="Slide 3"
                      className="w-full h-full object-cover"
                    />
                  </Slide>
                </Slider>
              </div>
            </CarouselProvider>
          </div>
        </motion.div>
        {/* Thinking about Pricing & Services ? */}

        <section className="mx-4 lg:mx-16 mt-12 lg:mt-20 mb-0 pb-0">
          <div className="container px-5 pt-6 pb-0 mx-auto">
            <div className="flex flex-col text-center w-full mb-16">
              <h2 className="text-sm text-pink-500 tracking-widest font-semibold title-font mb-2 uppercase">
                Explore Our Services
              </h2>
              <h1 className="lg:text-5xl text-3xl font-bold title-font mb-4">
                Thinking about services?
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-600 dark:text-gray-400">
                Let us help you capture your special moments with our professional photography and videography services
              </p>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="flex flex-wrap -m-4 pb-0"
            >
              <motion.div
                variants={fadeIn("right", "tween", 0.2, 1)}
                className="p-4 md:p-1 lg:p-4 md:w-1/3"
              >
                <div className="flex rounded-2xl h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-8 flex-col shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 mr-4 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 text-white flex-shrink-0 shadow-lg">
                      <span className="text-2xl">
                        <FaFilm />
                      </span>
                    </div>
                    <h2 className="text-xl title-font font-bold">Videos</h2>
                  </div>
                  <div className="flex-grow">
                    <p className="leading-relaxed text-base mb-4">
                      We have added some videos so that you can watch them and
                      then you can decide.
                    </p>
                    <Link
                      to="/video"
                      className="mt-3 text-pink-500 inline-flex items-center"
                    >
                      <button className="inline-flex text-white bg-gradient-to-r from-pink-500 to-pink-600 border-0 py-3 px-8 focus:outline-none hover:from-pink-600 hover:to-pink-700 rounded-lg text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300">
                        Show Videos
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
              <motion.div
                variants={fadeIn("right", "tween", 0.4, 1)}
                className="p-4 md:p-1 lg:p-4 md:w-1/3"
              >
                <div className="flex rounded-2xl h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-8 flex-col shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 mr-4 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 text-white flex-shrink-0 shadow-lg">
                      <span className="text-2xl">
                        <AiOutlineSetting />
                      </span>
                    </div>
                    <h2 className="text-xl title-font font-bold">
                      Our Services
                    </h2>
                  </div>
                  <div className="flex-grow">
                    <p className="leading-relaxed text-base mb-4">
                      Caribephoto makes your wedding's Visual Experience Awesome
                      with our services.
                    </p>
                    <Link
                      to="/services"
                      className="mt-3 text-pink-500 inline-flex items-center"
                    >
                      <button className="inline-flex text-white bg-gradient-to-r from-pink-500 to-pink-600 border-0 py-3 px-8 focus:outline-none hover:from-pink-600 hover:to-pink-700 rounded-lg text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300">
                        Show Services
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
              <motion.div
                variants={fadeIn("right", "tween", 0.6, 1)}
                className="p-4 md:p-1 lg:p-4 md:w-1/3"
              >
                <div className="flex rounded-2xl h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-8 flex-col shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 mr-4 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 text-white flex-shrink-0 shadow-lg">
                      <span className="text-2xl">
                        <FaFileAlt />
                      </span>
                    </div>
                    <h2 className="text-xl title-font font-bold">
                      Terms & Conditions
                    </h2>
                  </div>
                  <div className="flex-grow">
                    <p className="leading-relaxed text-base mb-4">
                      Read the terms and conditions included in our packages.
                    </p>
                    <Link
                      to="/terms"
                      className="mt-3 text-pink-500 inline-flex items-center"
                    >
                      <button className="inline-flex text-white bg-gradient-to-r from-pink-500 to-pink-600 border-0 py-3 px-8 focus:outline-none hover:from-pink-600 hover:to-pink-700 rounded-lg text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300">
                        Terms and Conditions
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
