import { useCounterStore } from "stores/estados";

export const obtenerTotalesBalance = (año) => {
    let balance = useCounterStore().getBalanceGeneralByYear(año);

    // Totales de Activo Balance General

    let totalActivoCorriente = 0;
    balance.activo.activo_corriente.forEach(value => {
        totalActivoCorriente += value;
    });

    let totalActivoNoCorriente = 0;
    balance.activo.activo_no_corriente.forEach(value => {
        totalActivoNoCorriente += value;
    });

    let totalActivo = totalActivoCorriente + totalActivoNoCorriente;

    // Totales de Pasivo Balance General

    let totalPasivoCorriente = 0;
    balance.pasivo.pasivo_corriente.forEach(value => {
        totalPasivoCorriente += value;
    });

    let totalPasivoNoCorriente = 0;
    balance.pasivo.pasivo_no_corriente.forEach(value => {
        totalPasivoNoCorriente += value;
    });

    let totalPasivo = totalPasivoCorriente + totalPasivoNoCorriente;

    // Total Patrimonio Balance

    let totalCapitalSocial = 0;
    balance.patrimonio.get("sub_capital_social").forEach(value => {
        totalCapitalSocial += value;
    })

    let totalPatrimonio = 0;
    const patrimonioArray = Array.from(balance.patrimonio.values());
    for(let val = 1; val < patrimonioArray.length; val++){
        totalPatrimonio += patrimonioArray[val];
    }
    totalPatrimonio = totalPatrimonio + totalCapitalSocial;

    return {
        totalActivo,
        totalActivoCorriente,
        totalActivoNoCorriente,
        totalPasivo,
        totalPasivoCorriente,
        totalPasivoNoCorriente,
        totalCapitalSocial,
        totalPatrimonio       
    }
}

export const obtenerTotalesEstado = (año) => {
    let estado = useCounterStore().getEstadoByYear(año);

    // Total Productos de operacion

    let ProductosOperacion = 0;
    estado.sub_productos_de_operacion.forEach(value => {
       ProductosOperacion += value;
    });

    // Total Costos de Energia

    let CostosEnergia = estado.sub_costos_de_energia.get("Compra de energia");

    // Utilidad Bruta

    let utilidadBruta = ProductosOperacion - CostosEnergia;

    // Costos y gastos de operacion
    
    let costosYGastosOperacion = 0;
    estado.sub_costos_y_gastos_de_operacion.forEach(value => {
        costosYGastosOperacion += value;
    });

    // Utilidad Operacion

    let utilidadOperacion = utilidadBruta - costosYGastosOperacion;

    // Gastos Financieros

    let gastosFinancieros = estado.sub_gastos_financieros.get("Gastos Financieros");

    // Productos Financieros

    let productosFinancieros = 0;
    estado.sub_productos_financieros.forEach(value => {
        productosFinancieros += value;
    });

    // Utilidad antes de impuestos

    let utilidadAntesImpuestos = utilidadOperacion - gastosFinancieros + productosFinancieros;

    // Utilidad Neta

    let impuestos_y_reservas = 0;
    estado.sub_impuestos_y_reservas.forEach(value => {
        impuestos_y_reservas += value;
    });

    // Utilidad Neta

    let utilidadNeta = utilidadAntesImpuestos - impuestos_y_reservas;

    return {
        utilidadBruta,
        utilidadOperacion,
        utilidadAntesImpuestos,
        utilidadNeta,
        ProductosOperacion
    }
}