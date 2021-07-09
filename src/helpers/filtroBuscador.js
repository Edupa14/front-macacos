

const abecedario = ["A","B","C","D","E","F","G","H","I","J","K","L","M",
"N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"]


const filterAbecedario = (array,filtro) =>{
    let result = []
    abecedario.forEach(ele=>{
        let found = array.find(element=> element[filtro].charAt(0).toUpperCase() === ele)
        if(found !==undefined){
            result.push(found[filtro].charAt(0).toUpperCase())
        }
    })
    const filtered = result.filter(element=> element !== undefined)
    return filtered
}

const filterTipo = (arrays,filtro) =>{
    let ValorTipoFiltrado =Array.from(new Set(arrays.map(element=> element[filtro]))) 
    return ValorTipoFiltrado
}

const filterTipoLetra = (arrays,filtroLetra,filtroTipo,filtro) => {
    if (filtroLetra === ''){
        let result = arrays.filter(element=> element[filtro] === filtroTipo)
        return result
    }else{
        
    }
    
}

    
export {abecedario,filterAbecedario,filterTipo,filterTipoLetra}