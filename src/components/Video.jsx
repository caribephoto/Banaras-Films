import React, { useState } from "react";
import { GoCalendar } from "react-icons/go";
import { MdOutlinePlace } from "react-icons/md";
import { BsHeartFill } from "react-icons/bs";
import { marriageVideo } from "../components/data/data";
import { useDocumentTitle, useTakeMeToTheTop } from "../components/hooks/hooks";
import { motion } from "framer-motion";

const Video = () => {
  useDocumentTitle("Video");
  useTakeMeToTheTop();

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isVideoLoading, setIsVideoLoading] = useState(false);

  const handleVideoClick = (videoId) => {
    setIsVideoLoading(true); // Marcar el video como en carga
    setSelectedVideo(videoId); // Mostrar el modal
  };

  const closeModal = () => {
    setIsVideoLoading(false); // Detener la carga del video
    setSelectedVideo(null); // Cerrar el modal
  };

  return (
    <>
      <div className="text-gray-600 bg-white dark:bg-[#0b1121] dark:text-white font-[Poppins]">
        <div className="headline text-4xl md:text-5xl lg:text-7xl text-center p-12 lg:p-10 tracking-widest">
          <span className="uppercase font-extrabold">Video Gallery</span>
        </div>

        <div className="container mx-auto">
          <div className="videos grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-12 lg:mx-16 mt-2 mb-0">
            {marriageVideo.map((video) => {
              const videoThumbnail = `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`;

              return (
                <div
                  key={video.videoId}
                  className="bg-white dark:bg-[#1a202c] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
                >
                  <div className="relative pb-[56.25%] w-full">
                    {/* Miniatura del video */}
                    {!selectedVideo || selectedVideo !== video.videoId ? (
                      <motion.img
                        src={videoThumbnail}
                        alt="Video Thumbnail"
                        className="absolute top-0 left-0 w-full h-full cursor-pointer object-cover"
                        onClick={() => handleVideoClick(video.videoId)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    ) : (
                      <motion.div
                        className="absolute top-0 left-0 w-full h-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {/* Video en el modal */}
                        {isVideoLoading && (
                          <iframe
                            className="absolute top-0 left-0 w-full h-full rounded-t-lg"
                            src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&controls=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded youtube"
                          />
                        )}
                      </motion.div>
                    )}
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex justify-center items-center space-x-2 text-lg lg:text-2xl font-semibold text-gray-800 dark:text-white">
                      <span>{video.groom}</span>
                      <span className="text-pink-500 animate-bounce">
                        <BsHeartFill />
                      </span>
                      <span>{video.bride}</span>
                    </div>

                    <div className="flex justify-center items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <GoCalendar />
                      <span>{video.year}</span>
                    </div>

                    <div className="flex justify-center items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <MdOutlinePlace />
                      <span>{video.place}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal para mostrar el video expandido */}
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-full h-full max-w-full max-h-full">
              {/* Solo carga el video cuando está en estado 'isVideoLoading' */}
              {isVideoLoading && (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&controls=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                />
              )}
              <button
                onClick={closeModal}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white w-12 h-12 flex items-center justify-center rounded-full hover:bg-pink-500 transition-colors duration-300 ease-in-out"
              >
                <span className="text-2xl font-bold">×</span>
              </button>
            </div>
          </motion.div>
        )}

        <div className="h-10" />
      </div>
    </>
  );
};

export default Video;
