let fecha_actual = Date.now()
let mayoria_edad = 18 //MÉXICO
let ingreso_mensual = 0
let monto_solicitado = 0
const IMPUESTO10MESES = 10
const IMPUESTO12MESES = 14
const IMPUESTO24MESES = 18
const IMPUESTO36MESES = 22
const IMPUESTO48MESES = 26

//  FUNCIÓN INICIAL DEL PROCESO DEL PRESTAMO
function iniciaProceso() {
    console.log("Fecha de la solicitud : "+fecha_actual)
    //Validando fecha de nacimiento
    let fecha_ingresada = prompt("Ingrese se fecha de nacimiento:\n(yyyy-MM-dd)")
    //Función Flecha => Si la fecha no da un resulado positivo, entonces es false
    const validaFecha = (fecha) => !isNaN(Date.parse(fecha))
    if (validaFecha(fecha_ingresada)){
        const fecha_nacimiento = Date.parse(fecha_ingresada)
        console.log("Fecha correcta: "+fecha_nacimiento)
        // Validando diferencia para verificar si es mayor de edad
        // segundos = milisegundos / 1000
        // minutos = segundos / 60
        // horas = minutos / 60
        // Días = horas / 24
        // Año = dias / 365.25
        let diff = (fecha_actual - fecha_nacimiento) / (1000 * 60 * 60 * 24)
        if ((diff / 365.25) >= mayoria_edad) {
            console.log("Tu edad es : " + (diff / 365.25))
            validaMontoPrestamo()
        }
        else {
            console.warn("Debe de ser mayor de " + mayoria_edad + " para realizar un prestamo")
            iniciaProceso()
        }
    }
    else {
        console.error("Ingrese una fecha en el formato solicitado")
        iniciaProceso()
    }
}

// FUNCIÓN DE VALIDACIÓN DE MONTO
function validaMontoPrestamo(){
    //console.log("Lo haz logrado, puede pedir tu prestamo")
    let ingreso_m = 0
    let monto_s = 0
    ingreso_mensual = prompt("Ingresa tu ingreso mensual:\n(Ya descontando impuestos)")
    monto_solicitado = prompt("Ingresa el monto que vas a requerir de prestamo:")
    if (ingreso_mensual !== null && monto_solicitado !== null) {
        ingreso_m = Number.parseFloat(ingreso_mensual)
        monto_s = Number.parseFloat(monto_solicitado)
        if (ingreso_m > 0 && monto_s > 0) {
            //Validando 
            let minimo_requerido = monto_solicitado * (IMPUESTO10MESES/100)
            if (ingreso_m >= minimo_requerido){
                seleccionaPeriodoPago()
            }
            else {
                console.warn("Su ingreso mensual debe de ser mayor al 10% del monto solicitado:\n*IM : "+ingreso_m+"\nMS : "+monto_s+"\n10% :"+minimo_requerido)
                validaMontoPrestamo()
            }
        }
        else {
            console.error("Debe ingresar cantidades en ambas solicitudes")
            validaMontoPrestamo()
        }
    }
    else {
        console.error("Debe ingresar cantidades ")
        validaMontoPrestamo()
    }
}

//  FUNCIÓN ENCARGADA DE ESCOGER EL PERIODO DE PAGO Y SUS DEGLOCES
function seleccionaPeriodoPago(){
    //Validando opción de selección
    let opcion = 0
    let menu = prompt("Seleccione una opción del menú:\n ¿A cuantos meses desea pagar?\n1.- 12\n2.- 24\n3.- 36\n4.- 48")
    if (menu !== null){
        opcion = Number.parseInt(menu)
        switch (opcion) {
            case 1: //12 Meses
                {
                    muestraAmortizacion(12, IMPUESTO12MESES)
                    break;
                }
            case 2: //24 Meses
                {
                    muestraAmortizacion(24, IMPUESTO24MESES)
                    break;
                }
            case 3: //36 Meses
                {
                    muestraAmortizacion(36, IMPUESTO36MESES)
                    break;
                }
            case 4: //48 Meses
                {
                    muestraAmortizacion(48, IMPUESTO48MESES)
                    break;
                }
            default:
                {
                    console.error("Debe seleccionar una opción de la lista")
                    seleccionaPeriodoPago();
                    break;
                }
        }
    }
    else {
        console.error("Debe seleccionar una opción de la lista")
        muestraAmortizacion();
    }
    
}
//  FUNCIÓN QUE MUESTRA TABLA DE AMORTIZACIÓN Y TOTALES ADICIONALES
function muestraAmortizacion(meses, impuesto_aplicado){
    let amortizacion = "--MES-- --MONTO IMPUESTO-- --TASA %-- --MONTO + IMPUESTO-- --MONTO ACUMULADO--"
    let monto_mes = Math.round((monto_solicitado / meses)*100) / 100
    let monto_total_prestamo = 0
    for (contador=1; contador <= meses; contador++) {
        let variacion_imp = (impuesto_aplicado+Math.floor(Math.random() * 4)) / 100
        //Sumando Totales
        monto_total_prestamo += Math.round(((1+variacion_imp)*monto_mes)*100)/100
        amortizacion += "\n--"+contador+
                        "-- --"+Math.round((monto_mes*variacion_imp)*100)/100+
                        "-- --"+Math.round(variacion_imp*100)+
                        "-- --"+Math.round(((1+variacion_imp)*monto_mes)*100)/100+
                        "-- --"+Math.round(monto_total_prestamo*100)/100
        
    }
    //Mostrando tabla de amortización
    console.log("**** AMORTIZACIÓN *****\n"+amortizacion)
    //Mostrando Total del Prestamo ya con impuestos
    console.log("**** TOTAL: "+Math.round(monto_total_prestamo*100)/100)
    //Confirmando alguna otra cotización
    if (confirm("¿Desea realizar otra cotización?")) {
        ingreso_mensual = 0
        monto_solicitado = 0
        iniciaProceso()
    }
    else
        console.log("Invoque la función 'iniciaProceso()' para volver a cotizar.")
}

iniciaProceso()