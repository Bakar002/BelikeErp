import toast from "react-hot-toast";
export const handleShowSuccessToast = (message) => {
  toast.success(message, {
    position: "bottom-center",
    icon: "✅",
    style: {
      borderRadius: "10px",
    },
  });
};

export const handleShowFailureToast = (message) => {
  toast.error(message, {
    position: "bottom-center",
    icon: "❌",
    style: {
      borderRadius: "10px",
      backgroundColor: "#ff4d4f",
      color: "#fff",
    },
  });
};
