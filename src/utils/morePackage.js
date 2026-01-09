const morePkg = [
  {
    id: 57,
    title: "Drone",
    img: "/img/drone.jpg",
    content: [
      "* Only available when purchased with a video package",
      "* Not available for Jamaica locations",
      "* Includes cinematic aerial shots"
    ],
    price: "$333.89 + Tax",
    numericPrice: 333.89,
    requiresVideo: true,
    excludedHotels: [31],
    category: "addon"
  },
  {
    id: "video-addon",
    title: "Video",
    img: "/img/video.jpg",
    content: [
      "* Professional full–event video coverage",
      "* Edited highlight reel included",
      "* Delivered in high resolution"
    ],
    price: "$1,318.00 + Tax",
    numericPrice: 1318.00,
    isVideoPackage: true,
    category: "addon"
  },
  {
    id: "video-extra-addon",
    title: "Extra Video Hour",
    img: "/img/video-extra.jpg",
    content: [
      "* Additional hour of continuous video coverage",
      "* Perfect for extended events",
      "* Includes extra footage in final delivery"
    ],
    price: "$1,099.79 + Tax",
    numericPrice: 1099.79,
    isVideoPackage: true,
    category: "addon"
  },
];


// Verify if test package is enabled
const enableTest = import.meta.env.VITE_ENABLE_TEST_PACKAGE === 'true';
const finalPkg = enableTest ? null : morePkg;

export { finalPkg as morePkg };
