//Declaración de variables
var nombreUsuario = 'Clara';
var clave = 1234;

var saldoCuenta = 1000;

var limiteExtraccion = 2000;

var monto = 0;

// Servicios Disponibles
var agua = 350;
var luz = 210;
var telefono = 425;
var internet = 570;

// Cuentas Amigas
var cuentaAmiga1 = 1234567;
var cuentaAmiga2 = 7654321;

function mensajeIsNan(){
    alert("Debe ingresar un número.");
}

function mensajeFondoInsuficiente(){
    alert("No hay saldo suficiente." + "\n" + "Saldo Disponible: " + saldoCuenta);
}

//LOGIN USUARIO
window.onload = function() {
    document.getElementById("usuario-cuenta").classList.add("ocultar");
    document.getElementById("usuario-loguedo").classList.add("ocultar");
}

function iniciarSesion() {
    usuarioClave = parseInt(prompt("Ingrese su clave"));
    if (usuarioClave == clave) {
        alert("Bienvenido/a " + nombreUsuario + " ya puedes comenzar a realizar operaciones");
        cargarPantalla()
        cargarNombreEnPantalla();
        actualizarSaldoEnPantalla();
        actualizarLimiteEnPantalla();
    } else {
        alert("Código incorrecto. Tu dinero ha sido retenido por cuestiones de seguridad.");
        noCargarCuenta();
        saldoCuenta = 0;
    }
}

function cerrarSesion() {
    alert("Cerrando sesión...");
    document.getElementById("usuario-cuenta").classList.add("ocultar");
    document.getElementById("usuario-loguedo").classList.add("ocultar");
    document.getElementById("usuario-login").classList.remove("ocultar");
}

//Funciones que actualizan el valor de las variables en el HTML

function cargarPantalla() {
    document.getElementById("usuario-cuenta").classList.remove("ocultar");
    document.getElementById("usuario-loguedo").classList.remove("ocultar");
    document.getElementById("usuario-login").classList.add("ocultar");
}

function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
    if (saldoCuenta <= 100) {
        document.getElementById("aviso-saldo").classList.add("red-container");
    }
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}

function noCargarCuenta() {
    document.getElementById("datos-cuenta").innerHTML = "Debe loguearse para operar";
}


//CAMBIAR LIMITE EXTRACCIÓN

function cambiarLimiteDeExtraccion() {
    var cambiarLimite = parseInt(prompt("Ingrese el nuevo límite de extracción"));
    if (isNaN(cambiarLimite)) {
        mensajeIsNan();
        cambiarLimite = 0;
    } else {   
        limiteExtraccion = cambiarLimite;
        actualizarLimiteEnPantalla() 
        alert("Su nuevo límite de extracción es: " + limiteExtraccion);
    }
}

//EXTRAER DINERO

function extraerDinero() {
    var cantidadExtraer = parseInt(prompt("Cuanto dinero quiere extraer?"));
    if (saldoCuenta < cantidadExtraer) {
        mensajeFondoInsuficiente();
    } else if (cantidadExtraer > limiteExtraccion) {
        alert("La cantidad a extraer es mayor a su límite de extracción." + "\n" + "Su Limite es: " + limiteExtraccion);
    } else if (cantidadExtraer % 100) {
        alert("Solo puedes extraer billetes de 100.");
        return 0;
    } else if (isNaN(cantidadExtraer)) {
        mensajeIsNan();
        cantidadExtraer = 0;
    } else {
        saldoCuenta = saldoCuenta - cantidadExtraer;
        actualizarSaldoEnPantalla();
        alert("Has extraído: " + cantidadExtraer + "\n" + "Saldo Anterior: " + (saldoCuenta+cantidadExtraer) + "\n" + "Saldo Actual: " + saldoCuenta);
    }
}

//DEPOSITAR DINERO

function depositarDinero() {
    var cantidadDepositar = parseInt(prompt("Cuanto dinero quiere depositar?"));
    console.log(cantidadDepositar);
    if (isNaN(cantidadDepositar)) {
        mensajeIsNan();
        cantidadDepositar = 0;
    } else {
        saldoCuenta = saldoCuenta + cantidadDepositar;
        console.log(saldoCuenta);
        alert("Has depositado: " + cantidadDepositar + "\n" + "Saldo Anterior: " + (saldoCuenta-cantidadDepositar) + "\n" + "Saldo Actual: " + saldoCuenta); 
    }
    actualizarSaldoEnPantalla();
}

//PAGAR SERVICIOS

var seleccion;

function pagarServicio() {
    servicio = parseInt(prompt("Ingrese el número que corresponda con el servicio que quiera pagar." + "\n" + "1 - Agua" + "\n" + "2 - Luz" + "\n" + "3 - Internet" + "\n" + "4 - Telefono"));
    switch (servicio) {
        case 1:
            servicio = agua;
            seleccion = "Agua";
            servicioSeleccionado();
            console.log(servicio + " - " + seleccion);
            break;
        case 2:
            servicio = luz;
            seleccion = "Luz";
            servicioSeleccionado();    
            console.log(servicio + " - " + seleccion);
            break;
        case 3:
            servicio = internet;
            seleccion = "Internet";
            servicioSeleccionado();
            console.log(servicio + " - " + seleccion);
            break;
        case 4:
            servicio = telefono;
            seleccion = "Teléfono";
            servicioSeleccionado();
            console.log(servicio + " - " + seleccion);
            break;
        default:
            if (isNaN(servicio)) {
                servicio = 0;
                mensajeIsNan();
            } else {
                alert("El servicio no se encuentra disponible.");
            }
    }

}

function servicioSeleccionado() {
    if (saldoCuenta >= servicio) {
        saldoCuenta = saldoCuenta - servicio;
        alert("Has pagado el servicio " + seleccion + "\n" + "Saldo Anterior: " + (saldoCuenta + servicio) + "\n" + "Dinero descontado: " + (servicio) + "\n" + "Saldo Actual: " + saldoCuenta); 
    } else {
        mensajeFondoInsuficiente();
    }
    actualizarSaldoEnPantalla();
}

//TRANSFERIR DINERO

function transferirDinero() {
    monto = parseInt(prompt("Cuanto dinero desea transferir?"));
    if (monto > saldoCuenta) {
        mensajeFondoInsuficiente();
    } else if(isNaN(monto)) {
        mensajeIsNan();
        monto = 0;
    } else {
        confirmarCuenta();
    }
}

function confirmarCuenta(){
    cuenta = parseInt(prompt("Ingrese el numero de cuenta a la que desea transferir?"));
    switch (cuenta) {
        case 1234567:
            cuenta = cuentaAmiga1;
            console.log(cuenta + "es Cuenta Amiga 1");
            confirmaTransferencia();
            break;
        case 7654321:
            cuenta = cuentaAmiga2;
            console.log(cuenta + "es Cuenta Amiga 2");
            confirmaTransferencia();
            break;
        default:
            alert("Solo se puede transferir dinero a cuentas asociadas.");
    }
}

function confirmaTransferencia() {
    saldoCuenta = saldoCuenta - monto;
    actualizarSaldoEnPantalla();
    alert("Se han transferido: " + monto + "\n" + "Cuenta destino: " + cuenta);
}