//Declaración de variables
var nombreUsuario = 'Clara';

var saldoCuenta = 1000;

var limiteExtraccion = 200;

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}

//Funciones que tenes que completar

function cambiarLimiteDeExtraccion() {
    var cambiarLimite = parseInt(prompt("Ingrese el nuevo límite de extracción"));
    limiteExtraccion = cambiarLimite;
    actualizarLimiteEnPantalla() 
    alert("Su nuevo límite de extracción es: " + limiteExtraccion);
}


function extraerDinero() {
    var cantidadExtraer = parseInt(prompt("Cuanto dinero quiere extraer?"));
    if (saldoCuenta < cantidadExtraer) {
        alert("No hay saldo disponible en la cuenta para extraer esa cantidad de dinero.");
    } else if (cantidadExtraer > limiteExtraccion) {
        alert("La cantidad a extraer es mayor a su límite de extracción." + "\n" + "Su Limite es: " + limiteExtraccion);
    } else if (cantidadExtraer % 100) {
        alert("Solo puedes extraer billetes de 100.");
        return 0;
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
        alert("Debe ingresar un monto numérico.");
        cantidadDepositar = 0;
        depositarDinero();
    } else {
        saldoCuenta = saldoCuenta + cantidadDepositar;
        console.log(saldoCuenta);
        alert("Has depositado: " + cantidadDepositar + "\n" + "Saldo Anterior: " + (saldoCuenta-cantidadDepositar) + "\n" + "Saldo Actual: " + saldoCuenta); 
    }
    actualizarSaldoEnPantalla();
}

function pagarServicio() {

}

function transferirDinero() {

}

function iniciarSesion() {

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

