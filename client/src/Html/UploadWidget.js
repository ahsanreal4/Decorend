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
          if (localStorage.getItem("url") == null) {
            localStorage.setItem("url", url);
            let newList = JSON.stringify({ urls: [url]});
            localStorage.setItem("imagesUrl", newList);
          }
          else {
            let myList = JSON.parse(localStorage.getItem("imagesUrl"));
            myList.urls.push(url);
            localStorage.setItem("imagesUrl", JSON.stringify(myList));

          }
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
