import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

import { BsMoon, BsSun } from "react-icons/bs";
import { motion } from "framer-motion";

const Header = (props) => {
  let Pages = [
    { name: "Home", link: "/" },
    { name: "Services", link: "/services" },
    { name: "Video", link: "/video" },
    { name: "About", link: "/about" },
    { name: "Terms & Conditions", link: "/terms" },
  ];
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ y: -500 }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.5,
          stiffness: 100,
          type: "spring",
          damping: 10,
        }}
        className=" w-full border-b dark:border-gray-700 border-gray-200 shadow-md fixed top-0 left-0 font-[Poppins] z-10 "
      >
        <div className="flex justify-between items-center md:justify-between md:items-center lg:justify-center lg:items-center 2xl:max-w-full 2xl:mx-auto text-gray-600 bg-white dark:bg-[#0b1121] dark:text-white   py-4 md:py-2 lg:py-2 px-7 md:px-5 lg:px-10  ">
          {/* <div className="md:flex justify-between items-center md:justify-around lg:justify-between 2xl:justify-center lg:items-center  text-gray-600 bg-white dark:bg-[#0b1121] dark:text-white   py-4 md:py-2 px-7 md:px-5 lg:px-20 "> */}
          <div className="font-bold text-2xl cursor-pointer flex  justify-center  items-center lg:justify-around lg:items-center space-x-20 md:space-x-5 lg:space-x-20 pt-2 lg:pt-0   md:max-w-screen-md lg:max-w-screen-xl">
            <Link to="/">
              <span className="flex flex-row space-x-2">
                <span>Caribephoto</span>
              </span>
            </Link>
            <span
              className=" flex justify-center items-center text-2xl lg:text-2xl p-2 lg:p-3 rounded-full border border-indigo-300 bg-gray-200 dark:bg-gray-800 "
              // onClick={props.toggleDarkMode}
            >
              {props.theme === "dark" ? (
                <button onClick={() => props.setTheme("light")}>
                  <BsSun />
                </button>
              ) : (
                <button onClick={() => props.setTheme("dark")}>
                  <BsMoon />
                </button>
              )}
            </span>
          </div>

          <div
            onClick={() => setOpen(!open)}
            className="text-3xl absolute right-8 top-6 md:right-8 md:top-5 cursor-pointer p-2 rounded-lg bg-gray-200 dark:bg-gray-800 lg:hidden"
          >
            {open ? <AiOutlineClose /> : <AiOutlineMenu />}
          </div>

          <ul
            className={`lg:flex lg:justify-end lg:items-center pt-4 md:pt-0  lg:pt-0 absolute lg:static bg-gray-200 dark:bg-gray-700 lg:bg-transparent lg:dark:bg-transparent    lg:z-auto z-[-1] left-64 md:left-[550px] md:w-full lg:left-0 w-full  lg:pl-0 pl-0 transition-all duration-500 ease-in ${
              // className={`md:flex md:items-center pt-2 lg:pt-0 absolute md:static bg-gray-200 dark:bg-gray-700 lg:bg-white lg:dark:bg-[#0b1121]    md:z-auto z-[-1] left-60 lg:left-0 w-full md:w-auto lg:pl-0 pl-9 transition-all duration-500 ease-in ${

              open
                ? "top-16 md:top-14 opacity-100"
                : "top-[-500px] opacity-0 md:opacity-100"
            } `}
          >
            {Pages.map((page, i) => {
              return (
                <li
                  key={i}
                  className="block text-left py-3   text-gray-700 indent-5 lg:indent-0    lg:px-5 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-900  lg:hover:bg-transparent dark:lg:hover:bg-transparent  "
                >
                  <Link className="" to={page.link}>
                    {page.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </motion.div>
      <div className="h-[64px] md:h-[80px] lg:h-[52px] w-full bg-white dark:bg-[#0b1121]" />
    </>
  );
};

export default Header;
