import React from "react";
import { useDocumentTitle, useTakeMeToTheTop } from "../components/hooks/hooks";
import { staggerContainer } from "./data/motions";
import { motion } from "framer-motion";
import { packagesVip } from "./data/vip-package";
import { pkg } from "./data/package";
import { Link } from "react-router-dom";
import { morePkg } from "./data/morePackage";

const Services = () => {
  useDocumentTitle("Services");
  useTakeMeToTheTop();
  return (
    <>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="text-gray-600 bg-white dark:bg-[#0b1121] dark:text-white font-[Poppins] overflow-x-hidden"
      >
        <div className="headline text-4xl md:text-5xl lg:text-7xl text-center p-12 lg:p-10 tracking-widest ">
          <span className="uppercase font-extrabold">Our Services</span>
        </div>

        <div className="flex justify-center items-center">
          <span className="text-3xl md:text-3xl lg:text-4xl font-bold">
            VIP Packages
            <hr className="w-12 h-1 mx-auto my-4 bg-pink-500 border-0  rounded"></hr>{" "}
          </span>
        </div>

        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-20 gap-10 mx-8 lg:mx-16 py-12">
            {packagesVip.map((vip, idx) => {
              return (
                <motion.div
                  key={idx}
                  whileHover={{
                    scale: 1.08,
                    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
                  }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="max-w-sm flex flex-col min-h-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
                >
                  <a>
                    <img class="rounded-t-lg" src={vip.img} alt="" />
                  </a>
                  <div class="p-5 flex flex-col flex-grow">
                    <a>
                      <h5 class="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                        {vip.title}
                      </h5>
                    </a>
                    <ul class="mb-3 space-y-2 font-normal text-gray-700  dark:text-gray-400">
                      {vip.content.map((item, indx) => (
                        <li key={indx}>{item}</li>
                      ))}
                    </ul>
                    <div className="flex flex-col justify-between flex-grow">
                      <p class="text-center mt-auto mb-7 text-lg font-semibold text-gray-900 dark:text-gray-400">
                        {vip.price}
                      </p>
                    </div>
                    <div className="mt-auto">
                      <Link
                        to={"/terms"}
                        className="w-full text-center flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-pink-500 hover:bg-pink-600 transition-colors duration-200"
                      >
                        Read more
                        <svg
                          className="rotate-0 w-3.5 h-3.5 ms-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="flex justify-center items-center">
            <span className="text-3xl md:text-3xl lg:text-4xl font-bold">
              Packages
              <hr className="w-12 h-1 mx-auto my-4 bg-pink-500 border-0  rounded"></hr>
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 mx-8 lg:mx-16 py-12">
            {pkg.map((packages, idx) => {
              return (
                <motion.div
                  key={idx}
                  whileHover={{
                    scale: 1.08,
                    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
                  }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
                >
                  <a>
                    <img class="rounded-t-lg" src={packages.img} alt="" />
                  </a>
                  <div class="p-5 flex flex-col flex-grow">
                    <a>
                      <h5 class="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                        {packages.title}
                      </h5>
                    </a>
                    <ul class="mb-3 space-y-2 font-normal text-gray-700 dark:text-gray-400">
                      {packages.content.map((packItems, index) => (
                        <li key={index}>{packItems}</li>
                      ))}
                    </ul>
                    <div className="flex flex-col justify-between flex-grow">
                      <p class="text-center mt-auto mb-7 text-lg font-semibold text-gray-900 dark:text-gray-400">
                        {packages.price}
                      </p>
                    </div>
                    <div className="mt-auto">
                      <Link
                        to={"/terms"}
                        className="w-full text-center mt-auto flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-pink-500 hover:bg-pink-600 transition-colors duration-200"
                      >
                        Read more
                        <svg
                          className="rotate-0 w-3.5 h-3.5 ms-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="flex justify-center items-center">
            <span className="text-3xl md:text-3xl lg:text-4xl font-bold">
              More Packages
              <hr className="w-12 h-1 mx-auto my-4 bg-pink-500 border-0  rounded"></hr>
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 mx-8 lg:mx-16 py-12">
            {morePkg.map((morepkg, idx) => {
              return (
                <motion.div
                  key={idx}
                  whileHover={{
                    scale: 1.08,
                    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
                  }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
                >
                  <a>
                    <img class="rounded-t-lg" src={morepkg.img} alt="" />
                  </a>
                  <div class="p-5 flex flex-col flex-grow">
                    <a>
                      <h5 class="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                        {morepkg.title}
                      </h5>
                    </a>
                    <ul class="mb-3 space-y-2 font-normal text-gray-700 dark:text-gray-400">
                      {morepkg.content.map((packmoreItems, index) => (
                        <li key={index}>{packmoreItems}</li>
                      ))}
                    </ul>
                    <div className="flex flex-col justify-between flex-grow">
                      <p class="text-center mt-auto mb-7 text-lg font-semibold text-gray-900 dark:text-gray-400">
                        {morepkg.price}
                      </p>
                    </div>
                    <div className="mt-auto">
                      <Link
                        to={"/terms"}
                        className="w-full text-center mt-auto flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-pink-500 hover:bg-pink-600 transition-colors duration-200"
                      >
                        Read more
                        <svg
                          className="rotate-0 w-3.5 h-3.5 ms-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Services;
