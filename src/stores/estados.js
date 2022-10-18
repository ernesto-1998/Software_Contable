import { defineStore } from 'pinia';

export const useCounterStore = defineStore('estados', {
  state: () => ({
    balance_general: [
      { 
        año: 2018, // Al 30 de Septiembre
        activo: {
          activo_corriente: {
            efectivo_y_equivalentes_de_efectivo: 3_798_415,
            deudores_comerciales_y_otras_cuentas_por_cobrar: 50_183_081,
            cuentas_por_cobrar_empresas_relacionadas: 461_993,
            inversiones: 980_484,
            inventario: 4_516_793,
            pagos_por_anticipado: 1_160_637,
            impuestos_corrientes: 3_478_250,
            otros_activos_financieros: 391_147,
            total: 64_970_800
          },
          activo_no_corriente: {
            propiedades_planta_y_equipo: 109_517_283,
            activos_por_derecho_de_uso: 0,
            cuentas_por_cobrar_a_LP: 1_389_713,
            inversiones: 909_944,
            activos_intangibles: 5_973_148,
            impuestos_diferidos: 2_758_176,
            total: 120_548_263
          },
          total_activo: 185_519_062
        },
        pasivo: {
          pasivo_corriente: {
            acreedores_comerciales_y_otras_cuentas_por_pagar: 38_798_367,
            porcion_de_los_prestamos_a_largo_plazo_con_vencimiento_a_corto_plazo: 7_500_000,
            obligaciones_emision_de_titulosvalores: 1_265_000,
            cuentas_por_pagar_empresas_relacionadas: 305_489,
            impuestos_corrientes: 597_443,
            provisiones: 5_418_622,
            pasivos_por_arrendamientos: 0,
            otros_pasivos_financieros: 884_001,
            total: 54_768_922 
          },
          pasivo_no_corriente: {
            prestamos_y_otras_obligaciones_financieras: 27_319_821,
            obligaciones_emision_de_titulosvalores: 20_985_764,
            depositos_de_consumidores: 3_754_462,
            impuestos_diferidos: 18_865_614,
            pasivos_por_arrendamientos: 0,
            otros_pasivos_financieros: 3_534_848,
            provisiones: 5_930_720,
            total: 80_391_230
          },
          total_pasivo: 135_160_152
        },
        patrimonio: {
          capital_social: 12_282_292,
          reserva_legal: 7_018_453,
          superavit_por_revaluacion_de_activos: 8_644_085,
          ganancias_actuariales: 317_639, //Importante, este aparece entre parentesis en el balance general
          superavit_realizado: 11_518_326,
          resultado_del_periodo: 11_213_394,
          total: 50_358_910
        },
        total_pasivo_mas_patrimonio: 185_519_062
       }
    ],
    
    estado_resultados: [

      {
        año: 2018,
        productos_de_operacion: {
          ventas_de_energia: 102_704_499.40,
          ventas_de_energia_entre_compañias_distribuidoras: 1_914_807.92,
          ingresos_por_uso_de_red: 28_877_072.46,
          ingresos_por_transacciones_en_el_MRS: 5_705_568.58,
          otros_productos_de_operacion: 5_464_267.36,
          total: 144_666_215.72
        },
        costos_de_energia: {
          compra_de_energia: 108_739_922.53,
          total: 108_739_922.53
        },
        margen_compra_venta_de_energia: {
          gastos_de_operacion_y_mantenimiento: 9_531_724.80,
          gastos_de_comercializacion: 3_953_024.38,
          gastos_por_cuenta_de_consumidores: 785_642.01,
          gastos_de_administracion: 4_013_427.33,
          gastos_por_depreciacion: 2_881_276.81,
          amortizacion_de_intangibles: 574_392.68,
          costos_por_servicios_a_terceros: 1_009_839.46,
          gastos_de_periodos_anteriores: 459_198.00,
          otros_gastos: 0.00,
          perdidas_por_retiro_de_activos_fijos: 133_155.08,
          total: 35_926_293.19   
        },
        costos_y_gastos_de_operacion: 23_341_680.55,
        utilidad_de_operacion: 12_584_612.64,
        gastos_financieros: {
          gastos_financieros: 1_524_546.78,
          total: 1_524_546.78
        },
        productos_financieros: {
          productos_financieros: 229_386.04,
          otros_ingresos_financieros: 390_893.44,
          total: 620_279.48
        },
        utilidad_antes_de_impuestos_y_reservas: {
          impuesto_sobre_la_renta: 954_789.67,
          impuesto_sobre_la_renta_diferido: 2_934_669.10,
          contribucion_especial: 119_368.01,
          total: 11_680_345.34
        },
        utilidad_por_distribuir: 7_671_518.56
      },

      {
        año: 2019,
        productos_de_operacion: {
          ventas_de_energia: 118_710_848.10,
          ventas_de_energia_entre_compañias_distribuidoras: 2_010_332.85,
          ingresos_por_uso_de_red: 30_371_219.90,
          ingresos_por_transacciones_en_el_MRS: 5_804_280.87,
          otros_productos_de_operacion: 5_497_749.86,
          total: 162_394_431.58
        },
        costos_de_energia: {
          compra_de_energia: 125_321_771.49,
          total: 125_321_771.49
        },
        margen_compra_venta_de_energia: {
          gastos_de_operacion_y_mantenimiento: 9_546_247.84,
          gastos_de_comercializacion: 4_820_691.17,
          gastos_por_cuenta_de_consumidores: 80.13,
          gastos_de_administracion: 4_144_539.29,
          gastos_por_depreciacion: 3_948_588.54,
          amortizacion_de_intangibles: 729_609.51,
          amortizacion_de_activos_por_derecho_de_uso: 465_754.08,
          costos_por_servicios_a_terceros: 688_761.94,
          gastos_de_periodos_anteriores: 321_996.49,
          otros_gastos: 0.00,
          perdidas_por_retiro_de_activos_fijos: 207_176.59,
          total: 37_072_660.09   
        },
        costos_y_gastos_de_operacion: 24_873_445.58,
        utilidad_de_operacion: 12_199_214.51,
        gastos_financieros: {
          gastos_financieros: 1_905_968.38,
          total: 1_905_968.38
        },
        productos_financieros: {
          productos_financieros: 244_902.06,
          otros_ingresos_financieros: 515_999.82,
          total: 760_901.88
        },
        utilidad_antes_de_impuestos_y_reservas: {
          impuesto_sobre_la_renta: 3_348_719.43,
          impuesto_sobre_la_renta_diferido: 491_362.05,
          contribucion_especial: 397_286.22,
          total: 11_054_148.01
        },
        utilidad_por_distribuir: 6_816_780.31
      },

      {
        año: 2020,
        productos_de_operacion: {
          ventas_de_energia: 88_733_342.81,
          ventas_de_energia_entre_compañias_distribuidoras: 1_492_441.82,
          ingresos_por_uso_de_red: 30_070_472.23,
          ingresos_por_transacciones_en_el_MRS: 4_805_440.58,
          otros_productos_de_operacion: 5_389_696.72,
          total: 130_491_394.16
        },
        costos_de_energia: {
          compra_de_energia: 96_738_227.56,
          total: 96_738_227.56
        },
        margen_compra_venta_de_energia: {
          gastos_de_operacion_y_mantenimiento: 9_649_310.13,
          gastos_de_comercializacion: 4_472_817.42,
          gastos_por_cuenta_de_consumidores: 8_705.04,
          gastos_de_administracion: 4_068_176.04,
          gastos_por_depreciacion: 2_823_804.94,
          amortizacion_de_intangibles: 721_596.34,
          amortizacion_de_activos_por_derecho_de_uso: 479_480.62,
          costos_por_servicios_a_terceros: 605_634.40,
          gastos_de_periodos_anteriores: 594_410.60,
          otros_gastos: 0.00,
          perdidas_por_retiro_de_activos_fijos: 94_208.91,
          total: 33_753_166.60   
        },
        costos_y_gastos_de_operacion: 23_518_144.44,
        utilidad_de_operacion: 10_235_022.16,
        gastos_financieros: {
          gastos_financieros: 1_542_383.31,
          total: 1_542_383.31
        },
        productos_financieros: {
          productos_financieros: 433_886.17,
          otros_ingresos_financieros: 497_711.84,
          total: 931_598.01
        },
        utilidad_antes_de_impuestos_y_reservas: {
          impuesto_sobre_la_renta: 5_331_212.21,
          impuesto_sobre_la_renta_diferido: 2_516_873.29,
          contribucion_especial: 621_771.19,
          total: 9_624_236.86
        },
        utilidad_por_distribuir: 6_188_126.75
      },

      {
        año: 2021,
        productos_de_operacion: {
          ventas_de_energia: 94_245_035.72,
          ventas_de_energia_entre_compañias_distribuidoras: 1_848_313.78,
          ingresos_por_uso_de_red: 32_294_800.14,
          ingresos_por_transacciones_en_el_MRS: 3_065_448.50,
          otros_productos_de_operacion: 5_998_567.06,
          total: 137_452_165.20
        },
        costos_de_energia: {
          compra_de_energia: 99_670_344.34,
          total: 99_670_344.34
        },
        margen_compra_venta_de_energia: {
          gastos_de_operacion_y_mantenimiento: 10_627_573.59,
          gastos_de_comercializacion: 5_383_963.52,
          gastos_por_cuenta_de_consumidores: 12_026.70,
          gastos_de_administracion: 4_178_597.53,
          gastos_por_depreciacion: 2_836_087.29,
          amortizacion_de_intangibles: 680_252.65,
          amortizacion_de_activos_por_derecho_de_uso: 469_690.49,
          costos_por_servicios_a_terceros: 858_824.22,
          gastos_de_periodos_anteriores: 171_921.71, // Este sale entre parentesis, puede ser negativo
          otros_gastos: 0.00,
          perdidas_por_retiro_de_activos_fijos: 73_015.92,
          total: 37_781_820.86   
        },
        costos_y_gastos_de_operacion: 24_948_110.20,
        utilidad_de_operacion: 12_833_710.66,
        gastos_financieros: {
          gastos_financieros: 1_297_683.30,
          total: 1_297_683.30
        },
        productos_financieros: {
          productos_financieros: 319_269.43,
          otros_ingresos_financieros: 840_374.76,
          total: 1_159_644.19
        },
        utilidad_antes_de_impuestos_y_reservas: {
          impuesto_sobre_la_renta: 15_618.00, // Este aparece en parentesis, puede ser negativo
          impuesto_sobre_la_renta_diferido: 5_024_406.17,
          total: 12_695_671.55
        },
        utilidad_por_distribuir: 7_686_883.38
      },
    ]

  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});
