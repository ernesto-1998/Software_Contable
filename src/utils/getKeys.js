import { obtenerTotalesBalance, obtenerTotalesEstado } from "./totales";

export const getKeysBalance = (años) => {
    let ActivoCorriente = [];
    let ActivoNoCorriente = [];
    let PasivoCorriente = [];
    let PasivoNoCorriente = [];
    let Patrimonio = [];

    for(let año of años){
        let totales = obtenerTotalesBalance(año);

        for(let [key, value] of totales.balance.activo.activo_corriente){
                ActivoCorriente.push(key);
        }
        for(let [key, value] of totales.balance.activo.activo_no_corriente){
                ActivoNoCorriente.push(key);
        }
        for(let [key, value] of totales.balance.pasivo.pasivo_corriente){
                PasivoCorriente.push(key);
        }
        for(let [key, value] of totales.balance.pasivo.pasivo_no_corriente){
                PasivoNoCorriente.push(key);
        }
        for(let [key, value] of totales.balance.patrimonio.get("sub_patrimonio_propietarios")){
                Patrimonio.push(key);
        }
        for(let [key, value] of totales.balance.patrimonio){
                Patrimonio.push(key);
        }
    }

    return {
        ActivoCorriente,
        ActivoNoCorriente,
        PasivoCorriente,
        PasivoNoCorriente,
        Patrimonio
    }
}

export const getKeysEstado = (años) => {
    let sub_productos_de_operacion = [];
    let sub_costos_y_gastos_de_operacion = [];
    let sub_ingresos_financieros = [];
    let sub_gastos_financieros = [];
    let sub_impuestos_y_reservas = [];
    let sub_resultados_integrales = [];
    let sub_utilidad_atribuible = [];
    let sub_resultados_integrales_atribuible = [];
    let sub_utilidades_por_accion = [];;

    for(let año of años){
        let totales = obtenerTotalesEstado(año);

        for(let [key, value] of totales.estado.sub_productos_de_operacion){
           sub_productos_de_operacion.push(key);
        }
        for(let [key, value] of totales.estado.sub_costos_y_gastos_de_operacion){
            sub_costos_y_gastos_de_operacion.push(key);
        }
        for(let [key, value] of totales.estado.sub_ingresos_financieros){
            sub_ingresos_financieros.push(key);
        }
        for(let [key, value] of totales.estado.sub_gastos_financieros){
            sub_gastos_financieros.push(key);
        }
        for(let [key, value] of totales.estado.sub_impuestos_y_reservas){
           sub_impuestos_y_reservas.push(key);
        }
        for(let [key, value] of totales.estado.sub_resultados_integrales){
            sub_resultados_integrales.push(key);
        }
        for(let [key, value] of totales.estado.sub_utilidad_atribuible){
            sub_utilidad_atribuible.push(key);
        }
        if(totales.estado.sub_resultados_integrales_atribuible){
            for(let [key, value] of totales.estado.sub_resultados_integrales_atribuible){
                sub_resultados_integrales_atribuible.push(key);
            }
        } 
        for(let [key, value] of totales.estado.sub_utilidades_por_accion){
            sub_utilidades_por_accion.push(key);
        }
    }

    return {
        sub_productos_de_operacion,
        sub_costos_y_gastos_de_operacion,
        sub_ingresos_financieros,
        sub_gastos_financieros,
        sub_impuestos_y_reservas,
        sub_resultados_integrales,
        sub_utilidad_atribuible,
        sub_resultados_integrales_atribuible,
        sub_utilidades_por_accion
    }
}                                                                                                                     