import toast from "react-hot-toast";

const SuccessToast = (message: string) => {
  toast.success(message, {
    style: {
      background: "#1f2937",
      color: "#f9fafb",
    },
  });
};

const ErrorToast = (message: string) => {
  toast.error(message, {
    style: {
      background: "#1f2937",
      color: "#f9fafb",
    },
  });
};

export { SuccessToast, ErrorToast };
