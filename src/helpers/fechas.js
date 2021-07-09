import alerta from 'helpers/alerts'
export const validarFechaMinima = (fechaVenc) =>{
    let today = new Date();
    let tomorrow = new Date();
    let dt = String(today.getDate()+1).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    tomorrow = yyyy + '-' + mm + '-' + dt;
    let arrFecha = fechaVenc.split('-')
    let fechaProp = new Date(arrFecha[2],arrFecha[1]-1,arrFecha[0])
    let restaFecha = (fechaProp-today)/(1000*60*60*24)
    if(restaFecha<1){
        return tomorrow
    }else{
        let dia = parseInt(arrFecha[0]) + 1
        let fechaForm = arrFecha[2] + '-' + arrFecha[1] + '-' + dia
        return fechaForm
    }
} 

export const fechaValida = (fechaVenc) =>{
    let arrFecha = fechaVenc.split('-')
    let fechaProp = new Date(arrFecha[0],arrFecha[1]-1,arrFecha[2])
    let diaSemana = fechaProp.getDay()
    if(diaSemana === 0 || diaSemana === 6){
        alerta('Debe ser una fecha valida','error')
        return false
    }else{
        return true
    }
}