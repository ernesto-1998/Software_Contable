import { QMarkupTable } from 'quasar'
import Swal from 'sweetalert2'

export const alertas = {
    alertaPositiva(texto){
        
    },
    alertaNegativa(titulo, texto){
        Swal.fire({
            icon: "error",
            title: titulo,
            text: texto,
            color: '#fff',
            background: '#0B032D',
            backdrop: `
                rgba(0,0,123,0.4)
                left top
                no-repeat
            `            
        })
    }
}