import swal from 'sweetalert'

function alerta(text,icon){
    swal({
        text:text,
        icon:icon,
    });
}
export const alertaEliminar = async() => {
    const willDelete = await swal({
        title: "Eliminar",
        text: "Esta seguro de eliminar este elemento",
        icon: "warning",
        buttons: ["Cancelar","Confirmar"],
        dangerMode: true,
      });
       
      if (willDelete) {
        swal("Eliminado!", "Elemento eliminado exitosamente", "success");
        return true  
      }else{
        return false
      }
}

export default alerta