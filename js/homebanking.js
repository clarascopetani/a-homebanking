//Declaración de variables
var nombreUsuario = 'Clara';
var user = "clara" 
var pass = 1234;

var saldoCuenta = 1000;
var limiteExtraccion = 2000;
// var monto = 0;

// Servicios Disponibles
var agua = 350;
var luz = 210;
var telefono = 425;
var internet = 570;

// Cuentas Amigas
var cuentaAmiga1 = 1234567;
var cuentaAmiga2 = 7654321;

// Funciones generales

function sumarDinero(cantidad){
    saldoCuenta += cantidad;
}

function restarDinero(cantidad){
    saldoCuenta -= cantidad;
}

function chequearSaldo(monto){
    if (monto > saldoCuenta){
        mensajeFondoInsuficiente();
    }
    return monto <= saldoCuenta;
}

function chequearLimite(monto){
    if (monto > limiteExtraccion){
        alert("La cantidad a extraer es mayor a su límite de extracción." + "\n" + "Su Limite es: " + limiteExtraccion);
    }
    return monto <= limiteExtraccion;
}

function billetesDisponibles(monto){
    if (monto % 100) {
        alert("Solo puedes extraer billetes de 100.");
    }
    return 0;
}

function caracteresInvalidos(numero){
    var esNumero = typeof numero === "number";
    var esValido = esNumero && numero >= 0;
    if (!esValido) {
        alert("Debe ingresar un número.");
    }
    return !esValido;
}

function mensajeFondoInsuficiente(){
    alert("No hay saldo suficiente." + "\n" + "Saldo Disponible: " + saldoCuenta);
}

function mensajeIsNan(){
    alert("Debe ingresar un número.");
}

function operacionExitosa(monto){
    var saldoAnterior = saldoCuenta;
    restarDinero(monto);
    alert("OPERACIÓN EXITOSA.\nSe descontaron $" + monto + " de su cuenta." + "\n\n" + "Saldo anterior: $" + saldoAnterior + "\n" + "Saldo actual: $" + saldoCuenta);
}


//LOGIN USUARIO
window.onload = function() {
    document.getElementById("usuario-cuenta").classList.add("ocultar");
    document.getElementById("usuario-loguedo").classList.add("ocultar");
}

function iniciarSesion() {
    usuarioUser = prompt("Por favor, ingrese su nombre de usuario:");
    usuarioPass = parseInt(prompt("Por favor, ingrese su clave personal:"));
    if (usuarioUser == user && usuarioPass == pass) {
        alert("Bienvenido/a " + nombreUsuario + " ya puedes comenzar a realizar operaciones");
        cargarPantalla()
        cargarNombreEnPantalla();
        actualizarSaldoEnPantalla();
        actualizarLimiteEnPantalla();
    } else if (usuarioUser !== user) {
        alert("Código incorrecto. Tu dinero ha sido retenido por cuestiones de seguridad.");
        noCargarCuenta();
        saldoCuenta = 0;
    } else {
        cargarPantalla();
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
    } else {
        document.getElementById("aviso-saldo").classList.remove("red-container");
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
    var saldoAnterior = saldoCuenta;
    var monto = parseInt(prompt("Cuanto dinero desea extraer?"));
    if(!caracteresInvalidos(monto) && chequearLimite(monto) && chequearSaldo(monto) && billetesDisponibles(monto)){
        operacionExitosa(monto);
        alert("Has extraído: " + monto + "\n" + "Saldo Anterior: " + saldoAnterior + "\n" + "Saldo Actual: " + saldoCuenta);
    }
    actualizarSaldoEnPantalla();
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

var seleccion = "Servicio no seleccionado";

function pagarServicio() {
    servicio = parseInt(prompt("Ingrese el número correspondiente al servicio que desea abonar." + "\n\n" + "1 - Agua ($" + agua + ")"  + "\n" +  "2 - Luz ($" + luz + ")"  + "\n" +  "3 - Internet ($" + internet + ")"  + "\n" + "4 - Telefono ($" + telefono + ")"));
    switch (servicio) {
        case 1:
            seleccion = "Agua";
            if(chequearSaldo(agua)){
                operacionExitosaServicios(agua);
            }
            break;
        case 2:
            seleccion = "Luz";
            if(chequearSaldo(luz)){
                operacionExitosaServicios(luz);
            }  
            break;
        case 3:
            seleccion = "Internet";
            if(chequearSaldo(internet)){
                operacionExitosaServicios(internet);
            } 
            break;
        case 4:
            seleccion = "Telefono";
            if(chequearSaldo(telefono)){
                operacionExitosaServicios(telefono);
            } 
            break;
        default:
            if (isNaN(servicio)) {
                servicio = 0;
                mensajeIsNan();
            } else {
                alert("El servicio no se encuentra disponible.");
            }
    }
    actualizarSaldoEnPantalla();
}

function operacionExitosaServicios(monto) {
    var saldoAnterior = saldoCuenta;
    restarDinero(monto);
    alert("OPERACIÓN EXITOSA.\nSe descontaron $" + monto + " de su cuenta. \n\n" + "Has pagado el servicio " + seleccion + "\n" + "Saldo Anterior: $" + saldoAnterior + "\n" + "Dinero descontado: $" + monto + "\n" + "Saldo Actual: $" + saldoCuenta); 
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