//Declaración de variables
var nombreUsuario = 'Clara';
var clave = 1234;

var saldoCuenta = 1000;

var limiteExtraccion = 2000;

var monto = 0;

// Servicios Disponibles
var agua = 350;
var telefono = 425;
var luz = 210;
var internet = 570;

// Cuentas Amigas
var cuentaAmiga1 = 1234567;
var cuentaAmiga2 = 7654321;

function mensajeIsNan(){
    alert("Debe ingresar un monto numérico.");
}

function mensajeFondoInsuficiente(){
    alert("No hay saldo suficiente." + "\n" + "Saldo Disponible: " + saldoCuenta);
}

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
    iniciarSesion();    
}

//Funciones que tenes que completar

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


function pagarServicio() {
    servicio = parseInt(prompt("Ingrese el número que corresponda con el servicio que quiera pagar." + "\n" + "1 - Agua" + "\n" + "2 - Luz" + "\n" + "3 - Internet" + "\n" + "4 - Telefono"));
    switch (servicio) {
        case 1:
            servicioSeleccionado();
            console.log(servicio + " - Agua");
            break;
        case 2:
            servicioSeleccionado();    
            console.log(servicio + " - Luz");
            break;
        case 3:
            servicioSeleccionado();
            console.log(servicio + " - Internet");
            break;
        case 4:
            servicioSeleccionado();
            console.log(servicio + " - Telefono");
            break;
        default:
            alert("El servicio no se encuentra disponible.");
    }

}

function servicioSeleccionado() {
    if (servicio == 1 && saldoCuenta >= agua) {
        saldoCuenta = saldoCuenta - agua;
        alert("Has pagado el servicio Agua." + "\n" + "Saldo Anterior: " + (saldoCuenta + agua) + "\n" + "Dinero descontado: " + (agua) + "\n" + "Saldo Actual: " + saldoCuenta); 
    } else if (servicio == 2 && saldoCuenta >= telefono) {
        saldoCuenta = saldoCuenta - telefono;
        alert("Has pagado el servicio teléfono." + "\n" + "Saldo Anterior: " + (saldoCuenta + telefono) + "\n" + "Dinero descontado: " + (telefono) + "\n" + "Saldo Actual: " + saldoCuenta); 
    } else if (servicio == 3 && saldoCuenta >= luz) {
        saldoCuenta = saldoCuenta - luz;
        alert("Has pagado el servicio luz." + "\n" + "Saldo Anterior: " + (saldoCuenta + luz) + "\n" + "Dinero descontado: " + (luz) + "\n" + "Saldo Actual: " + saldoCuenta); 
    }  else if (servicio == 4 && saldoCuenta >= internet) {
        saldoCuenta = saldoCuenta - internet;
        alert("Has pagado el servicio internet." + "\n" + "Saldo Anterior: " + (saldoCuenta + internet) + "\n" + "Dinero descontado: " + (internet) + "\n" + "Saldo Actual: " + saldoCuenta); 
    } else {
        mensajeFondoInsuficiente();
    }
    actualizarSaldoEnPantalla();
}


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

function iniciarSesion() {
    usuarioClave = parseInt(prompt("Ingrese su clave"));

    if (usuarioClave == clave) {
        alert("Bienvenido/a " + nombreUsuario + "ya puedes comenzar a realizar operaciones");
        cargarNombreEnPantalla();
        actualizarSaldoEnPantalla();
        actualizarLimiteEnPantalla();
    } else {
        alert("Código incorrecto. Tu dinero ha sido retenido por cuestiones de seguridad.");
        noCargarCuenta();
        saldoCuenta = 0;
    }
}


//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}

function noCargarCuenta() {
    document.getElementById("datos-cuenta").innerHTML = "Debe loguearse para operar";
}
