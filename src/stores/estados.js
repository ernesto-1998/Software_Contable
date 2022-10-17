import { defineStore } from 'pinia';

export const useCounterStore = defineStore('estados', {
  state: () => ({
    balance_general: [
      { 
        año: 2018,
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
