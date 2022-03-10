import Swal from "sweetalert2";

function MySwal(type, message, time) {
  if (type === "error") {
    Swal.fire({
      position: "center",
      icon: "error",
      title: message,
      showConfirmButton: false,
      timer: time,
    });
  } else if (type === "success") {
    Swal.fire({
      position: "center",
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: time,
    });
  }
}

export default MySwal;
