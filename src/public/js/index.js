const socket = io();

const input = document.getElementById("input-chat");
const mensajes = document.getElementById("messages");
const boton = document.getElementById("boton-chat");

let user;

// Ingresar usuario
Swal.fire({
  title: "Ingrese su nombre de usuario",
  input: "text",
  inputPlaceholder: "Ingrese su usuario",
  allowOutsideClick: false,
  showCancelButton: true,
  confirmButtonText: "Ingresar",
  cancelButtonText: "Cancelar",
  inputValidator: (value) => {
    if (!value) {
      return "Debe ingresar un nombre de usuario";
    }
  },
}).then((result) => {
  user = result.value;
  socket.emit("usuario_ingresado", user);

  socket.on("mostrar_usuario", (data) => {
    Swal.fire({
      title: `Usuario conectado ${data}`,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      background: "#4caf50",
    });
  });
});

// Chatbox
input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const value = input.value;
    socket.emit("mensaje_enviado", {
      user: user,
      message: value,
    });

    input.value = "";
  }
});

boton.addEventListener("click", (e)=> {
    e.preventDefault();
    const value = input.value;
    socket.emit("mensaje_enviado", {
      user: user,
      message: value,
    });

    input.value = "";
})


// Caja de mensajes
socket.on("mostrar_mensajes", (data) => {
  mensajes.innerHTML = "";

  data.map((mensaje) => {
    return (mensajes.innerHTML += `<strong>${mensaje.user} :</strong> ${mensaje.message} </br>`);
  });
});
