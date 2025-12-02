import React from "react";
import {
  AiOutlineMail,
  AiOutlineWhatsApp,
  AiOutlineYoutube,
} from "react-icons/ai";
import { FiFacebook, FiInstagram, FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom";
import { handleCopyText } from "../components/data/data";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Footer = () => {
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
      <div className="bg-[#0b1121]  text-white pb-10 font-[Poppins]">
        {/* Adding a new Contact Now Section */}

        <div className="flex flex-col justify-center items-center px-12 lg:px-16 pt-12 lg:pt-16 text-gray-600 bg-white dark:bg-[#0b1121] dark:text-white ">
          <div className="flex flex-col text-center w-full mb-5">
            <h1 className="lg:text-4xl text-2xl font-bold title-font">
              Contact Now
            </h1>
          </div>

          <p className=" text-center text-base">
            We are always ready to hear you. <br />
            For any query like bookings, pricings, availability , please feel
            free to contact us.
          </p>

          <div className="grid grid-cols-3 gap-4 lg:grid-cols-6 lg:gap-8 pt-5 lg:pt-5 pb-5 lg:pb-10">
            {/* <div className="flex flex-row justify-center items-center space-x-5 lg:space-x-8 pt-5 lg:pt-5 pb-5 lg:pb-10"> */}
            <a href="mailto:info@caribephoto.com">
              <button className="border border-gray-300 p-2 lg:p-3 rounded-full bg-gray-200 dark:bg-gray-800 ">
                <span className="text-3xl lg:text-5xl">
                  <AiOutlineMail />
                </span>
              </button>
            </a>

            <button
              onClick={() => handleCopyText("9841578632")}
              className="border border-gray-300 p-2 lg:p-3 rounded-full bg-gray-200 dark:bg-gray-800"
            >
              <span className="text-3xl lg:text-5xl">
                <FiPhoneCall />
              </span>
            </button>

            <a
              href="https://wa.me/+529841578632"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="border border-gray-300 p-2 lg:p-3 rounded-full bg-gray-200 dark:bg-gray-800">
                <span className="text-3xl lg:text-5xl">
                  <AiOutlineWhatsApp />
                </span>
              </button>
            </a>

            <a
              href="https://www.facebook.com/CaribePhoto"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="border border-gray-300 p-2 lg:p-3 rounded-full bg-gray-200 dark:bg-gray-800">
                <span className="text-3xl lg:text-5xl">
                  <FiFacebook />
                </span>
              </button>
            </a>

            <a
              href="https://www.instagram.com/caribephoto"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="border border-gray-300 p-2 lg:p-3 rounded-full bg-gray-200 dark:bg-gray-800">
                <span className="text-3xl lg:text-5xl">
                  <FiInstagram />
                </span>
              </button>
            </a>

            <a
              href="https://www.youtube.com/@CaribephotoRM"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="border border-gray-300 p-2 lg:p-3 rounded-full bg-gray-200 dark:bg-gray-800 ">
                <span className="text-3xl lg:text-5xl">
                  <AiOutlineYoutube />
                </span>
              </button>
            </a>
          </div>
        </div>

        {/* Invest Once, Enjoy Forever */}

        <section className=" px-12 lg:px-16 text-gray-600 bg-white dark:bg-[#0b1121] dark:text-white tracking-widest">
          <div className="container mx-auto flex px-5 py-5 lg:py-10 md:flex-row flex-col items-center">
            <div className="lg:flex-grow md:w-1/2 lg:pr-0 md:pr-16 flex flex-col justify-center items-center my-2 lg:my-0  text-center ">
              <span className="text-3xl lg:text-7xl font-extrabold uppercase">
                Invest Once
              </span>
              <span className="text-3xl lg:text-7xl font-extrabold uppercase leading-10 lg:leading-[100px]">
                Enjoy Forever
              </span>
            </div>
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
              <img
                className="object-cover object-center rounded-2xl"
                alt="hero"
                src="/img/footer.jpg"
              />
            </div>
          </div>
        </section>

        <div className="flex justify-center items-center mx-12 lg:mx-16 pt-10">
          <div className="footer grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-32 ">
            <div className="flex flex-col justify-start items-start space-y-1">
              <span className="uppercase">Navigations</span>

              <Link to="/services">Services</Link>
              <Link to="/about">About</Link>
            </div>

            <div className="flex flex-col justify-start items-start space-y-1">
              <span className="uppercase">Legal</span>

              <Link to="/terms">Terms & Conditions</Link>
            </div>

            <div className="flex flex-col justify-start items-start space-y-1">
              <span className="uppercase">Social</span>
              <Link to="mailto:info@caribephoto.com">Email</Link>
              <Link to="https://www.facebook.com/CaribePhoto">Facebook</Link>

              <Link to="https://wa.me/+529841578632">Whatsapp</Link>
            </div>
          </div>
        </div>

        <hr className="border border-gray-700 my-4" />

        <div className=" flex flex-col lg:flex-row justify-center items-center mx-12 lg:mx-16 space-x-1 lg:space-x-8">
          <span>All rights reserved. © 2025</span>
        </div>
      </div>
    </>
  );
};

export default Footer;
