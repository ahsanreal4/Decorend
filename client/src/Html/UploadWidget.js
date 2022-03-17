import React from "react";
import MySwal from "../AlertModel/MySwal";

export default function UploadWidget() {
  const showWidget = () => {
    let widget = window.cloudinary.createUploadWidget(
      {
        cloudName: `dnuuh99qn`,
        uploadPreset: `ml_default`,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          const url = result.info.url;
          MySwal("success", "Uploaded Successfully!", 1500);
        } else if (error) {
          0;
          MySwal("error", "Some error occured!", 1500);
        }
      }
    );
    widget.open();
  };

  return (
    <div>
      {" "}
      <button onClick={showWidget}> Upload Image </button>
    </div>
  );
}
