import Resizer from "react-image-file-resizer";
import toast from "react-hot-toast";

export const ResizeImage = (file) =>
  new Promise((resolve, reject) => {
    try {
      console.log("enterded image resize function");
      
      Resizer.imageFileResizer(
        file,
        570,
        570,
        "JPEG",
        100,
        0,
        (uri) => {
          try {
            const blob = new Blob([uri], { type: "image/jpeg" });
            const newFile = new File([blob], file.name, { type: "image/jpeg" });
            resolve(newFile);
          } catch (error) {
            console.log("error on i,age upload", error);

            reject(
              new Error(
                "Error while creating new file from resized image: " +
                  error.message
              )
            );
          }
        },
        "blob"
      );
    } catch (error) {
      console.log("error HAPPENED", error);

      reject(new Error("Error while resizing image: " + error.message));

      if (error?.message === "File Is NOT Image!") {
        toast.error("File format not supported");
      }
    }
  });
