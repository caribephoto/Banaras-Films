import React from "react";
import about from "../images/about.jpg";
import { useDocumentTitle, useTakeMeToTheTop } from "../components/hooks/hooks";

import {
  AiOutlineMail,
  AiOutlineWhatsApp,
  AiOutlineVideoCamera,
  AiOutlineUser,
} from "react-icons/ai";
import { MdOutlineTaskAlt } from "react-icons/md";
import { AiOutlineTeam } from "react-icons/ai";
import { HiOutlinePhotograph } from "react-icons/hi";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleCopyText } from "../components/data/data";
import { fadeIn, staggerContainer, theOpacity } from "./data/motions";
import { motion } from "framer-motion";

const About = () => {
  useDocumentTitle("About");
  useTakeMeToTheTop();
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="text-gray-600 bg-white dark:bg-[#0b1121] dark:text-white font-[Poppins]">
        <div className="headline text-4xl md:text-5xl lg:text-7xl text-center pt-12 pb-0  px-12 lg:pt-10 lg:pb-0 lg:px-10 tracking-widest ">
          <span className="uppercase font-extrabold ">About Us</span>
        </div>

        <div className="wrapper flex flex-col justify-center items-center mx-12 lg:mx-16">
          <motion.div
            className="firstOne"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img
              className="rounded-2xl scale-75 lg:scale-75"
              src={about}
              alt="about"
            />
          </motion.div>

          <div className="secondOne mx-auto container">
            <p className="text-base lg:text-xl">
              Your wedding day is one of the most important days of your life,
              and you want to remember it forever. We understand that finding
              the right videographer for your wedding can be overwhelming. At
              Caribe Photo, we recognize your concerns and share your dream of a
              perfect day.
            </p>

            <p className="text-base lg:text-xl pt-2 lg:pt-4">
              At Caribephoto, we get it!
            </p>

            <p className="text-base lg:text-xl pt-2 lg:pt-4">
              We are here to help make that dream a reality. Over the past
              decade, we have fulfilled the wishes of thousands of brides from
              around the world who, like you, wanted their wedding captured in
              beautiful and unforgettable images through stunning videos and
              photographs.
            </p>
            <p className="text-base lg:text-xl pt-2 lg:pt-4">
              Let's make it real!. Check availability now!{" "}
            </p>
          </div>

          <div className="thirdOne grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 mt-3 lg:mt-5">
            <a
              href="mailto:info@caribephoto.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="p-3 text-white bg-gray-500 hover:bg-gray-600 rounded-lg w-28 lg:w-60">
                <span className="flex flex-row justify-center items-center space-x-2">
                  {/* <span className="hidden lg:block">Contact via E-mail</span>  */}
                  <span>
                    <span className="hidden lg:block">Contact via E-mail</span>
                    <span className="lg:hidden">Contact</span>
                  </span>
                  <span className="text-3xl">
                    <AiOutlineMail />
                  </span>
                </span>
              </button>
            </a>

            <button
              onClick={() => handleCopyText("9889901417")}
              className="p-3 text-white bg-blue-500 hover:bg-blue-600 rounded-lg w-28 lg:w-60"
            >
              <span className="flex flex-row justify-center items-center space-x-2">
                {/* <span className="hidden lg:block">Consult on Call</span> */}
                <span>
                  <span className="hidden lg:block">Consult on Call</span>
                  <span className="lg:hidden">Consult</span>
                </span>
                <span className="text-3xl">
                  <FiPhoneCall />
                </span>
              </span>
            </button>

            <a
              href="https://wa.me/+529841578632"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="p-3 text-white bg-green-500 hover:bg-green-600 rounded-lg w-28 lg:w-60">
                <span className="flex flex-row justify-center items-center space-x-2">
                  {/* <span className="hidden lg:inline">Check on Whatsapp</span> */}
                  <span>
                    <span className="hidden lg:block">Check on Whatsapp</span>
                    <span className="lg:hidden">Check</span>
                  </span>
                  <span className="text-3xl">
                    <AiOutlineWhatsApp />
                  </span>
                </span>
              </button>
            </a>
          </div>
        </div>

        <div className="text-center text-3xl lg:text-4xl py-5 lg:py-10">
          What You Can Expect
        </div>

        <div className="container mx-auto">
          <div className="Expectations flex flex-col justify-center items-center mx-12 lg:mx-16 tracking-wider">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8"
            >
              <motion.div
                variants={fadeIn("right", "tween", 0.2, 1)}
                className="One p-5 text-gray-600 bg-white dark:text-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg flex flex-col justify-center items-center space-y-1"
              >
                <span className="text-3xl lg:text-5xl">
                  <AiOutlineUser />
                </span>
                <span className="text-3xl">Personal Attention</span>
                <span className="">
                  You will feel well cared for and heard.
                </span>
              </motion.div>

              <motion.div
                variants={fadeIn("right", "tween", 0.4, 1)}
                className="Two p-5 text-gray-600 bg-white dark:text-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg flex flex-col justify-center items-center space-y-1"
              >
                <span className="text-3xl lg:text-5xl">
                  <AiOutlineVideoCamera />
                </span>
                <span className="text-3xl">4K Wedding Video</span>
                <span className="">
                  You will love your professional wedding film.
                </span>
              </motion.div>

              <motion.div
                variants={fadeIn("right", "tween", 0.6, 1)}
                className="Three p-5 text-gray-600 bg-white dark:text-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg flex flex-col justify-center items-center space-y-1"
              >
                <span className="text-3xl lg:text-5xl">
                  <HiOutlineSpeakerphone />
                </span>
                <span className="text-3xl">Communication</span>
                <span className="">
                  We’re easily accessible to answer any questions you may have.
                </span>
              </motion.div>

              <motion.div
                variants={fadeIn("right", "tween", 0.8, 1)}
                className="Four p-5 text-gray-600 bg-white dark:text-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg flex flex-col justify-center items-center space-y-1"
              >
                <span className="text-3xl lg:text-5xl">
                  <MdOutlineTaskAlt />
                </span>
                <span className="text-3xl">Feel Prepared</span>
                <span className="">
                  We’ll work with you to craft a wedding film timeline to ensure
                  we capture the moments important to you.
                </span>
              </motion.div>

              <motion.div
                variants={fadeIn("right", "tween", 1, 1)}
                className="Five p-5 text-gray-600 bg-white dark:text-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg flex flex-col justify-center items-center space-y-1"
              >
                <span className="text-3xl lg:text-5xl">
                  <AiOutlineTeam />
                </span>
                <span className="text-3xl">Proffessional Team</span>
                <span className="">
                  Our team conducts themselves in a professional manner that
                  demonstrates respect for your day.
                </span>
              </motion.div>

              <motion.div
                variants={fadeIn("right", "tween", 1.2, 1)}
                className="Six p-5 text-gray-600 bg-white dark:text-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg flex flex-col justify-center items-center space-y-1"
              >
                <span className="text-3xl lg:text-5xl">
                  <HiOutlinePhotograph />
                </span>
                <span className="text-3xl">Rapid Moments</span>
                <span className="">
                  We know you're excited to see your photos and video quickly.
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="text-center text-3xl lg:text-4xl pt-10 pb-5 lg:pt-10 lg:pb-5">
          Our Promise to You
        </div>

        <div className="WhatBridesSays flex flex-col justify-center items-center container mx-auto  pb-5 lg:pb-5 tracking-wider">
          <p className="text-base lg:text-xl mx-12 lg:mx-16">
            We are committed to exceeding your expectations so you can feel
            confident that you chose the photographer that is best for your
            wedding. Our brides rave about the experience they have had working
            with us and the joy their wedding photos have brought them.
          </p>
        </div>

        <div
          className="parallax container mx-auto my-5 bg-blend-overlay text-white bg-gray-700 h-[550px] md:h-[400px] lg:h-[550px] bg-fixed bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: `url('/img/background.jpg')` }}
        >
          <div className="flex flex-col justify-center items-center pt-16 md:pt-20 lg:pt-44 ">
            <div className="text-center text-3xl lg:text-4xl mx-12 lg:mx-16 ">
              Enjoy Your Wedding Forever
            </div>

            <p className="text-base lg:text-xl pt-2 lg:pt-4 mx-12 lg:mx-16">
              Once you schedule your call, you’ll have taken the first step in
              experiencing the confidence you’ll feel knowing you chose the
              right videographer for you. We believe your wedding day is one of
              the most important days of your life, and you should be able to
              re-experience those memories whenever you want. You can be
              confident Caribephoto capture the special moments of your day and
              give you a wedding you’ll love forever.
            </p>
          </div>
        </div>

        <div className="text-center text-3xl lg:text-4xl mt-10 mb-5 ">
          Meet Our Photographer
        </div>

        <div className="flex flex-col justify-center items-center pb-10 lg:pb-10 mx-12 lg:mx-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-12"
          >
            <motion.div
              variants={theOpacity(0.2, 1)}
              className="flex flex-col justify-center items-center space-y-2 p-5 text-gray-600 bg-white dark:text-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className=" rounded-full h-32 w-32 lg:h-40 lg:w-40 border-2 border-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              <span>Jamaica</span>
              <span>Photographer</span>
              <span className="flex flex-row justify-center items-center space-x-2 text-white">
                <button
                  onClick={() => handleCopyText("529841578632")}
                  className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full"
                >
                  <span className="text-3xl">
                    <FiPhoneCall />
                  </span>
                </button>

                <a href="mailto:jamaica@caribephoto.com">
                  <button className="border border-gray-300 p-2 bg-gray-500 dark:bg-gray-800 rounded-full">
                    <span className="text-3xl">
                      <AiOutlineMail />
                    </span>
                  </button>
                </a>
              </span>
            </motion.div>

            <motion.div
              variants={theOpacity(0.4, 1)}
              className="flex flex-col justify-center items-center space-y-2 p-5 text-gray-600 bg-white dark:text-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className=" rounded-full h-32 w-32 lg:h-40 lg:w-40 border-2 border-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              <span>Margarita Ville Riviera Maya</span>
              <span>Photographer</span>
              <span className="flex flex-row justify-center items-center space-x-2 text-white">
                <button
                  onClick={() => handleCopyText("7398592004")}
                  className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full"
                >
                  <span className="text-3xl">
                    <FiPhoneCall />
                  </span>
                </button>

                <a href="mailto:rrmphotoshop@caribephoto.com">
                  <button className="border border-gray-300 p-2 bg-gray-500 dark:bg-gray-800 rounded-full">
                    <span className="text-3xl">
                      <AiOutlineMail />
                    </span>
                  </button>
                </a>
              </span>
            </motion.div>

            <motion.div
              variants={theOpacity(0.6, 1)}
              className="flex flex-col justify-center items-center space-y-2 p-5 text-gray-600 bg-white dark:text-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className=" rounded-full h-32 w-32 lg:h-40 lg:w-40 border-2 border-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              <span>Margarita Ville Riviera Cancun </span>
              <span>Photographer</span>
              <span className="flex flex-row justify-center items-center space-x-2 text-white">
                <button
                  onClick={() => handleCopyText("7080226202")}
                  className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full"
                >
                  <span className="text-3xl">
                    <FiPhoneCall />
                  </span>
                </button>

                <a href="mailto:mvphotoshop@caribephoto.com">
                  <button className="border border-gray-300 p-2 bg-gray-500 dark:bg-gray-800 rounded-full">
                    <span className="text-3xl">
                      <AiOutlineMail />
                    </span>
                  </button>
                </a>
              </span>
            </motion.div>

            <motion.div
              variants={theOpacity(0.6, 1)}
              className="flex flex-col justify-center items-center space-y-2 p-5 text-gray-600 bg-white dark:text-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className=" rounded-full h-32 w-32 lg:h-40 lg:w-40 border-2 border-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              <span>Republica Dominican Puntana</span>
              <span>Photographer</span>
              <span className="flex flex-row justify-center items-center space-x-2 text-white">
                <button
                  onClick={() => handleCopyText("7080226202")}
                  className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full"
                >
                  <span className="text-3xl">
                    <FiPhoneCall />
                  </span>
                </button>

                <a href="mailto:mvphotoshop@caribephoto.com">
                  <button className="border border-gray-300 p-2 bg-gray-500 dark:bg-gray-800 rounded-full">
                    <span className="text-3xl">
                      <AiOutlineMail />
                    </span>
                  </button>
                </a>
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default About;
