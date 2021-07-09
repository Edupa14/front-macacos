
/* allowRoles, array de Roles-> de la Vista */

export const RolesPermitidos = (allowRoles) => {
    let respuesta = true
    if(allowRoles[0]!=='*'){
        const userSecciones = JSON.parse(localStorage.accesos)
        let permisos = userSecciones.filter(element => element.perLect === 1).map(element=>element.codSeccion)
        let respuestaPermisos = allowRoles.map(element => {
            return permisos.includes(element)
        });
        if (respuestaPermisos.includes(true) === false ) respuesta = false
        /* roles de acceso,estados,tipodoc,interactuar consultas, probar errores,*/
    }
    
    return respuesta
}

export const EscrituraPermitida = (acceso) =>{
    let respuesta = 0
    const userSecciones = JSON.parse(localStorage.accesos)
    let permisos = userSecciones.filter(element => element.perEscr === 1).map(element=>element.codSeccion)
    let respuestaPermiso = permisos.includes(acceso)
    respuestaPermiso ? respuesta = true : respuesta = false
    return respuesta
}


