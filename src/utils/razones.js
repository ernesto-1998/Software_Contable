export const razones_liquidez = {
    razon_circulante: function(activo_corriente, pasivo_corriente) {
        return activo_corriente / pasivo_corriente
    },

    razon_rapida: function(activo_corriente, inventarios, pasivo_corriente) {
        return (activo_corriente - inventarios) / pasivo_corriente;
    },

    capital_trabajo: function(activo_corriente, pasivo_corriente) {
        return activo_corriente - pasivo_corriente;
    },

    roa: function(utilidades_neta, activos) {
        return utilidades_neta / activos;
    },

    roe: function(utilidades_neta, patrimonio) {
        return utilidades_neta / patrimonio;
    },

    ros: function(utilidades_neta, ventas) {
        return utilidades_neta / ventas;
    }
};

export const razones_actividad = {
    rotacion_inventarios: function(costo_bienes_vendidos, inventarios) {
        return costo_bienes_vendidos / inventarios;
    },

    margen_utilidad_operativa: function(utilidades_operativas, ventas) {
        return utilidades_operativas / ventas;
    },

    margen_utilidad_bruta: function(utilidades_accionistas_comunes, ventas) {
        return utilidades_accionistas_comunes / ventas;
    },

    ganancias_por_accion: function(ganancias_para_accion_comunes, numero_acciones_circulacion) {
        return ganancias_para_accion_comunes / numero_acciones_circulacion;
    },

    edad_promedio_inventario: function(rotacion_inventarios) {
        return 365 / rotacion_inventarios;
    },

    periodo_promedio_cobro: function(cuentas_por_cobrar, ventas_anuales) {
        return (cuentas_por_cobrar / (ventas_anuales / 365));
    },

    periodo_promedio_pago: function(cuentas_por_pagar, compras_anuales) {
        return (cuentas_por_pagar / (compras_anuales / 365));
    },

    rotacion_activos_totales: function(ventas, activos_totales) {
        return ventas / activos_totales;
    }
}

export const razones_deuda = {
    razon_endeudamiento: function(pasivos_totales, activos_totales) {
        return pasivos_totales / activos_totales;
    },

    razon_deuda_capital_patrimonial: function(pasivos_totales, capital_en_acciones_comunes) {
        return pasivos_totales / capital_en_acciones_comunes;
    },

    razon_cargos_interes_fijo: function(utilidad_antes_impuestos, intereses) {
        return utilidad_antes_impuestos / intereses;
    },

    razon_cobertura_pagos_fijos: function(utilidad_antes_intereses_impuestos, pagos_arrendamiento, intereses){
        return (utilidad_antes_intereses_impuestos + pagos_arrendamiento) / intereses;
    }
}

export const razones_rendimiento = {
    margen_utilidad_bruta: function(utilidades_brutas, ventas) {
        return utilidades_brutas / ventas; // utilidades_brutas = ventas - costo de los bienes vendidos        
    },

    margen_utilidad_operativa: function(utilidades_operativas, ventas) {
        return utilidades_operativas / ventas;
    },

    margen_utilidad_neta: function(utilidades_disponibles_acciones_comunes, ventas) {
        return utilidades_disponibles_acciones_comunes / ventas;
    },

    ganancias_por_accion: function(ganancias_disponibles_accionistas_comunes, numero_acciones_comunes_circulacion) {
        return ganancias_disponibles_accionistas_comunes / numero_acciones_comunes_circulacion;
    },

    rendimiento_sobre_activos_totales: function(utilidades_disponibles_accionistas_comunes, activos_totales) {
        return utilidades_disponibles_accionistas_comunes / activos_totales;
    },

    rendimiento_sobre_patrimonio: function(utilidades_disponibles_para_accionistas_comunes, capital) {
        return utilidades_disponibles_para_accionistas_comunes / capital;
    }

}

export const razones_mercado = {
    razon_precio_ganancias: function(precio_de_mercado_accion_comun, ganancias_por_accion) {
        return precio_de_mercado_accion_comun / ganancias_por_accion;
    },

    valor_en_libros_por_accion_comun: function(capital_patrimonial_accionario, numero_acciones_comunes_circulacion) {
        return capital_patrimonial_accionario / numero_acciones_comunes_circulacion;
    },

    razon_mercado_libro: function(precio_mercado_accion_comun, valor_en_libros_por_accion_comun) {
        return precio_mercado_accion_comun / valor_en_libros_por_accion_comun;
    }
}