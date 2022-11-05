export const razones_liquidez = {
  razon_circulante: function (activo_corriente, pasivo_corriente) {
    return activo_corriente / pasivo_corriente;
  },

  razon_rapida: function (activo_corriente, inventarios, pasivo_corriente) {
    return (activo_corriente - inventarios) / pasivo_corriente;
  },

  capital_trabajo: function (activo_corriente, pasivo_corriente) {
    return activo_corriente - pasivo_corriente;
  },
  nivel_de_dependencia_de_inventarios: function (
    pasivo_corriente,
    efectivo,
    cuentas_por_cobrar,
    inventarios
  ) {
    return (pasivo_corriente - (efectivo + cuentas_por_cobrar)) / inventarios;
  },
};

export const razones_actividad = {
  rotacion_cuentas_por_cobrar: function (cuentas_por_cobrar, ventas) {
    return 365 / this.periodo_promedio_cobro(cuentas_por_cobrar, ventas); // Cantidad de veces al año en que se hace el cobro total de las cuentas por cobrar
  },

  rotacion_inventarios: function (costo_de_ventas, inventarios) {
    return costo_de_ventas / inventarios;
  },

  numero_dias_inventario: function (inventarios, costo_de_ventas) {
    return (inventarios * 365) / costo_de_ventas;
  },

  ciclo_operacional: function (
    cuentas_por_cobrar,
    ventas,
    inventarios,
    costo_de_ventas
  ) {
    return (
      (cuentas_por_cobrar * 365) / ventas +
      this.numero_dias_inventario(inventarios, costo_de_ventas)
    );
  },

  periodo_promedio_cobro: function (cuentas_por_cobrar, ventas) {
    return cuentas_por_cobrar / (ventas / 365);
  },

  // *************************************************
  periodo_promedio_pago: function (cuentas_por_pagar, ventas) {
    return cuentas_por_pagar / ((ventas * 0.7) / 365);
  },

  rotacion_activo_total: function (ventas, activos_totales) {
    return ventas / activos_totales;
  },

  rotacion_activo_operacional: function (
    ventas,
    total_cuentas_por_cobrar,
    inventarios,
    activo_no_corriente,
    total_depreciacion,
    efectivo
  ) {
    return (
      ventas /
      (efectivo +
        total_cuentas_por_cobrar +
        inventarios +
        activo_no_corriente -
        total_depreciacion)
    );
  },
};

export const razones_deuda = {
  razon_endeudamiento: function (pasivos_totales, activos_totales) {
    return (pasivos_totales / activos_totales) * 100;
  },

  razon_deuda_capital_patrimonial: function (pasivos_totales, capital) {
    return (pasivos_totales / capital) * 100;
  },

  razon_cargos_interes_fijo: function (utilidad_antes_impuestos, impuestos) {
    return utilidad_antes_impuestos / impuestos;
  },

  MAF: function (activos_totales, patrimonio) {
    return activos_totales / patrimonio;
  },
};

export const razones_rendimiento = {
  ROA: function (utilidad_neta, activos) {
    return (utilidad_neta / activos) * 100;
  },

  ROE: function (utilidad_neta, patrimonio) {
    return (utilidad_neta / patrimonio) * 100;
  },

  margen_utilidad_bruta: function (utilidad_bruta, ventas) {
    return (utilidad_bruta / ventas) * 100; // utilidades_brutas = ventas - costo de los bienes vendidos
  },

  margen_utilidad_operativa: function (utilidad_operativa, ventas) {
    return (utilidad_operativa / ventas) * 100;
  },

  margen_utilidad_neta: function (utilidad_neta, ventas) {
    return (utilidad_neta / ventas) * 100;
  },
};
