// BOTON DE COTIZACION
let boton = $("#botonCotizar");
$("#botonCotizar").click(function(){
    cotizarEvento();
});

// FUNCION PARA COTIZAR EL EVENTO
const cotizarEvento=()=>{
    // DATOS DEL FORMULARIO
    let tipoDeEvento=document.getElementById("evento").value;
    let invitados=document.getElementById("cantDeInvitados").value;
    let tradicional=$("#radioTradicional");
    let premium=$("#radioPremium");
    let aLaCarta=$("#radioALaCarta");

    // RESULTADOS A MOSTRAR
    let divResumen=document.getElementById("resumen");
    let divResultado=document.getElementById("resultado");
    divResultado.style.display="none";

    // VARIABLE SOBRE EL MENU
    let menu = "";
    if(menuTradicional.checked){
        menu = "Tradicional";
    } else if(menuPremium.checked){
        menu = "Premium";
    } else if (menuALaCarta.checked){
        menu = "A la carta";
    }

    //VARIABLE SOBRE LA CONDICION DE PAGO
    const condicionPago = [
        {metodo:"Efectivo", importe:1 },
        {metodo:"6 cuotas", importe:1.3 },
        {metodo:"12 cuotas", importe:1.6 },
        {metodo:"18 cuotas", importe:1.8 },
        {metodo:"24 cuotas", importe:2 }
    ]
    let seleccionada = document.getElementById("metodoDePagoSeleccionado").value;
    let metodoDePago;
    for (const condicion of condicionPago) {
        if (seleccionada == condicion.metodo){
            metodoDePago = condicion.importe;
        }
    }

    // VARIABLE SOBRE LA MONEDA DE PAGO
    let monedas = [
        {moneda: "Pesos", importe: 1},
        {moneda: "Dolares", importe: 0.01}
    ]
    let monedaSeleccionada = document.getElementById("monedaSeleccionada").value;
    let moneda;
    for (const item of monedas){
        if (monedaSeleccionada == item.moneda){
            moneda = item.importe;
        }
    }

    // FORMULARIO SIN COMPLETAR
    if((tipoDeEvento==='')||(invitados==='')||(menu==='')||(seleccionada ==='')||(monedaSeleccionada==='')){
        mostrarError("mensajeErrorCotizador", "COMPLETE TODOS LOS CAMPOS");
        return;
    }

    let cotizacion={tipoDeEvento, invitados, menu, metodoDePago, moneda};
    $("#msj").css({display: 'none'});

    $("#resumen").css({backgroungColor:"white"});
    $("#resumen").css({display:"block"});

    // CARGANDO INFO - RESUMEN DE COTIZACION
    $("#cargando").prepend(`<div style="text-align:center"><img src="cargando.gif" width=60 height=60></div>`);
    setTimeout(()=>{
        $("#cargando").hide();
        divResumen.innerHTML=`<div id="resumenCotizacion">
                                <h2> Resumen de Cotización </h2>
                                    <ul>
                                        <li>Tipo de Evento: ${tipoDeEvento}</li>
                                        <li>Cantidad de invitados: ${invitados}</li>
                                        <li>Menú: ${menu} </li>
                                        <li>Metodo de pago: ${seleccionada}</li>
                                        <li>Moneda: ${monedaSeleccionada}</li>
                                    </ul>
                                </div>`;
        let cotizacionFinal=cotizar(cotizacion);
        divResultado.style.display="block";
        divResultado.innerHTML=`<p class="textoCotizacion">$${cotizacionFinal}</p>`;
    }, 300);
}

// COTIZACION RESULTADO
const cotizar=(cotizacion)=>{
    const {tipoDeEvento, invitados, menu, metodoDePago, moneda}=cotizacion;
    let resultado = parseFloat(calcularMenu(menu)*invitados*diferencia(tipoDeEvento)*metodoDePago*moneda);
    return resultado;
}

// DIFERENCIA EN LA COTIZACION SOBRE TIPO DE EVENTO
const diferencia=tipoDeEvento=>{
    let incremento;
    switch(tipoDeEvento){
        case "Social": 
            incremento=1;
            break;
        case "Comercial":
            incremento=1.2;
            break;
        case "Empresarial":
            incremento=1.5;
            break;
        default: break;
    }
    return incremento;
}

// DIFERENCIA EN LA COTIZACION SOBRE TIPO DE MENU
const calcularMenu=menu=>{
    let precioMenu;
    switch(menu){
        case "Tradicional": 
            precioMenu=3000;
            break;
        case "Premium":
            precioMenu=3500;
            break;
        case "A la carta":
            precioMenu=4500;
            break;
        default: break;
    }
    return precioMenu;
}

// COTIZACION DOLAR
const JSON = "datos.json";
$.getJSON(JSON, function (respuesta, estado){
    if (estado === "success"){
        let misDatos = respuesta;
        for (const dato of misDatos){
            $("#cotizacionDolar").prepend(`<div>
                                    <h3>${dato.nombre}</h3>
                                    <p>${dato.venta}</p>
                                </div>`);
        }
    }
});
$("#cotizacionDolar").hide();

// MOSTRAR LA COTIZACION
$("body").prepend('<button id="botonDolar">Mostrar cotización del dolar</button>');
$("#botonDolar").click(() => {
    $("#botonDolar").fadeOut();
    $("#botonDolarOcultar").fadeIn();
    $("#cotizacionDolar").fadeIn();
})

//OCULTAR LA COTIZACION
$("body").prepend('<button id="botonDolarOcultar">Ocultar cotización del dolar</button>');
$("#botonDolarOcultar").hide();
$("#botonDolarOcultar").click(() => {
    $("#botonDolar").fadeIn();
    $("#botonDolarOcultar").fadeOut();
    $("#cotizacionDolar").fadeOut();
})

// ERRORES
const mostrarError=(elemento, mensaje)=>{
    divError=document.getElementById(elemento);
    divError.innerHTML=`<p class="error">${mensaje}</p>`;
    setTimeout(()=>{ divError.innerHTML=``;}, 2000);
}