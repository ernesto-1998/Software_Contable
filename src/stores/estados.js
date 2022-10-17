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
    estado_de_resultados: [

      {
        año: 2018, // Al 30 de Septiembre
        ingresos: {
          ingresos_ordinarios: 220_896_146,
          otros_ingresos: 604_418,
        },
        costo_de_ventas: 167_159_449,
        resultado_bruto: 54_341_115,
        gastos_de_operacion: {
          gastos_de_distribucion: 12_109_269,
          gastos_de_administracion: 9_134_995,
          gastos_de_personal: 9_689_144,
          gastos_de_depreciacion_y_amortizacion: 5_204_305
        },
        resultado_de_operacion: 18_203_402,
        ingresos_financieros: 922_525,
        gastos_financieros: 2_327_410,
        resultado_antes_de_reserva_de_impuestos: 16_798_517,
        impuestos: 5_585_124,
        resultado_del_periodo: 11_213_394
      },

      {
        año: 2019, // Al 30 de septiembre
        ingresos: {
          ingresos_ordinarios: 242_162_601,
          otros_ingresos: 764_393,
        },
        costo_de_ventas: 187_972_173,
        resultado_bruto: 54_954_822,
        gastos_de_operacion: {
          gastos_de_distribucion: 11_389_391,
          gastos_de_administracion: 8_947_669,
          gastos_de_personal: 9_968_564,
          gastos_de_depreciacion_y_amortizacion: 7_667_958
        },
        resultado_de_operacion: 16_981_241,
        ingresos_financieros: 1_176_543,
        gastos_financieros: 2_858_676,
        resultado_antes_de_reserva_de_impuestos: 15_299_108,
        impuestos: 5_927_901,
        resultado_del_periodo: 9_371_208
      },

      {
        año: 2020, // Al 30 de septiembre
        ingresos: {
          ingresos_ordinarios: 187_718_463,
          otros_ingresos: 763_536,
        },
        costo_de_ventas: 137_620_548,
        resultado_bruto: 50_861_451,
        gastos_de_operacion: {
          gastos_de_distribucion: 11_368_854,
          gastos_de_administracion: 9_189_478,
          gastos_de_personal: 10_083_967,
          gastos_de_depreciacion_y_amortizacion: 6_026_306
        },
        resultado_de_operacion: 14_192_847,
        ingresos_financieros: 618_572,
        gastos_financieros: 2_197_173,
        resultado_antes_de_reserva_de_impuestos: 12_614_246,
        impuestos: 4_396_720,
        resultado_del_periodo: 8_217_526
      },

      {
        año: 2021, // Al 30 de septiembre
        ingresos: {
          ingresos_ordinarios: 217_681_180,
          otros_ingresos: 1_139_926,
        },
        costo_de_ventas: 160_672_489,
        resultado_bruto: 58_148_617,
        gastos_de_operacion: {
          gastos_de_distribucion: 12_915_911,
          gastos_de_administracion: 9_222_885,
          gastos_de_personal: 10_586_765,
          gastos_de_depreciacion_y_amortizacion: 5_967_108
        },
        resultado_de_operacion: 19_455_950,
        ingresos_financieros: 410_757,
        gastos_financieros: 1_994_154,
        resultado_antes_de_reserva_de_impuestos: 17_872_552,
        impuestos: 5_740_757,
        resultado_del_periodo: 12_131_796
      },

      {
        año: 2022, // Al 30 de junio
        ingresos: {
          ingresos_ordinarios: 171_276_755,
          otros_ingresos: 3_546_119,
        },
        costo_de_ventas: 135_871_008,
        resultado_bruto: 38_951_866,
        gastos_de_operacion: {
          gastos_de_distribucion: 9_130_295,
          gastos_de_administracion: 7_660_457,
          gastos_de_personal: 8_038_057,
          gastos_de_depreciacion_y_amortizacion: 3_927_152
        },
        resultado_de_operacion: 10_195_904,
        ingresos_financieros: 1_736_878,
        gastos_financieros: 1_734_784,
        resultado_antes_de_reserva_de_impuestos: 10_197_997,
        impuestos: 2_919_569,
        resultado_del_periodo: 7_278_428
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
