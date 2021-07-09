
const textoMayusculas = (texto) =>{
    let respuesta = texto.toUpperCase()
      
    return respuesta
}

const arregloTString = (array,name) => {
    let inputs = []
    array.forEach((elementos) => {
        inputs.push(elementos[name])
    }) 
    return inputs.toString()
}

const stringTArreglo = (string) => {
    let arr = string.split(',');
    return arr
}

export {textoMayusculas, arregloTString,stringTArreglo};