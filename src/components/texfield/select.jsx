/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect  } from "react";

import CreatableSelect from "react-select/creatable";

// const [opciones, setOpciones] = useState([]);
const options = [
  { value: '{{administrativo.email}}', label: '{{administrativo.email}}'},
  { value: '{{comercial.email}}', label: '{{comercial.email}}'},
  { value: '{{finanzas.email}}', label: '{{finanzas.email}}'},
  { value: '{{operativo.email}}', label: '{{operativo.email}}' },
  { value: '{{proveedor.email}}', label: '{{proveedor.email}}' },
  { value: '{{usuario.email}}', label: '{{usuario.email}}' },
  { value: '{{sistemas.email}}', label: '{{sistemas.email}}' },
  { value: '{{sponsor.email}}', label: '{{sponsor.email}}'}  
];



export default function DemoCreaTable ({ select, dataOptions, peticiones, limpieza }){
    
    const [opciones, setOpciones] = useState([]);

    const handleChange = (newValue, actionMeta) => {
    console.group("Value Changed");
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    setOpciones()
    select(newValue)
    };

    useEffect(() => {
        if (dataOptions !== undefined) {
            setOpciones(dataOptions)
        }
        select(dataOptions)
    }, [peticiones])

    useEffect(()=>{
        setOpciones('')
    }, [limpieza])

    return (
        <div>
            <CreatableSelect isMulti onChange={handleChange} options={options} value ={opciones}/>
        </div>
      
    );
}