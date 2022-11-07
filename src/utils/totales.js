import { useCounterStore } from "stores/estados";

export const obtenerTotalesBalance = (año) => {
  let balance = useCounterStore().getBalanceGeneralByYear(año);

  const inventarios = balance.activo.activo_corriente.get("Inventarios");

  const efectivo = balance.activo.activo_corriente.get(
    "Efectivo y Equivalentes de Efectivo"
  );

  const cuentas_por_cobrar = balance.activo.activo_corriente.get(
    "Deudores comerciales y otras cuentas por cobrar"
  );

  const cuentas_por_pagar =
    balance.pasivo.pasivo_corriente.get(
      "Cuentas por pagar a proveedores de energía"
    ) +
    balance.pasivo.pasivo_corriente.get("Acreedores y otras cuentas por pagar");

  // Totales de Activo Balance General

  let totalActivoCorriente = 0;
  balance.activo.activo_corriente.forEach((value) => {
    totalActivoCorriente += value;
  });

  let totalActivoNoCorriente = 0;
  balance.activo.activo_no_corriente.forEach((value) => {
    totalActivoNoCorriente += value;
  });

  let totalActivo = totalActivoCorriente + totalActivoNoCorriente;

  // Totales de Pasivo Balance General

  let totalPasivoCorriente = 0;
  balance.pasivo.pasivo_corriente.forEach((value) => {
    totalPasivoCorriente += value;
  });

  let totalPasivoNoCorriente = 0;
  balance.pasivo.pasivo_no_corriente.forEach((value) => {
    totalPasivoNoCorriente += value;
  });

  let totalPasivo = totalPasivoCorriente + totalPasivoNoCorriente;

  // Total Patrimonio Balance
  let patrimonioAtribuible = 0;
  balance.patrimonio.get("sub_patrimonio_propietarios").forEach((value) => {
    patrimonioAtribuible += value;
  });

  let totalPatrimonio =
    patrimonioAtribuible +
    balance.patrimonio.get("Participaciones no controladoras");

  return {
    balance,

    efectivo,
    inventarios,
    cuentas_por_cobrar,
    cuentas_por_pagar,
    patrimonioAtribuible,

    totalActivo,
    totalActivoCorriente,
    totalActivoNoCorriente,
    totalPasivo,
    totalPasivoCorriente,
    totalPasivoNoCorriente,
    totalPatrimonio,
  };
};

export const obtenerTotalesEstado = (año) => {
  let estado = useCounterStore().getEstadoByYear(año);

  const total_depreciacion =
    estado.sub_costos_y_gastos_de_operacion.get("Depreciación");

  let impuestos =
    estado.sub_impuestos_y_reservas.get("Impuesto sobre la renta") +
    estado.sub_impuestos_y_reservas.get(
      "Contribución especial para el plan de seguridad ciudadana"
    );

  // Total Productos de operacion

  let ProductosOperacion = 0;
  estado.sub_productos_de_operacion.forEach((value) => {
    ProductosOperacion += value;
  });

  // Total Costos de Energia

  let CostosEnergia =
    estado.sub_costos_y_gastos_de_operacion.get("Costo de venta y servicios") +
    estado.sub_costos_y_gastos_de_operacion.get("Compra de energía");

  let utilidadBruta = ProductosOperacion - CostosEnergia;

  // Costos y gastos de operacion

  let costosYGastosOperacion = 0;
  estado.sub_costos_y_gastos_de_operacion.forEach((value) => {
    costosYGastosOperacion += value;
  });

  costosYGastosOperacion = costosYGastosOperacion - CostosEnergia;

  // Utilidad Operacion

  let utilidadOperacion = ProductosOperacion - costosYGastosOperacion;

  // Gastos Financieros

  let gastosFinancieros =
    estado.sub_gastos_financieros.get("Gastos Financieros");

  // Productos Financieros

  let productosFinancieros = 
  estado.sub_ingresos_financieros.get("Ingresos financieros");

  // Utilidad antes de impuestos

  let utilidadAntesImpuestos =
    utilidadOperacion - gastosFinancieros + productosFinancieros;

  // Impuestos y Reservas

  let impuestos_y_reservas = 0;
  estado.sub_impuestos_y_reservas.forEach((value) => {
    impuestos_y_reservas += value;
  });

  // Utilidad Neta

  let utilidadNeta = utilidadAntesImpuestos - impuestos_y_reservas;

  // sub_resultados_integrales

  let sub_resultados_integrales = 0;
  estado.sub_resultados_integrales.forEach(value => {
    sub_resultados_integrales += value;
  });

  let resultadosIntegralesAño = utilidadNeta + sub_resultados_integrales;

  // Sub utilidad atribuible

  let sub_utilidad_atribuible = 0;
  estado.sub_utilidad_atribuible.forEach(value => {
    sub_utilidad_atribuible += (value || 0);
  });

  let sub_resultados_integrales_atribuible = 0;
  if(estado.sub_resultados_integrales_atribuible) {
    estado.sub_resultados_integrales_atribuible.forEach(value => {
      sub_resultados_integrales_atribuible += value;
    })
  }

  let sub_utilidades_por_accion = 0;
  if(estado.sub_utilidades_por_accion) {
    estado.sub_utilidades_por_accion.forEach(value => {
      sub_utilidades_por_accion += value;
    })
  }

  return {
    estado,
    total_depreciacion,
    impuestos,
    utilidadBruta,
    utilidadOperacion,
    utilidadAntesImpuestos,
    utilidadNeta,
    ProductosOperacion,
    CostosEnergia,
    costosYGastosOperacion,
    productosFinancieros,
    gastosFinancieros,
    impuestos_y_reservas,
    sub_resultados_integrales,
    resultadosIntegralesAño,
    sub_utilidad_atribuible,
    sub_resultados_integrales_atribuible,
    sub_utilidades_por_accion
  };
};
