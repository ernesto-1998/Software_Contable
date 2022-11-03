import { obtenerTotalesBalance } from "./totales";

export const getKeysBalance = (años) => {
    let ActivoCorriente = [];
    let ActivoNoCorriente = [];
    let PasivoCorriente = [];
    let PasivoNoCorriente = [];
    let Patrimonio = [];

    for(let a of años){
        let totales = obtenerTotalesBalance(a);

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
console.table(Patrimonio)
    return {
        ActivoCorriente,
        ActivoNoCorriente,
        PasivoCorriente,
        PasivoNoCorriente,
        Patrimonio
    }
}