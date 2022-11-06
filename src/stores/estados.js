import { defineStore } from "pinia";

export const useCounterStore = defineStore("estados", {
  state: () => ({
    balance_general: [
      {
        año: 2018,
        activo: {
          activo_corriente: new Map([
            ["Efectivo y Equivalentes de Efectivo", 9_289_384],
            ["Otros activos financieros", 994_838],
            ["Remanente de impuesto sobre la renta", 4_297_600],
            ["Deudores comerciales y otras cuentas por cobrar", 46_337_363],
            ["Inventarios", 1_466_168],
            ["Otros activos corrientes", 1_366_270],
          ]),
          activo_no_corriente: new Map([
            ["Otros activos financieros", 548_525],
            ["Deudores comerciales y otras cuentas por cobrar", 1_074_584],
            ["Propiedades, planta y equipo, neto", 128_224_630],
            ["Activos intangibles, netos", 7_956_803],
          ]),
        },
        pasivo: {
          pasivo_corriente: new Map([
            ["Créditos y préstamos", 8_889_131],
            ["Cuentas por pagar a proveedores de energía", 35_381_355],
            ["Acreedores y otras cuentas por pagar", 11_048_735],
            ["Pasivo por beneficios a empleados", 1_201_546],
            ["Impuestos contribuciones y tasas por pagar", 1_721_430],
            ["Provisiones", 674_460],
            ["Ingresos diferidos", 634_264],
          ]),
          pasivo_no_corriente: new Map([
            ["Créditos y préstamos", 47_310_156],
            ["Pasivo por beneficios a empleados", 6_117_518],
            ["Pasivo neto por impuesto diferido", 21_074_729],
            ["Ingresos diferidos", 3_458_524],
          ]),
        },
        patrimonio: new Map([
          [
            "sub_patrimonio_propietarios",
            new Map([
              ["Capital social", 12_281_064],
              ["Otros componentes del patrimonio", 19_216_550],
              ["Reserval legal", 7_089_744],
              ["Utilidades retenidas", 25_451_652],
            ]),
          ],
          ["Participaciones no controladoras", 5_307],
        ]),
      },
      {
        año: 2017,
        activo: {
          activo_corriente: new Map([
            ["Efectivo y Equivalentes de Efectivo", 8_948_061],
            ["Otros activos financieros", 23_253],
            ["Remanente de impuesto sobre la renta", 1_853_912],
            ["Deudores comerciales y otras cuentas por cobrar", 33_714_858],
            ["Inventarios", 1_314_793],
            ["Otros activos corrientes", 1_051_689],
          ]),
          activo_no_corriente: new Map([
            ["Otros activos financieros", 1_073_572],
            ["Deudores comerciales y otras cuentas por cobrar", 1_260_935],
            ["Propiedades, planta y equipo, neto", 113_009_434],
            ["Activos intangibles, netos", 6_535_971],
          ]),
        },
        pasivo: {
          pasivo_corriente: new Map([
            ["Créditos y préstamos", 5_141_142],
            ["Cuentas por pagar a proveedores de energía", 28_729_430],
            ["Acreedores y otras cuentas por pagar", 9_477_549],
            ["Pasivo por beneficios a empleados", 1_148_698],
            ["Impuestos contribuciones y tasas por pagar", 1_442_329],
            ["Provisiones", 908_535],
            ["Ingresos diferidos", 797_789],
          ]),
          pasivo_no_corriente: new Map([
            ["Créditos y préstamos", 51_286_193],
            ["Pasivo por beneficios a empleados", 5_374_564],
            ["Pasivo neto por impuesto diferido", 10_828_276],
            ["Ingresos diferidos", 3_505_911],
          ]),
        },
        patrimonio: new Map([
          [
            "sub_patrimonio_propietarios",
            new Map([
              ["Capital social", 12_281_064],
              ["Otros componentes del patrimonio", 8_584_526],
              ["Reserval legal", 7_089_744],
              ["Utilidades retenidas", 22_185_699],
            ]),
          ],
          ["Participaciones no controladoras", 5_029],
        ]),
      },
      {
        año: 2019,
        activo: {
          activo_corriente: new Map([
            ["Efectivo y Equivalentes de Efectivo", 13_205_317],
            ["Otros activos financieros", 2_922_373],
            ["Remanente de impuesto sobre la renta", 0],
            ["Deudores comerciales y otras cuentas por cobrar", 32_013_118],
            ["Inventarios", 1_088_376],
            ["Otros activos corrientes", 1_213_746],
          ]),
          activo_no_corriente: new Map([
            ["Otros activos financieros", 521_522],
            ["Deudores comerciales y otras cuentas por cobrar", 896_574],
            ["Propiedades, planta y equipo, neto", 100_912_427],
            ["Activos intangibles, netos", 6_616_539],
            ["Activos por derecho de uso, neto", 9_306_880],
          ]),
        },
        pasivo: {
          pasivo_corriente: new Map([
            ["Créditos y préstamos", 25_027_229],
            ["Cuentas por pagar a proveedores de energía", 27_773_091],
            ["Acreedores y otras cuentas por pagar", 10_894_962],
            ["Pasivo por arrendamientos", 738_487],
            ["Pasivo por beneficios a empleados", 1_257_170],
            ["Impuestos sobre la renta por pagar", 2_126_425],
            ["Impuestos contribuciones y tasas por pagar", 2_937_387],
            ["Provisiones", 630_524],
            ["Ingresos diferidos", 742_453],
          ]),
          pasivo_no_corriente: new Map([
            ["Créditos y préstamos", 22_375_000],
            ["Pasivo por arrendamientos", 8_826_795],
            ["Pasivo por beneficios a empleados", 6_656_392],
            ["Pasivo neto por impuesto diferido", 11_923_092],
            ["Ingresos diferidos", 3_360_330],
          ]),
        },
        patrimonio: new Map([
          [
            "sub_patrimonio_propietarios",
            new Map([
              ["Capital social", 12_281_064],
              ["Otros componentes del patrimonio", -1_128_876],
              ["Reserval legal", 7_089_744],
              ["Utilidades retenidas", 25_181_139],
            ]),
          ],
          ["Participaciones no controladoras", 4_464],
        ]),
      },
      {
        año: 2020,
        activo: {
          activo_corriente: new Map([
            ["Efectivo y Equivalentes de Efectivo", 9_181_401],
            ["Otros activos financieros", 3_955_536],
            ["Deudores comerciales y otras cuentas por cobrar", 30_997_828],
            ["Inventarios", 1_265_811],
            ["Otros activos corrientes", 949_510],
          ]),
          activo_no_corriente: new Map([
            ["Otros activos financieros", 504_988],
            ["Deudores comerciales y otras cuentas por cobrar", 1_552_153],
            ["Propiedades, planta y equipo, neto", 100_334_017],
            ["Activos intangibles, netos", 5_368_183],
            ["Activos por derecho de uso, neto", 8_285_345],
          ]),
        },
        pasivo: {
          pasivo_corriente: new Map([
            ["Créditos y préstamos", 26_778_634],
            ["Cuentas por pagar a proveedores de energía", 25_010_007],
            ["Acreedores y otras cuentas por pagar", 14_922_916],
            ["Pasivo por arrendamientos", 772_257],
            ["Pasivo por beneficios a empleados", 1_513_772],
            ["Impuestos sobre la renta por pagar", 1_384_611],
            ["Impuestos contribuciones y tasas por pagar", 2_621_443],
            ["Provisiones", 1_049_728],
            ["Ingresos diferidos", 1_175_790],
          ]),
          pasivo_no_corriente: new Map([
            ["Créditos y préstamos", 19_466_345],
            ["Pasivo por arrendamientos", 7_988_251],
            ["Pasivo por beneficios a empleados", 7_367_223],
            ["Pasivo neto por impuesto diferido", 10_403_684],
            ["Ingresos diferidos", 3_254_854],
          ]),
        },
        patrimonio: new Map([
          [
            "sub_patrimonio_propietarios",
            new Map([
              ["Capital social", 12_281_064],
              ["Otros componentes del patrimonio", -1_509_757],
              ["Reserval legal", 7_089_744],
              ["Utilidades retenidas", 20_820_338],
            ]),
          ],
          ["Participaciones no controladoras", 3_868],
        ]),
      },
      {
        año: 2021,
        activo: {
          activo_corriente: new Map([
            ["Efectivo y Equivalentes de Efectivo", 9_616_705],
            ["Otros activos financieros", 0],
            ["Remanente de impuesto sobre la renta", 5_194_673],
            ["Deudores comerciales y otras cuentas por cobrar", 55_604_524],
            ["Inventarios", 1_551_452],
            ["Otros activos corrientes", 2_429_750],
          ]),
          activo_no_corriente: new Map([
            ["Otros activos financieros", 533_019],
            ["Deudores comerciales y otras cuentas por cobrar", 733_188],
            ["Propiedades, planta y equipo, neto", 106_026_502],
            ["Activos intangibles, netos", 4_092_640],
            ["Activos por derecho de uso, neto", 7_795_140],
          ]),
        },
        pasivo: {
          pasivo_corriente: new Map([
            ["Créditos y préstamos", 5_917_095],
            ["Cuentas por pagar a proveedores de energía", 44_916_912],
            ["Acreedores y otras cuentas por pagar", 13_487_460],
            ["Pasivo por arrendamientos", 861_502],
            ["Pasivo por beneficios a empleados", 1_516_686],
            ["Impuestos sobre la renta por pagar", 0],
            ["Impuestos contribuciones y tasas por pagar", 2_115_814],
            ["Provisiones", 1_199_103],
            ["Ingresos diferidos", 1_136_250],
          ]),
          pasivo_no_corriente: new Map([
            ["Créditos y préstamos", 44_375_000],
            ["Pasivo por arrendamientos", 7_569_661],
            ["Pasivo por beneficios a empleados", 7_188_262],
            ["Pasivo neto por impuesto diferido", 17_841_332],
            ["Ingresos diferidos", 3_109_619],
          ]),
        },
        patrimonio: new Map([
          [
            "sub_patrimonio_propietarios",
            new Map([
              ["Capital social", 12_281_064],
              ["Otros componentes del patrimonio", -1_127_768],
              ["Reserval legal", 7_089_744],
              ["Utilidades retenidas", 24_095_661],
            ]),
          ],
          ["Participaciones no controladoras", 4_196],
        ]),
      },
    ],

    estado_resultados: [
      {
        año: 2017,
        sub_productos_de_operacion: new Map([
          ["Servicios por distribución de energía", 267_723_288],
          ["Venta de electrodomésticos y servicios", 1_214_964],
          ["Otros ingresos operacionales", 5_330_849],
        ]),
        sub_costos_y_gastos_de_operacion: new Map([
          ["Compra de energía", 205_979_798],
          ["Costo de venta y servicios", 1_482_763],
          ["Depreciación", 5_520_401],
          ["Amortizacion de Intangibles", 840_106],
          ["Gastos de personal", 12_691_289],
          ["Suministros y servicios contratados", 14_285_709],
          ["Materiales y repuestos utilizados", 1_795_544],
          ["Tasa municipal por uso de suelo por postes ", 6_475_430],

          ["Costos por instalación de servicios", 306_508],
          ["Publicidad institucional", 270_753],
          ["Estimación para cuentas de cobro dudoso", 389_561],
          ["Estimación de obsolescencia de inventario", 2_410],
          ["Otros gastos de operación", 5_260_649],
        ]),
        sub_ingresos_financieros: new Map([
          ["Ingresos financieros", 1_653_980],
        ]),
        sub_gastos_financieros: new Map([["Gastos Financieros", 3_454_780]]),
        sub_impuestos_y_reservas: new Map([
          ["Impuesto sobre la renta", 5_957_953],
          [
            "Contribución especial para el plan de seguridad ciudadana",
            332_743,
          ],
        ]),
        sub_resultados_integrales: new Map([
          ["Superávit por revaluación del año", 0],
          [
            "Pérdida actuarial en provisión de beneficios a empleados",
            -453_770,
          ],
          [
            "Impuesto sobre la renta diferido relativo a la pérdidas actuarial",
            136_132,
          ],
          ["Impuestos sobre la renta diferido relativo a revalúo", 161_544],
        ]),
        sub_utilidad_atribuible: new Map([
          ["Propietarios de la controladora", 10_875_596],
          ["Participación no controladora", 1_088],
        ]),
        sub_resultados_integrales_atribuible: new Map([
          ["Propietarios de la controladora", 10_749_502],
          ["Participación no controladora", 1_088],
        ]),
        sub_utilidades_por_accion: new Map([
          ["Utilidad por acción, compañía controladora", 3.54],
          ["Utilidad por acción, compañía subsidiaria", 0.05],
        ]),
      },
      {
        año: 2018,
        sub_ingresos: new Map([
          ["Servicios por distribución de energía", 293_151_437],
          ["Venta de electrodomésticos y servicios", 1_418_312],
          ["Otros ingresos operacionales", 5_700_550],
        ]),
        sub_costos_y_gastos_de_operacion: new Map([
          ["Compra de energía", 228_457_468],
          ["Costo de venta y servicios", 1_714_784],
          ["Depreciación", 5_816_353],
          ["Amortizacion de Intangibles", 1_171_975],
          ["Amortización de activos por derecho de uso", 0],
          ["Gastos de personal", 12_987_087],
          ["Suministros y servicios contratados", 13_841_125],
          ["Materiales y repuestos utilizados", 1_815_212],
          ["Tasa municipal por uso de suelo por postes ", 7_277_757],

          ["Costos por instalación de servicios", 264_656],
          ["Publicidad institucional", 301_983],
          ["Estimación para cuentas de cobro dudoso", 641_304],
          ["Estimación de obsolescencia de inventario", 3_928],
          ["Otros gastos de operación", 3_162_824],
        ]),
        sub_ingresos_financieros: new Map([
          ["Ingresos financieros", 1_289_522],
        ]),
        sub_gastos_financieros: new Map([["Gastos Financieros", 3_075_475]]),
        sub_impuestos_y_reservas: new Map([
          ["Impuesto sobre la renta", 7_214_813],
          [
            "Contribución especial para el plan de seguridad ciudadana",
            148_483,
          ],
        ]),
        sub_resultados_integrales: new Map([
          ["Superávit por revaluación del año", 16_146_436],
          [
            "Pérdida actuarial en provisión de beneficios a empleados",
            -651_961,
          ],
          [
            "Impuesto sobre la renta diferido relativo a la pérdidas actuarial",
            195_588,
          ],
          ["Impuestos sobre la renta diferido relativo a revalúo", -4_576_265],
        ]),
        sub_utilidad_atribuible: new Map([
          ["Propietarios de la controladora", 13_663_229],
          ["Participación no controladora", 1_366],
        ]),
        sub_resultados_integrales_atribuible: new Map([
          ["Propietarios de la controladora", 24_777_027],
          ["Participación no controladora", 1_366],
        ]),
        sub_utilidades_por_accion: new Map([
          ["Utilidad por acción, compañía controladora", 4.45],
          ["Utilidad por acción, compañía subsidiaria", 0.05],
        ]),
      },
      {
        año: 2019,
        sub_ingresos: new Map([
          ["Servicios por distribución de energía", 311_918_820],
          ["Venta de electrodomésticos y servicios", 1_345_084],
          ["Otros ingresos operacionales", 5_630_794],
        ]),
        sub_costos_y_gastos_de_operacion: new Map([
          ["Compra de energía", 246_139 - 559],
          ["Costo de venta y servicios", 1_555_064],
          ["Depreciación", 5_611_786],
          ["Amortizacion de Intangibles", 1_458_590],
          ["Amortización de activos por derecho de uso", 935_352],
          ["Gastos de personal", 13_924_120],
          ["Suministros y servicios contratados", 12_649_329],
          ["Materiales y repuestos utilizados", 1_776_427],
          ["Tasa municipal por uso de suelo por postes ", 7_697_640],

          ["Costos por instalación de servicios", 292_221],
          ["Publicidad institucional", 291_031],
          ["Estimación para cuentas de cobro dudoso", 240_221],
          ["Estimación de obsolescencia de inventario", 346],
          ["Otros gastos de operación", 2_995_349],
        ]),
        sub_ingresos_financieros: new Map([
          ["Ingresos financieros", 1_554_337],
        ]),
        sub_gastos_financieros: new Map([["Gastos Financieros", 3_645_099]]),
        sub_impuestos_y_reservas: new Map([
          ["Impuesto sobre la renta", 6_773_070],
          [
            "Contribución especial para el plan de seguridad ciudadana",
            978_841,
          ],
        ]),
        sub_resultados_integrales: new Map([
          ["Superávit por revaluación del año", 0],
          [
            "Pérdida actuarial en provisión de beneficios a empleados",
            -506_950,
          ],
          [
            "Impuesto sobre la renta diferido relativo a la pérdidas actuarial",
            152_085,
          ],
          ["Impuestos sobre la renta diferido relativo a revalúo", 0],
        ]),
        sub_utilidad_atribuible: new Map([
          ["Propietarios de la controladora", 13_663_229],
          ["Participación no controladora", 1_366],
        ]),
        sub_utilidades_por_accion: new Map([
          ["Utilidad por acción, compañía controladora", 4],
          ["Utilidad por acción, compañía subsidiaria", 0],
        ]),
      },
      {
        año: 2020,
        sub_ingresos: new Map([
          ["Servicios por distribución de energía", 243_313_459],
          ["Venta de electrodomésticos y servicios", 1_144_251],
          ["Otros ingresos operacionales", 5_395_169],
        ]),
        sub_costos_y_gastos_de_operacion: new Map([
          ["Compra de energía", 182_930_240],
          ["Costo de venta y servicios", 1_585_510],
          ["Depreciación", 5_662_555],
          ["Amortizacion de Intangibles", 1_431_209],
          ["Amortización de activos por derecho de uso", 957_622],
          ["Gastos de personal", 14_156_945],
          ["Suministros y servicios contratados", 13_803_323],
          ["Materiales y repuestos utilizados", 1_802_981],
          ["Tasa municipal por uso de suelo por postes ", 7_987_304],

          ["Costos por instalación de servicios", 341_416],
          ["Publicidad institucional", 205_525],
          ["Estimación para cuentas de cobro dudoso", 1_146_678],
          ["Estimación de obsolescencia de inventario", 6_146],
          ["Otros gastos de operación", 2_867_819],
        ]),
        sub_ingresos_financieros: new Map([
          ["Ingresos financieros", 1_917_391],
        ]),
        sub_gastos_financieros: new Map([["Gastos Financieros", 2_799_312]]),
        sub_impuestos_y_reservas: new Map([
          ["Impuesto sobre la renta", 4_466_120],
          [
            "Contribución especial para el plan de seguridad ciudadana",
            591_060,
          ],
        ]),
        sub_resultados_integrales: new Map([
          ["Superávit por revaluación del año", 0],
          [
            "Pérdida actuarial en provisión de beneficios a empleados",
            -544_116,
          ],
          [
            "Impuesto sobre la renta diferido relativo a la pérdidas actuarial",
            163_235,
          ],
          ["Impuestos sobre la renta diferido relativo a revalúo", 0],
        ]),
        sub_utilidad_atribuible: new Map([
          ["Propietarios de la controladora", 9_027_602],
          ["Participación no controladora", 903],
        ]),
        sub_utilidades_por_accion: new Map([
          ["Utilidad por acción, compañía controladora", 3],
          ["Utilidad por acción, compañía subsidiaria", 0],
        ]),
      },
      {
        año: 2021,
        sub_ingresos: new Map([
          ["Servicios por distribución de energía", 291_600_627],
          ["Venta de electrodomésticos y servicios", 1_477_755],
          ["Otros ingresos operacionales", 6_327_787],
        ]),
        sub_costos_y_gastos_de_operacion: new Map([
          ["Compra de energía", 222_581_074],
          ["Costo de venta y servicios", 1_681_164],
          ["Depreciación", 5_714_141],
          ["Amortizacion de Intangibles", 1_293_093],
          ["Amortización de activos por derecho de uso", 945_664],
          ["Gastos de personal", 15_146_936],
          ["Suministros y servicios contratados", 15_791_278],
          ["Materiales y repuestos utilizados", 2_308_778],
          ["Tasa municipal por uso de suelo por postes ", 8_130_309],

          ["Costos por instalación de servicios", 429_200],
          ["Publicidad institucional", 274_847],
          ["Estimación para cuentas de cobro dudoso", -567, 144],
          ["Estimación de obsolescencia de inventario", 345_473],
          ["Otros gastos de operación", 4_149_341],
        ]),
        sub_ingresos_financieros: new Map([
          ["Ingresos financieros", 2_242_238],
        ]),
        sub_gastos_financieros: new Map([["Gastos Financieros", 2_633_937]]),
        sub_impuestos_y_reservas: new Map([
          ["Impuesto sobre la renta", 7_449_895],
          ["Contribución especial para el plan de seguridad ciudadana", 0],
        ]),
        sub_resultados_integrales: new Map([
          ["Superávit por revaluación del año", 0],
          ["Pérdida actuarial en provisión de beneficios a empleados", 545_699],
          [
            "Impuesto sobre la renta diferido relativo a la pérdidas actuarial",
            -163_710,
          ],
          ["Impuestos sobre la renta diferido relativo a revalúo", 0],
        ]),
        sub_utilidad_atribuible: new Map([
          ["Propietarios de la controladora", 13_339_087],
          ["Participación no controladora", 1_334],
        ]),
        sub_utilidades_por_accion: new Map([
          ["Utilidad por acción, compañía controladora", 4],
          ["Utilidad por acción, compañía subsidiaria", 0],
        ]),
      },
    ],
  }),
  getters: {
    getBalances: (state) => state.balance_general,

    getBalanceGeneralByYear: (state) => {
      return (year) =>
        state.balance_general.find((balance) => balance.año === year);
    },
    getEstados: (state) => state.estado_resultados,

    getEstadoByYear: (state) => {
      return (year) =>
        state.estado_resultados.find((estado) => estado.año === year);
    },
  },
  actions: {
    updateEstado(estado, cuenta, newAmount) {
      if (estado.sub_productos_de_operacion.has(cuenta)) {
        estado.sub_productos_de_operacion.set(cuenta, newAmount);
      } else if (estado.sub_costos_de_energia.has(cuenta)) {
        estado.sub_costos_de_energia.set(cuenta, newAmount);
      } else if (estado.sub_costos_y_gastos_de_operacion.has(cuenta)) {
        estado.sub_costos_y_gastos_de_operacion.set(cuenta, newAmount);
      } else if (estado.sub_gastos_financieros.has(cuenta)) {
        estado.sub_gastos_financieros.set(cuenta, newAmount);
      } else if (estado.sub_productos_financieros.has(cuenta)) {
        estado.sub_productos_financieros.set(cuenta, newAmount);
      } else if (estado.sub_impuestos_y_reservas.has(cuenta)) {
        estado.sub_impuestos_y_reservas.set(cuenta, newAmount);
      }
    },
    updateBalance(balance, cuenta, newAmount) {
      // revisanddo en los activos
      for (const [typeCuenta, value] of Object.entries(balance.activo)) {
        if (value.has(cuenta)) {
          value.set(cuenta, newAmount);
        }
      }

      // revisando en los pasivos
      for (const [typeCuenta, value] of Object.entries(balance.pasivo)) {
        if (value.has(cuenta)) {
          value.set(cuenta, newAmount);
        }
      }

      // revisando en el patrimonio
      for (const [typeCuenta, value] of balance.patrimonio) {
        if (typeCuenta === "sub_capital_social") {
          for (const [subCuenta, valueSubCuenta] of value) {
            if (subCuenta === cuenta) {
              value.set(cuenta, newAmount);
            }
          }
        } else {
          balance.patrimonio.set(cuenta, newAmount);
        }
      }
    },
  },
});
