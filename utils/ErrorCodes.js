import toast from "react-hot-toast";
export const GetErrorMessage = (errorCode) => {
  const errorMessages = {
    1001: "No such user found. Please check the details and try again.",
    1008:"You haven't set a password. Please log in with OTP or reset your password.",
    1002: "Failed to update user. Please try again later.",
    1011: "This mobile number is already registered. Please use a different number.",
    1012: "This PAN card number is already registered. Please check or use a different one.",
    1013: "This ID number already exists. Please verify the details.",
    1014: "A temporary token already exists. Please use a new one or contact support.",
    1015: "The provided field already exists. Please check the details and try again.",
    2001: "Only administrators or staff have permission to perform this action.",
    3001: "No vehicle found. Please check the details.", // Retain only one message for 3001
    5011: "The name or state you entered already exists. Please choose a different name.",
    1003: "The PAN card number you entered is not valid.",
    1004: "The OTP must be between 4 and 8 digits.",
    1005: "The OTP you entered is incorrect.",
    1006: "The OTP has expired.",
    2002: "Invalid username and password.",
    4001: "The payment creation failed",
    4002: "Payment not found",
    1007:"Failed to set user otp."
  };

  return (
    errorMessages[errorCode] || "Something went wrong. Please try again later."
  );
};

export const ToastMessage = (error) => {
  console.log("error messages displayed");

  toast.error(error, {
    duration: 5000, // Toast duration
    position: "top-center", // Position on screen
    style: {
      // background: '#ff4d4d',  // Background color
      // color: '#fff',           // Text color
      padding: "16px", // Padding inside the toast
      borderRadius: "8px", // Rounded corners
      fontSize: "16px", // Font size
      whiteSpace: "nowrap", // Prevent text from wrapping to the next line
      overflow: "hidden", // Hide overflowing content
      textOverflow: "ellipsis", // Show ellipsis ("...") if the message is too long
      maxWidth: "100%", // Ensure it doesn't exceed the container width
    },
    // icon: '🚫',               // Custom icon
    ariaProps: {
      role: "alert",
      "aria-live": "assertive",
    },
  });
};

export const SuccessMessage = (message) => {
  console.log("success messages displayed");

  toast.success(message, {
    duration: 5000, // Toast duration
    position: "top-center", // Position on screen
    style: {
      // background: '#ff4d4d',  // Background color
      // color: '#fff',           // Text color
      padding: "16px", // Padding inside the toast
      borderRadius: "8px", // Rounded corners
      fontSize: "16px", // Font size
      whiteSpace: "nowrap", // Prevent text from wrapping to the next line
      overflow: "hidden", // Hide overflowing content
      textOverflow: "ellipsis", // Show ellipsis ("...") if the message is too long
      maxWidth: "100%", // Ensure it doesn't exceed the container width
    },
                // Custom icon
    ariaProps: {
      role: "alert",
      "aria-live": "assertive",
    },
  });
};