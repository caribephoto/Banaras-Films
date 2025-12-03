import React from "react";
import { useDocumentTitle } from "../../hooks/hooks";

const Error = () => {
  useDocumentTitle("Error 404");
  return (
    <div className=" text-gray-600 bg-white dark:bg-[#0b1121] dark:text-white font-[Poppins]">
      <div className="flex flex-col justify-center items-center container mx-auto py-24 md:py-20 lg:py-20">
        <span className="text-6xl md:text-7xl lg:text-9xl font-extrabold tracking-widest">
          ERROR
        </span>
        <span className="text-6xl md:text-7xl lg:text-9xl font-extrabold tracking-widest animate-bounce text-red-500">
          404
        </span>
        <span className="text-3xl md:text-5xl lg:text-5xl font-extrabold tracking-widest ">
          PAGE NOT FOUND
        </span>
      </div>
    </div>
  );
};

export default Error;
