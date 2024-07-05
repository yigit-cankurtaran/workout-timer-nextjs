import toast from "react-hot-toast";

const successToast = (message: string) => {
  toast.success(message, {
    style: {
      background: "#1f2937",
      color: "#f9fafb",
    },
  });
};

const errorToast = (message: string) => {
  toast.error(message, {
    style: {
      background: "#1f2937",
      color: "#f9fafb",
    },
  });
};

export { successToast, errorToast };
