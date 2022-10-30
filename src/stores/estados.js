import { defineStore } from "pinia";

export const useCounterStore = defineStore("estados", {
  state: () => ({
    balance_general: [
      {
        año: 2018,
        activo: {
          activo_corriente: new Map([
            ["Efectivo y Equivalentes de Efectivo", 4_470_832.55],
            ["Efectivo Restringido", 0.0],
            ["Inversión temporales mantenidas al vencimiento", 24_138.41],
            ["Cuentas por Cobrar", 31_550_392.24],
            ["Cuentas por Cobrar Activo Regulatorio", 9_081_404.81],
            ["Estimación para Cuentas Incobrables", -948_023.17],
            ["Cuentas por Cobrar a partes relacionadas", 494_196.63],
            ["Inventarios", 4_477_143.75],
            ["Gastos Pagados por Anticipado", 1_147_360.85],
            ["Otros Activos", 3_441_313.32],
          ]),
          activo_no_corriente: new Map([
            ["Inversión en Acciones Compañías Subsidiarias", 359_999.0],
            ["Inversión mantenidas al vencimiento", 556_263.51],
            ["Préstamos por cobrar Largo Plazo", 759_967.55],
            ["Préstamos por Cobrar a partes relacionadas", 621_977.3],
            ["Materiales y equipos para Propiedad, Planta y Equipo", 0.0],
            ["Propiedad, Planta y Equipo", 147_758_206.28],
            [
              "Depreciación Acumulada de Propiedad, Planta y Equipo",
              -53_942_753.0,
            ],
            ["Revaluación de Propiedad, Planta y Equipo", 16_159_669.02],
            ["Depreciación Acumulada de Revaluación PP&E", -4_751_111.55],
            ["Obras en Proceso", 3_900_433.82],
            ["Bienes Intangibles", 13_817_347.96],
            ["Amortización de Intangibles", -7_687_700.69],
            ["Activo por impuesto sobre la renta diferido", 2_613_177.91],
            ["Activos por diferidos a largo plazo", 0.0],
          ]),
        },
        pasivo: {
          pasivo_corriente: new Map([
            ["Sobregiros bancarios contables", 1_690_394.88],
            ["Prestamos Bancarios por Pagar a Corto Plazo", 4_000_000.0],
            ["Títulos emitidos por Pagar a Corto Plazo", 0.0],
            ["Proveedores de Energía Eléctrica", 33_295_974.67],
            ["Cuentas por Pagar Regulatorias", 0.0],
            ["Cuentas por pagar a partes relacionadas", 360_060.93],
            ["Cuentas por Pagar Comerciales", 1_210_053.85],
            ["Otras cuentas por pagar y Gastos acumulados", 5_385_495.15],
            ["Impuestos por Pagar", 1_337_256.03],
            ["Dividendos por pagar", 255_773.2],
            ["Depósitos de Consumidores", 3_692_764.18],
            ["Ingreso Diferido a corto plazo", 794_181.49],
            ["Otros Créditos Diferidos", 128_982.96],
          ]),
          pasivo_no_corriente: new Map([
            ["Prestamos a Largo Plazo", 49_300_939.54],
            ["Cuentas por pagar Accionistas", 41_569.27],
            ["Pasivo por Impuesto sobre la Renta Diferido", 16_497_629.21],
            ["Ingreso Diferido a largo plazo", 3_514_985.19],
            ["Provisión para Obligaciones Laborales", 5_618_421.49],
          ]),
        },
        patrimonio: new Map([
          [
            "sub_capital_social",
            new Map([
              ["Capital social mínimo", 9_000_000.0],
              ["Capital social variable", 3_282_292.0],
            ]),
          ],
          ["Superávit por Revaluación de Activos", 8_731_073.79],
          ["Superávit Realizado", 11_394_056.55],
          ["Ganancias Pérdidas actuariales", -317_639.01],
          ["Reserva Legal", 7_018_452.57],
          ["Utilidades por Aplicar de ejercicios anteriores", 0.0],
          ["Utilidad del Ejercicio Corriente", 7_671_518.56],
        ]),
      },
      {
        año: 2019,
        activo: {
          activo_corriente: new Map([
            ["Efectivo y Equivalentes de Efectivo", 13_367_161.55],
            ["Efectivo Restringido", 0.0],
            ["Inversión temporales mantenidas al vencimiento", 1_813_928.42],
            ["Cuentas por Cobrar", 35_148_511.46],
            ["Cuentas por Cobrar Activo Regulatorio", 12_551_277.73],
            ["Estimación para Cuentas Incobrables", -1_074_900.09],
            ["Cuentas por Cobrar a partes relacionadas", 491_614.7],
            ["Inventarios", 4_400_096.5],
            ["Gastos Pagados por Anticipado", 1_287_273.2],
            ["Otros Activos", 6_865_011.95],
          ]),
          activo_no_corriente: new Map([
            ["Inversión en Acciones Compañías Subsidiarias", 359_999.0],
            ["Inversión mantenidas al vencimiento", 530_342.03],
            ["Préstamos por cobrar Largo Plazo", 661_833.26],
            ["Préstamos por Cobrar a partes relacionadas", 421_977.3],
            ["Materiales y equipos para Propiedad, Planta y Equipo", 0.0],
            ["Activos por Derecho de Uso", 10_112_955.99],
            ["Amortización de activos por Derechos de uso", -444_754.36],
            ["Propiedad, Planta y Equipo", 152_421_584.64],
            [
              "Depreciación Acumulada de Propiedad, Planta y Equipo",
              -58_496_635.84,
            ],
            ["Revaluación de Propiedad, Planta y Equipo", 31_962_061.24],
            ["Depreciación Acumulada de Revaluación PP&E", -5_882_759.32],
            ["Obras en Proceso", 2_358_136.22],
            ["Bienes Intangibles", 16_313_428.56],
            ["Amortización de Intangibles", -8_997_330.14],
            ["Activo por impuesto sobre la renta diferido", 2_789_039.86],
            ["Activos diferidos a largo plazo", 0.0],
          ]),
        },
        pasivo: {
          pasivo_corriente: new Map([
            ["Sobregiros bancarios contables", 471_872.37],
            ["Prestamos Bancarios por Pagar a Corto Plazo", 4_000_000.0],
            ["Financiamiento por Operaciones de Reporto", 0.0],
            ["Proveedores de Energía Eléctrica", 36_642_624.53],
            ["Cuentas por Pagar Regulatorias", 0.0],
            ["Cuentas por pagar a partes relacionadas", 303_501.68],
            ["Cuentas por Pagar Comerciales", 2_253_003.53],
            ["Otras cuentas por pagar y Gastos acumulados", 5_281_615.9],
            ["Pasivo por Arrendamientos", 696_272.24],
            ["Impuestos por Pagar", 4_689_258.29],
            ["Dividendos por pagar", 14_021_218.77],
            ["Depósitos de Consumidores", 4_025_589.53],
            ["Ingreso Diferido a corto plazo", 792_093.79],
            ["Otros Créditos Diferidos", 133_147.92],
          ]),
          pasivo_no_corriente: new Map([
            ["Prestamos a Largo Plazo", 45_323_888.56],
            ["Cuentas por pagar Accionistas", 39_170.41],
            ["Pasivo por Impuesto sobre la Renta Diferido", 24_196_350.4],
            ["Ingreso Diferido a largo plazo", 3_436_736.61],
            ["Pasivo por Arrendamientos", 9_101_784.22],
            ["Provisión para Obligaciones Laborales", 6_214_579.62],
          ]),
        },
        patrimonio: new Map([
          [
            "sub_capital_social",
            new Map([
              ["Capital social mínimo", 9_000_000.0],
              ["Capital social variable", 3_282_292.0],
            ]),
          ],
          ["Superávit por Revaluación de Activos", 19_123_878.37],
          ["Superávit Realizado", 12_869_754.42],
          ["Ganancias Pérdidas actuariales", -774_012.18],
          ["Reserva Legal", 7_018_452.57],
          ["Utilidades por Aplicar de ejercicios anteriores", 0.0],
          ["Utilidad del Ejercicio Corriente", 6_816_780.31],
        ]),
      },
      {
        año: 2020,
        activo: {
          activo_corriente: new Map([
            ["Efectivo y Equivalentes de Efectivo", 20_713_267.86],
            ["Efectivo Restringido", 0.0],
            ["Inversión temporales mantenidas al vencimiento", 3_010_091.78],
            ["Cuentas por Cobrar", 40_630_866.53],
            ["Cuentas por Cobrar Activo Regulatorio", 0.0],
            ["Estimación para Cuentas Incobrables", -1_630_211.21],
            ["Cuentas por Cobrar a partes relacionadas", 668_931.69],
            ["Inventarios", 4_165_457.07],
            ["Gastos Pagados por Anticipado", 1_330_297.06],
            ["Otros Activos", 2_955_238.06],
          ]),
          activo_no_corriente: new Map([
            ["Inversión en Acciones Compañías Subsidiarias", 359_999.0],
            ["Inversión mantenidas al vencimiento", 502_231.58],
            ["Préstamos por cobrar Largo Plazo", 567_705.34],
            ["Préstamos por Cobrar a partes relacionadas", 221_977.3],
            ["Materiales y equipos para Propiedad, Planta y Equipo", 0.0],
            ["Activos por Derecho de Uso", 10_227_279.41],
            ["Amortización de activos por Derechos de uso", -1_393_832.7],
            ["Propiedad, Planta y Equipo", 157_137_601.79],
            [
              "Depreciación Acumulada de Propiedad, Planta y Equipo",
              -63_286_705.14,
            ],
            ["Obras en Proceso", 3_063_825.56],
            ["Bienes Intangibles", 16_449_260.12],
            ["Amortización de Intangibles", -10_442_854.51],
            ["Activo por impuesto sobre la renta diferido", 3_013_063.36],
            ["Activos diferidos a largo plazo", 0.0],
          ]),
        },
        pasivo: {
          pasivo_corriente: new Map([
            ["Sobregiros bancarios contables", 0.0],
            ["Prestamos Bancarios por Pagar a Corto Plazo", 4_000_000.0],
            ["Títulos de Emisión Propia", 21_000_000.0],
            ["Proveedores de Energía Eléctrica", 30_824_311.64],
            ["Cuentas por Pagar Regulatorias", 8_255_561.05],
            ["Cuentas por pagar a partes relacionadas", 333_313.32],
            ["Cuentas por Pagar Comerciales", 1_252_540.35],
            ["Otras cuentas por pagar y Gastos acumulados", 5_432_969.5],
            ["Pasivo por Arrendamientos", 763_898.48],
            ["Impuestos por Pagar", 10_076_208.7],
            ["Dividendos por pagar", 13_703_042.71],
            ["Depósitos de Consumidores", 4_360_340.24],
            ["Ingreso Diferido a corto plazo", 774_071.1],
            ["Otros Créditos Diferidos", 210_768.88],
          ]),
          pasivo_no_corriente: new Map([
            ["Prestamos a Largo Plazo", 20_375_000.0],
            ["Cuentas por pagar Accionistas", 38_047.9],
            ["Pasivo por Impuesto sobre la Renta Diferido", 12_634_291.44],
            ["Ingreso Diferido a largo plazo", 3_303_116.94],
            ["Pasivo por Arrendamientos", 8_444_772.43],
            ["Provisión para Obligaciones Laborales", 6_501_661.88],
          ]),
        },
        patrimonio: new Map([
          [
            "sub_capital_social",
            new Map([
              ["Capital social mínimo", 9_000_000.0],
              ["Capital social variable", 3_282_292.0],
            ]),
          ],
          ["Superávit por Revaluación de Activos", 0.0],
          ["Superávit Realizado", 0.0],
          ["Ganancias Pérdidas actuariales", -1_128_877.37],
          ["Reserva Legal", 7_018_452.57],
          ["Utilidades por Aplicar de ejercicios anteriores", 11_619_579.44],
          ["Utilidad del Ejercicio Corriente", 6_188_126.75],
        ]),
      },
      {
        año: 2021,
        activo: {
          activo_corriente: new Map([
            ["Efectivo y Equivalentes de Efectivo", 5_167_392.39],
            ["Inversión temporales mantenidas al vencimiento", 1_997_673.96],
            ["Cuentas por Cobrar", 37_916_298.74],
            ["Cuentas por Cobrar Activo Regulatorio", 9_902_212.8],
            ["Estimación para Cuentas Incobrables", -1_677_188.82],
            ["Cuentas por Cobrar a partes relacionadas", 366_072.67],
            ["Inventarios", 4_454_772.4],
            ["Gastos Pagados por Anticipado", 837_320.18],
            ["Otros Activos", 3_149_300.48],
          ]),
          activo_no_corriente: new Map([
            ["Inversión en Acciones Compañías Subsidiarias", 359_999.0],
            ["Inversión mantenidas al vencimiento", 528_005.84],
            ["Préstamos por cobrar Largo Plazo", 447_452.71],
            ["Préstamos por Cobrar a partes relacionadas", 321_977.3],
            ["Materiales y equipos para Propiedad, Planta y Equipo", 0.0],
            ["Activos por Derecho de Uso", 10_112_247.68],
            ["Amortización de activos por Derechos de uso", -2_302_904.71],
            ["Propiedad, Planta y Equipo", 160_529_957.6],
            [
              "Depreciación Acumulada de Propiedad, Planta y Equipo",
              -67_527_269.11,
            ],
            ["Obras en Proceso", 5_024_611.06],
            ["Bienes Intangibles", 16_456_920.89],
            ["Amortización de Intangibles", -11_753_236.32],
            ["Activo por impuesto sobre la renta diferido", 3_803_098.45],
          ]),
        },
        pasivo: {
          pasivo_corriente: new Map([
            ["Sobregiros bancarios contables", 255_550.06],
            ["Prestamos Bancarios por Pagar a Corto Plazo", 5_455_126.96],
            ["Proveedores de Energía Eléctrica", 34_205_508.13],
            ["Cuentas por Pagar Regulatorias", 0.0],
            ["Cuentas por pagar a partes relacionadas", 343_319.19],
            ["Cuentas por Pagar Comerciales", 1_927_464.4],
            ["Otras cuentas por pagar y Gastos acumulados", 4_937_343.27],
            ["Pasivo por Arrendamientos", 792_106.42],
            ["Impuestos por Pagar", 1_557_051.6],
            ["Dividendos por pagar", 785_511.32],
            ["Depósitos de Consumidores", 4_874_443.88],
            ["Ingreso Diferido a corto plazo", 1_213_096.66],
            ["Otros Créditos Diferidos", 111_728.28],
          ]),
          pasivo_no_corriente: new Map([
            ["Prestamos a Largo Plazo", 46_738_781.98],
            ["Cuentas por pagar Accionistas", 28_835.49],
            ["Pasivo por Impuesto sobre la Renta Diferido", 19_452_411.52],
            ["Ingreso Diferido a largo plazo", 3_181_031.7],
            ["Pasivo por Arrendamientos", 7_583_121.45],
            ["Provisión para Obligaciones Laborales", 7_574_834.18],
          ]),
        },
        patrimonio: new Map([
          [
            "sub_capital_social",
            new Map([
              ["Capital social mínimo", 9_000_000.0],
              ["Capital social variable", 3_282_292.0],
            ]),
          ],
          ["Ganancias Pérdidas actuariales", -1_509_758.69],
          ["Reserva Legal", 7_018_452.57],
          ["Utilidades por Aplicar de ejercicios anteriores", 11_619_579.44],
          ["Utilidad del Ejercicio Corriente", 7_686_883.38],
        ]),
      },
      {
        año: 2022,
        activo: {
          activo_corriente: new Map([
            ["Efectivo y Equivalentes de Efectivo", 15_892_989.13],
            ["Inversión temporales mantenidas al vencimiento", 101_693.62],
            ["Cuentas por Cobrar", 39_501_713.56],
            ["Cuentas por Cobrar Activo Regulatorio", 14_499_331.86],
            ["Estimación para Cuentas Incobrables", -1_345_212.03],
            ["Cuentas por Cobrar a partes relacionadas", 688_336.01],
            ["Inventarios", 7_819_095.07],
            ["Gastos Pagados por Anticipado", 1_059_054.75],
            ["Otros Activos", 7_997_669.64],
          ]),
          activo_no_corriente: new Map([
            ["Inversión en Acciones Compañías Subsidiarias", 359_999.0],
            ["Inversión mantenidas al vencimiento", 528_005.84],
            ["Préstamos por cobrar Largo Plazo", 319_711.12],
            ["Préstamos por Cobrar a partes relacionadas", 221_977.3],
            ["Activos por Derecho de Uso", 10_488_677.06],
            ["Amortización de activos por Derechos de uso", -3_252_195.78],
            ["Propiedad, Planta y Equipo", 163_920_692.36],
            [
              "Depreciación Acumulada de Propiedad, Planta y Equipo",
              -72_112_797.97,
            ],
            ["Obras en Proceso", 12_144_510.56],
            ["Bienes Intangibles", 16_264_036.05],
            ["Amortización de Intangibles", -12_317_611.14],
          ]),
        },
        pasivo: {
          pasivo_corriente: new Map([
            ["Prestamos Bancarios por Pagar a Corto Plazo", 10_364_379.72],
            ["Proveedores de Energía Eléctrica", 41_694_766.79],
            ["Cuentas por pagar a partes relacionadas", 173_491.55],
            ["Cuentas por Pagar Comerciales", 3_448_228.65],
            ["Otras cuentas por pagar y Gastos acumulados", 6_555_637.33],
            ["Pasivo por Arrendamientos", 824_954.88],
            ["Impuestos por Pagar", 4_557_543.15],
            ["Dividendos por pagar", 13_393_227.33],
            ["Depósitos de Consumidores", 5_306_921.36],
            ["Ingreso Diferido a corto plazo", 1_414_290.78],
            ["Otros Créditos Diferidos", 126_313.24],
          ]),
          pasivo_no_corriente: new Map([
            ["Prestamos a Largo Plazo", 42_375_000],
            ["Cuentas por pagar Accionistas", 41_700.45],
            ["Pasivo por Impuesto sobre la Renta Diferido", 18_198_283.88],
            ["Ingreso Diferido a largo plazo", 3_041_519.66],
            ["Pasivo por Arrendamientos", 7_121_735.35],
            ["Provisión para Obligaciones Laborales", 7_070_699.58],
          ]),
        },
        patrimonio: new Map([
          [
            "sub_capital_social",
            new Map([
              ["Capital social mínimo", 9_000_000.0],
              ["Capital social variable", 3_282_292.0],
            ]),
          ],
          ["Ganancias Pérdidas actuariales", -1_127_769.52],
          ["Reserva Legal", 7_018_452.57],
          ["Utilidades por Aplicar de ejercicios anteriores", 11_619_579.44],
          ["Utilidad del Ejercicio Corriente", 7_278_427.82],
        ]),
      },
    ],

    estado_resultados: [
      {
        año: 2018,
        sub_productos_de_operacion: new Map([
          ["Ventas de energia", 102_704_499.4],
          ["Ventas de energia entre compañias distribuidoras", 1_914_807.92],
          ["Ingresos por uso de red", 28_877_072.46],
          ["Ingresos por transacciones en el MRS", 5_705_568.58],
          ["Otros Productos de Operacion", 5_464_267.36],
        ]),
        sub_costos_de_energia: new Map([["Compra de energia", 108_739_922.53]]),
        sub_costos_y_gastos_de_operacion: new Map([
          ["Gastos de Operacion y Mantenimiento", 9_531_724.8],
          ["Gastos de Comercializacion", 3_953_024.38],
          ["Gastos por cuenta de Consumidores", 785_642.01],
          ["Gastos de Administracion", 4_013_427.33],
          ["Gastos por Depreciacion", 2_881_276.81],
          ["Amortizacion de Intangibles", 574_392.68],
          ["Costos por Servicios a Terceros", 1_009_839.46],
          ["Gastos de Periodos Anteriores", 459_198.0],
          ["Otros Gastos", 0.0],
          ["Pérdidas por retiro de activos fijos", 133_155.08],
        ]),
        sub_gastos_financieros: new Map([["Gastos Financieros", 1_524_546.78]]),
        sub_productos_financieros: new Map([
          ["Productos Financieros", 229_386.04],
          ["Otros Ingresos Financieros", 390_893.44],
        ]),
        sub_impuestos_y_reservas: new Map([
          ["Impuesto Sobre la Renta", 954_789.67],
          ["Impuesto Sobre la Renta Diferido", 2_934_669.1],
          ["Contribucion especial (CESC)", 119_368.01],
        ]),
      },

      {
        año: 2019,
        sub_productos_de_operacion: new Map([
          ["Ventas de energia", 118_710_848.1],
          ["Ventas de energia entre compañias distribuidoras", 2_010_332.85],
          ["Ingresos por uso de red", 30_371_219.9],
          ["Ingresos por transacciones en el MRS", 5_804_280.87],
          ["Otros Productos de Operacion", 5_497_749.86],
        ]),
        sub_costos_de_energia: new Map([["Compra de energia", 125_321_771.49]]),
        sub_costos_y_gastos_de_operacion: new Map([
          ["Gastos de Operacion y Mantenimiento", 9_546_247.84],
          ["Gastos de Comercializacion", 4_820_691.17],
          ["Gastos por Cuenta de Consumidores", 80.13],
          ["Gastos de Administracion", 4_144_539.29],
          ["Gastos por Depreciacion", 3_948_588.54],
          ["Amortizacion de Intangibles", 729_609.51],
          ["Amortizacion de Activos por Derecho de uso", 465_754.08],
          ["Costos por Servicios a Terceros", 688_761.94],
          ["Gastos de Periodos Anteriores", 321_996.49],
          ["Otros Gastos", 0.0],
          ["Pérdidas por retiro de activos fijos", 207_176.59],
        ]),
        sub_gastos_financieros: new Map([["Gastos Financieros", 1_905_968.38]]),
        sub_productos_financieros: new Map([
          ["Productos Financieros", 244_902.06],
          ["Otros Ingresos Financieros", 515_999.82],
        ]),
        sub_impuestos_y_reservas: new Map([
          ["Impuesto Sobre la Renta", 3_348_719.43],
          ["Impuesto Sobre la Renta Diferido", 491_362.05],
          ["Contribucion especial (CESC)", 397_286.22],
        ]),
      },

      {
        año: 2020,
        sub_productos_de_operacion: new Map([
          ["Ventas de energia", 88_733_342.81],
          ["Ventas de energia entre compañias distribuidoras", 1_492_441.82],
          ["Ingresos por uso de red", 30_070_472.23],
          ["Ingresos por transacciones en el MRS", 4_805_440.58],
          ["Otros Productos de Operacion", 5_389_696.72],
        ]),
        sub_costos_de_energia: new Map([["Compra de energia", 96_738_227.56]]),
        sub_costos_y_gastos_de_operacion: new Map([
          ["Gastos de Operacion y Mantenimiento", 9_649_310.13],
          ["Gastos de Comercializacion", 4_472_817.42],
          ["Gastos por Cuenta de Consumidores", 8_705.04],
          ["Gastos de Administracion", 4_068_176.04],
          ["Gastos por Depreciacion", 2_823_804.94],
          ["Amortizacion de Intangibles", 721_596.34],
          ["Amortizacion de Activos por Derecho de uso", 479_480.62],
          ["Costos por Servicios a Terceros", 605_634.4],
          ["Gastos de Períodos Anteriores", 594_410.6],
          ["Otros Gastos", 0.0],
          ["Pérdidas por retiro de activos fijos", 94_208.91],
        ]),
        sub_gastos_financieros: new Map([["Gastos Financieros", 1_542_383.31]]),
        sub_productos_financieros: new Map([
          ["Productos Financieros", 433_886.17],
          ["Otros Ingresos Financieros", 497_711.84],
        ]),
        sub_impuestos_y_reservas: new Map([
          ["Impuesto Sobre la Renta", 5_331_212.21],
          ["Impuesto Sobre la Renta Diferido", -2_516_873.29],
          ["Contribucion especial (CESC)", 621_771.19],
        ]),
      },

      {
        año: 2021,
        sub_productos_de_operacion: new Map([
          ["Ventas de energia", 94_245_035.72],
          ["Ventas de energia entre compañias distribuidoras", 1_848_313.78],
          ["Ingresos por uso de red", 32_294_800.14],
          ["Ingresos por transacciones en el MRS", 3_065_448.5],
          ["Otros Productos de Operación", 5_998_567.06],
        ]),
        sub_costos_de_energia: new Map([["Compra de energia", 99_670_344.34]]),
        sub_costos_y_gastos_de_operacion: new Map([
          ["Gastos de Operacion y Mantenimiento", 10_627_573.59],
          ["Gastos de Comercializacion", 5_383_963.52],
          ["Gastos por Cuenta de Consumidores", 12_026.7],
          ["Gastos de Administracion", 4_178_597.53],
          ["Gastos por Depreciacion", 2_836_087.29],
          ["Amortizacion de Intangibles", 680_252.65],
          ["Amortizacion de Activos por Derecho de uso", 469_690.49],
          ["Costos por Servicios a Terceros", 858_824.22],
          ["Gastos de Periodos Anteriores", -171_921.71],
          ["Otros Gastos", 0.0],
          ["Perdidas por retiro de activos fijos", 73_015.92],
        ]),
        sub_gastos_financieros: new Map([["Gastos Financieros", 1_297_683.3]]),
        sub_productos_financieros: new Map([
          ["Productos Financieros", 319_269.43],
          ["Otros Ingresos Financieros", 840_374.76],
        ]),
        sub_impuestos_y_reservas: new Map([
          ["Impuesto Sobre la Renta", -15_618.0],
          ["Impuesto Sobre la Renta Diferido", 5_024_406.17],
        ]),
      },
      {
        año: 2022,
        sub_productos_de_operacion: new Map([
          ["Ventas de energia", 123_619_649.59],
          ["Ventas de energia entre compañias distribuidoras", 2_550_259.88],
          ["Ingresos por uso de red", 33_843_128.15],
          ["Ingresos por transacciones en el MRS", 8_612_759.31],
          ["Otros Productos de Operación", 6_661_134.95],
        ]),
        sub_costos_de_energia: new Map([["Compra de energia", 135_871_008.35]]),
        sub_costos_y_gastos_de_operacion: new Map([
          ["Gastos de Operacion y Mantenimiento", 11_737_402.75],
          ["Gastos de Comercializacion", 5_781_625.37],
          ["Gastos por Cuenta de Consumidores", 5_326.11],
          ["Gastos de Administracion", 6_328_470.68],
          ["Gastos por Depreciacion", 2_829_903.52],
          ["Amortizacion de Intangibles", 623_931.73],
          ["Amortizacion de Activos por Derecho de uso", 473_317.18],
          ["Costos por Servicios a Terceros", 875_759.53],
          ["Gastos de Periodos Anteriores", -45_729.89],
          ["Perdidas por retiro de activos fijos", 145_955.52],
        ]),
        sub_gastos_financieros: new Map([["Gastos Financieros", 1_734_784.46]]),
        sub_productos_financieros: new Map([
          ["Productos Financieros", 228_015.56],
          ["Otros Ingresos Financieros", 1_044_805.01],
        ]),
        sub_impuestos_y_reservas: new Map([
          ["Impuesto Sobre la Renta", 2_771_155.53],
          ["Impuesto Sobre la Renta Diferido", 148_413.79],
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
        }
      }
    },
  },
});
