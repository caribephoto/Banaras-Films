import { toast } from "react-toastify";

export const marriageVideo = [
  {
    id: "video-1",
    groom: "Erik",
    bride: "Lisa",
    coupleName: "Erik & Lisa",
    year: 2024,
    videoId: "iTkZqzIs-CQ",
    venue: "Azul Beach Resort Negril",
    country: "Jamaica",
    thumbnail: "https://img.youtube.com/vi/iTkZqzIs-CQ/maxresdefault.jpg",
  },
  {
    id: "video-2",
    groom: "Emily",
    bride: "Dumisani",
    coupleName: "Emily & Dumisani",
    year: 2024,
    videoId: "BQDRczVwdvo",
    venue: "Azul Beach Resort Negril",
    country: "Jamaica",
    thumbnail: "https://img.youtube.com/vi/BQDRczVwdvo/maxresdefault.jpg",
  },
];


export const handleCopyText = (a) => {
  let alertText = a;
  navigator.clipboard.writeText(alertText);
  document.getSelection().removeAllRanges();

  toast.success("Phone Number Copied.", {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
