import React from "react";

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
  return (
    <>
      <div className="text-gray-600 bg-white dark:bg-[#0b1121] dark:text-white font-[Poppins]">
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
          className="py-0 lg:py-3 mx-1 lg:mx-0 transition-all ease-linear duration-500 lg:pb-[5rem]"
        >
          <div className="bg-gray-100 dark:bg-gray-900">
            <CarouselProvider
              className="overflow-hidden"
              naturalSlideWidth={100}
              naturalSlideHeight={48}
              totalSlides={3}
              isPlaying={true}
              interval={4000}
              playDirection="forward"
              infinite={true}
              orientation="horizontal"
            >
              <div className="relative w-full h-full">
                {/* Fondo negro transparente fijo */}
                <div className="absolute"></div>

                {/* Carrusel */}
                <Slider>
                  <Slide index={0}>
                    <img
                      src="/img/slide1.jpg"
                      alt="Slide 1"
                      className="w-full h-full object-cover"
                    />
                    {/* Texto fijo solo en la primera imagen */}
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 pl-8 text-white text-3xl font-bold z-20">
                      Wedding
                    </div>
                  </Slide>
                  <Slide index={1}>
                    <img
                      src="/img/slide2.jpg"
                      alt="Slide 2"
                      className="w-full h-full object-cover"
                    />
                  </Slide>
                  <Slide index={2}>
                    <img
                      src="/img/slide3.jpg"
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

        <section className="mx-12 lg:mx-16">
          <div className="container px-5 pt-6 pb-14 mx-auto">
            {/* <div className="container px-5 pt-6 pb-14 mx-auto"> */}
            <div className="flex flex-col text-center w-full mb-14">
              <h1 className="lg:text-4xl text-2xl font-bold title-font">
                Thinking about services?
              </h1>
              <h2 className="text-lg text-pink-500 tracking-widest font-bold title-font mb-1">
                Let Me Help You
              </h2>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="flex flex-wrap -m-4"
            >
              <motion.div
                variants={fadeIn("right", "tween", 0.2, 1)}
                className="p-4 md:p-1 lg:p-4 md:w-1/3"
              >
                <div className="flex rounded-lg h-full bg-gray-200 dark:bg-gray-800 p-8 flex-col">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-pink-500 text-white flex-shrink-0">
                      <span className="text-2xl">
                        <FaFilm />
                      </span>
                    </div>
                    <h2 className=" text-lg title-font font-medium">Videos </h2>
                  </div>
                  <div className="flex-grow">
                    <p className="leading-relaxed text-base">
                      We have added some videos so that you can watch them and
                      then you can decide.
                    </p>
                    <Link
                      to="/video"
                      className="mt-3 text-pink-500 inline-flex items-center"
                    >
                      <button className="inline-flex text-white bg-pink-500 border-0 py-2 px-6 md:py-2 md:px-2 lg:py-2 lg:px-6 focus:outline-none hover:bg-pink-600 rounded text-lg">
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
                <div className="flex rounded-lg h-full bg-gray-200 dark:bg-gray-800 p-8 flex-col">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-pink-500 text-white flex-shrink-0">
                      <span className="text-2xl">
                        <AiOutlineSetting />
                      </span>
                    </div>
                    <h2 className=" text-lg title-font font-medium">
                      Our Services
                    </h2>
                  </div>
                  <div className="flex-grow">
                    <p className="leading-relaxed text-base">
                      Caribephoto makes your wedding's Visual Experience Awesome
                      with our services.
                    </p>
                    <Link
                      to="/services"
                      className="mt-3 text-pink-500 inline-flex items-center"
                    >
                      <button className="inline-flex text-white bg-pink-500 border-0 py-2 px-6 md:py-2 md:px-2 lg:py-2 lg:px-6 focus:outline-none hover:bg-pink-600 rounded text-lg">
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
                <div className="flex rounded-lg h-full bg-gray-200 dark:bg-gray-800 p-8 flex-col">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-pink-500 text-white flex-shrink-0">
                      <span className="text-2xl">
                        <FaFileAlt />
                      </span>
                    </div>
                    <h2 className=" text-lg title-font font-medium">
                      Terms & Conditions
                    </h2>
                  </div>
                  <div className="flex-grow">
                    <p className="leading-relaxed text-base">
                      Read the terms and conditions included in our packages.
                    </p>
                    <Link
                      to="/terms"
                      className="mt-3 text-pink-500 inline-flex items-center"
                    >
                      <button className="inline-flex text-white bg-pink-500 border-0 py-2 px-6 md:py-2 md:px-2 lg:py-2 lg:px-6 focus:outline-none hover:bg-pink-600 rounded text-lg">
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
