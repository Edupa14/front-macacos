/* eslint-disable react-hooks/exhaustive-deps */
import axiosClient from 'config/axios/axiosClient';
import React, { Fragment, useEffect, useState } from "react";
import Select from "react-select";




export default function DemoState ({funciones, defaultValue} ) {

    const[optionsUser, setOptionsUser] = useState([])
    
    useEffect(async() => {
        let response = await axiosClient.post('parametro/listar')
            if (response.data.ok === true) {
              let rpta = response.data.data
                rpta = rpta.map((element)=>{
                  return {value:element.idParametro, label:element.Descripcion, name: 'idPadre'}
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
          options={optionsUser}
          value = {defaultValue}
        />
      </Fragment>
    );
}