// INFO USUARIOS
function usuario(nombre, email, contrasenia) {
    this.id = Math.floor(Math.random() * 100);;
    this.nombre = nombre;
    this.email = email;
    this.contrasenia = contrasenia;
}

// USUARIOS REGISTRADOS
let usuariosRegistrados;

let registro = localStorage.getItem("registro-personas");
if (!registro) {
    usuariosRegistrados = []
} else {
    usuariosRegistrados = JSON.parse(localStorage.getItem("registro-personas"));
}

// FUNCION PARA INICIO DE SESION
function iniciarSesion(e) {
    e.preventDefault()
    let usuarioMail = document.getElementById("emailSesion").value;
    let contraseniaSesion = document.getElementById("pwdSesion").value;
    let usuarioSesion = usuariosRegistrados.filter((el) => el.email == usuarioMail)[0];
    let mensajesLogueo = [];
    let errorLogueo = document.getElementById("errorLogueo");
    
    if (usuarioMail == ""){
        mensajesLogueo.push("Ingresa tu email");
    }else if (!usuarioSesion) {
        mensajesLogueo.push("Usuario no registrado");
    }else if (contraseniaSesion == ""){
        mensajesLogueo.push("Ingresa tu contraseña");
    }else if (contraseniaSesion != usuarioSesion.contrasenia) {
        mensajesLogueo.push("La contraseña es incorrecta");
    }
    else {
    window.location.href = "cotizador.html";
    }    
    errorLogueo.innerHTML = mensajesLogueo.join(" , ");
}

//BOTON DE INICIO DE SESION
let botonSesion = document.getElementById("botonSesion");
botonSesion.addEventListener("click", iniciarSesion);