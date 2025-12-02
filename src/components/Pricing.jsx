import React from "react";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineSetting,
  AiOutlineStar,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaFilm } from "react-icons/fa";
import { useDocumentTitle, useTakeMeToTheTop } from "../components/hooks/hooks";
import { fadeIn, staggerContainer, theOpacity } from "./data/motions";
import { motion } from "framer-motion";

const Pricing = () => {
  useDocumentTitle("Pricing");
  useTakeMeToTheTop();
  return (
    <>
      <motion.div className="text-gray-600 bg-white dark:bg-[#0b1121] dark:text-white font-[Poppins]">
        <div className="headline text-4xl md:text-5xl lg:text-7xl text-center p-12 lg:p-10 tracking-widest ">
          <span className="uppercase font-extrabold">Pricing Plans</span>
        </div>

        <div className="flex flex-col justify-center items-center space-y-1 mx-5 lg:mx-20 pb-10">
          <h2 className="text-base lg:text-xl">
            Check the below plans and choose yourself.
          </h2>

          <div className="flex flex-col justify-start items-start">
            <span className="flex flex-row justify-center items-center space-x-2">
              <span className="text-2xl text-green-500">
                <AiFillCheckCircle />
              </span>
              <span> : INCLUDED in the plan.</span>
            </span>
            <span className="flex flex-row justify-center items-center space-x-2">
              <span className="text-2xl text-red-500">
                <AiFillCloseCircle />
              </span>
              <span> : NOT INCLUDED in the plan.</span>
            </span>
          </div>
        </div>

        <div className="container mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-4 mx-12 lg:mx-16 "
          >
            <motion.div
              variants={theOpacity(0.2, 1)}
              className="basic p-5 bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 rounded-lg flex flex-col justify-center items-start transition duration-500 ease-in hover:shadow-inner hover:shadow-yellow-300"
            >
              <h1 className="text-2xl md:text-2xl lg:text-4xl font-extrabold uppercase tracking-widest bg-gradient-to-br from-yellow-300 to-red-600 text-transparent bg-clip-text">
                Basic
              </h1>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span>Price : </span>
                <span className="font-bold">₹22,000 Only</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl ">
                  <MdOutlineFeaturedPlayList />
                </span>
                <span>Features</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl text-red-500">
                  <AiFillCloseCircle />
                </span>
                <span>Drone Footage of Venue</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl text-red-500">
                  <AiFillCloseCircle />
                </span>
                <span>Crane Shot Visuals</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl text-red-500">
                  <AiFillCloseCircle />
                </span>
                <span>Live Telecast at Night Functions</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl text-red-500">
                  <AiFillCloseCircle />
                </span>
                <span>LED Wall</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl text-green-500">
                  <AiFillCheckCircle />
                </span>
                <span>Guaranteed Delivery within 3 week</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl text-green-500">
                  <AiFillCheckCircle />
                </span>
                <span>15 Sec. Social Media Clip</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl text-red-500">
                  <AiFillCloseCircle />
                </span>
                <span>1 Minute Teaser</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl text-red-500">
                  <AiFillCloseCircle />
                </span>
                <span>7 to 9 Min. Highlight Film</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl text-green-500">
                  <AiFillCheckCircle />
                </span>
                <span>Traditional Feature Film</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl text-green-500">
                  <AiFillCheckCircle />
                </span>
                <span>Wedding Film USB</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl text-green-500">
                  <AiFillCheckCircle />
                </span>
                <span>Photo Album</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl text-green-500">
                  <AiFillCheckCircle />
                </span>
                <span>Unlimited Wedding Day Locations</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl text-green-500">
                  <AiFillCheckCircle />
                </span>
                <span>Industry Leading Film Coloring</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl text-green-500">
                  <AiFillCheckCircle />
                </span>
                <span>Coverage of Haldi, Mehandi, Shaadi</span>
              </span>
            </motion.div>

            <motion.div
              variants={theOpacity(0.6, 1)}
              className="standard p-5 bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 rounded-lg flex flex-col justify-center items-start transition duration-500 ease-in hover:shadow-inner hover:shadow-cyan-400"
            >
              <h1 className="text-2xl md:text-2xl lg:text-4xl font-extrabold uppercase tracking-widest bg-gradient-to-br from-cyan-400 to-red-400 text-transparent bg-clip-text">
                Standard
              </h1>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span>Price : </span>
                <span className="font-bold">₹45,000 Only</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl ">
                  <MdOutlineFeaturedPlayList />
                </span>
                <span>Features</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl text-red-500">
                  <AiFillCloseCircle />
                </span>
                <span>Drone Footage of Venue</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl text-red-500">
                  <AiFillCloseCircle />
                </span>
                <span>Crane Shot Visuals</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl text-red-500">
                  <AiFillCloseCircle />
                </span>
                <span>Live Telecast at Night Functions</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl text-red-500">
                  <AiFillCloseCircle />
                </span>
                <span>LED Wall</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl text-green-500">
                  <AiFillCheckCircle />
                </span>
                <span>Guaranteed Delivery within 2 week</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl text-green-500">
                  <AiFillCheckCircle />
                </span>
                <span>15 Sec. Social Media Clip</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl text-green-500">
                  <AiFillCheckCircle />
                </span>
                <span>1 Minute Teaser</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl text-green-500">
                  <AiFillCheckCircle />
                </span>
                <span>7 to 9 Min. Highlight Film</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl text-green-500">
                  <AiFillCheckCircle />
                </span>
                <span>Cinematic Feature Film</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl text-green-500">
                  <AiFillCheckCircle />
                </span>
                <span>Wedding Film USB</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl text-green-500">
                  <AiFillCheckCircle />
                </span>
                <span>Photo Album</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl text-green-500">
                  <AiFillCheckCircle />
                </span>
                <span>Unlimited Wedding Day Locations</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl text-green-500">
                  <AiFillCheckCircle />
                </span>
                <span>Industry Leading Film Coloring</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl text-green-500">
                  <AiFillCheckCircle />
                </span>
                <span>Coverage of Haldi, Mehandi, Shaadi</span>
              </span>
            </motion.div>

            <motion.div
              variants={theOpacity(1, 1)}
              className="premium p-5 bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 rounded-lg flex flex-col justify-center items-start transition duration-500 ease-in hover:shadow-inner hover:shadow-purple-400"
            >
              <h1 className="text-2xl md:text-2xl lg:text-4xl font-extrabold uppercase tracking-widest bg-gradient-to-br from-purple-400 to-red-600 text-transparent bg-clip-text">
                Premium
              </h1>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span>Price : </span>
                <span className="font-bold">₹70,000 Only</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl ">
                  <MdOutlineFeaturedPlayList />
                </span>
                <span>Features</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl text-green-500">
                  <AiFillCheckCircle />
                </span>
                <span>Drone Footage of Venue</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl text-green-500">
                  <AiFillCheckCircle />
                </span>
                <span>Crane Shot Visuals</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl text-green-500">
                  <AiFillCheckCircle />
                </span>
                <span>Live Telecast at Night Functions</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl text-green-500">
                  <AiFillCheckCircle />
                </span>
                <span>LED Wall</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl text-green-500">
                  <AiFillCheckCircle />
                </span>
                <span>Guaranteed Delivery within 2 week</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl text-green-500">
                  <AiFillCheckCircle />
                </span>
                <span>15 Sec. Social Media Clip</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl text-green-500">
                  <AiFillCheckCircle />
                </span>
                <span>1 Minute Teaser</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl text-green-500">
                  <AiFillCheckCircle />
                </span>
                <span>7 to 9 Min. Highlight Film</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl text-green-500">
                  <AiFillCheckCircle />
                </span>
                <span>Cinematic Feature Film</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl text-green-500">
                  <AiFillCheckCircle />
                </span>
                <span>Wedding Film USB</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl text-green-500">
                  <AiFillCheckCircle />
                </span>
                <span>Photo Album</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl text-green-500">
                  <AiFillCheckCircle />
                </span>
                <span>Unlimited Wedding Day Locations</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl text-green-500">
                  <AiFillCheckCircle />
                </span>
                <span>Industry Leading Film Coloring</span>
              </span>
              <span className="flex flex-row justify-center items-center space-x-2">
                <span className="text-2xl text-green-500">
                  <AiFillCheckCircle />
                </span>
                <span>Coverage of Haldi, Mehandi, Shaadi</span>
              </span>
            </motion.div>
          </motion.div>
        </div>

        <div className="flex justify-center items-center mt-10 lg:mt-10 mx-10 lg:mx-20">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold  uppercase">
            an Investment that you will enjoy forever.
          </h3>
        </div>

        <div className="container mx-auto">
          <p className="mx-12 lg:mx-16 py-5 text-lg lg:text-xl">
            Wedding videography packages from Banaras Films give you access to
            high-quality storytelling films you will enjoy forever.Our
            professional wedding videographers will capture the moments
            important to you.Then our professional wedding video editors will
            create a cinematic film telling your story in a way that reflects
            your individual personalities. Our wedding film packages cover
            weddings in Varanasi(Banaras), Ghazipur, Jaunpur, Azamgarh,
            Chandauli as well as destination weddings all over the world.
          </p>
        </div>

        <section className="mx-12 lg:mx-16">
          <div className="container px-5 pt-6 pb-14 mx-auto">
            <div className="flex flex-col text-center w-full mb-14">
              <h1 className="lg:text-4xl text-2xl font-bold title-font">
                Still Confused ?
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
                    <h2 className=" text-lg title-font font-medium">Videos</h2>
                  </div>
                  <div className="flex-grow">
                    <p className="leading-relaxed text-base">
                      We have added some sample videos so that you can watch
                      them and then you can decide.
                    </p>
                    <Link
                      to="/sample"
                      className="mt-3 text-pink-500 inline-flex items-center"
                    >
                      <button class="inline-flex text-white bg-pink-500 border-0 py-2 px-6 md:py-2 md:px-2 lg:py-2 lg:px-6 focus:outline-none hover:bg-pink-600 rounded text-lg">
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
                      Banaras Films makes your wedding's Visual Experience
                      Awesome with a lot of services.
                    </p>
                    <Link
                      to="/services"
                      className="mt-3 text-pink-500 inline-flex items-center"
                    >
                      <button class="inline-flex text-white bg-pink-500 border-0 py-2 px-6 md:py-2 md:px-2 lg:py-2 lg:px-6 focus:outline-none hover:bg-pink-600 rounded text-lg">
                        See Services
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
                        <AiOutlineStar />
                      </span>
                    </div>
                    <h2 className=" text-lg title-font font-medium">Reviews</h2>
                  </div>
                  <div className="flex-grow">
                    <p className="leading-relaxed text-base">
                      We have very good team of working specialist. That's why
                      we always get good feedback about us. <br />
                    </p>
                    <Link
                      to="/review"
                      className="mt-3 text-pink-500 inline-flex items-center"
                    >
                      <button class="inline-flex text-white bg-pink-500 border-0 py-2 px-6 md:py-2 md:px-2 lg:py-2 lg:px-6 focus:outline-none hover:bg-pink-600 rounded text-lg">
                        Read Review
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default Pricing;
