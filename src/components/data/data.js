import { toast } from "react-toastify";

export const marriageVideo = [
  {
    groom: "Erik",
    bride: "Lisa",
    year: 2024,
    videoId: "iTkZqzIs-CQ",
    place: "Azul Beach Negril",
  },
  {
    groom: "Emily",
    bride: "Dumisani",
    year: 2024,
    videoId: "BQDRczVwdvo",
    place: "Azul Beach Negril",
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
