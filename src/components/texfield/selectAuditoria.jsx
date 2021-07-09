/* eslint-disable react-hooks/exhaustive-deps */
import axiosClient from 'config/axios/axiosClient';
import React, { Fragment, useEffect, useState } from "react";
import Select from "react-select";




export default function DemoState ({funciones} ) {

    const[optionsUser, setOptionsUser] = useState([])
    
    useEffect(async() => {
        let response = await axiosClient.get('usuario/listar')
            if (response.data.ok === true) {
              let rpta = response.data.data
                rpta = rpta.map((element)=>{
                  return {value:element.idUsuario,label:element.Nombre+' '+element.apePat+' '+element.apeMat}
                })
                setOptionsUser(rpta)
            }
    }, [])
    return (
      <Fragment>
        <Select onChange={event => funciones.handleChanges(event)}
          className="basic-single"
          classNamePrefix="select"
          isDisabled={false}
          isLoading={false}
          isClearable={true}
          isRtl={false}
          isSearchable={true}
          name="idUsuario"
          options={optionsUser}
        />
      </Fragment>
    );
}