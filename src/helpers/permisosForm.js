const setPermisosForm = (ESCRIT,TIPO) =>{
    let readAll = true,
        readOne = true
    if(ESCRIT === false){
        readAll = true
        readOne = true
    }
    if(ESCRIT === true){
        if(TIPO === "ADD"){ readAll = false; readOne = false}
		if(TIPO === "EDIT"){ readAll = false; readOne = true}
    }
    return {readAll,readOne}
}

export default setPermisosForm