import React from "react";

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
