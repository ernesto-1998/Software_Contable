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
        for(let [key, value] of totales.balance.patrimonio.get("sub_capital_social")){
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
    let sub_costos_de_energia = [];
    let sub_costos_y_gastos_de_operacion = [];
    let sub_gastos_financieros = [];
    let sub_productos_financieros = [];
    let sub_impuestos_y_reservas = [];

    for(let año of años){
        let totales = obtenerTotalesEstado(año);

        for(let [key, value] of totales.estado.sub_productos_de_operacion){
           sub_productos_de_operacion.push(key);
        }
        for(let [key, value] of totales.estado.sub_costos_de_energia){
           sub_costos_de_energia.push(key);
        }
        for(let [key, value] of totales.estado.sub_costos_y_gastos_de_operacion){
           sub_costos_y_gastos_de_operacion.push(key);
        }
        for(let [key, value] of totales.estado.sub_gastos_financieros){
           sub_gastos_financieros.push(key);
        }
        for(let [key, value] of totales.estado.sub_productos_financieros){
           sub_productos_financieros.push(key);
        }
        for(let [key, value] of totales.estado.sub_impuestos_y_reservas){
           sub_impuestos_y_reservas.push(key);
        }
    }

    return {
        sub_productos_de_operacion,
        sub_costos_de_energia,
        sub_costos_y_gastos_de_operacion,
        sub_gastos_financieros,
        sub_productos_financieros,
        sub_impuestos_y_reservas
    }
}                                                                                                                     