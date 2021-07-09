import React, { useState, useEffect } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';

export default function App({ multiSelect, dataOptions, peticiones, limpieza }) {

    const [opciones, setOpciones] = useState([]);
    const options = [
        { name: '{{comercial.email}}', id: 1 },
        { name: '{{sponsor.email}}', id: 2 },
        { name: '{{proveedor.email}}', id: 3 },
        { name: '{{operativo.email}}', id: 4 },
        { name: '{{inversionista.email}}', id: 5 },
        { name: '{{marketing.email}}', id: 6 }
    
    ]
    const [data, setData] = useState(options);

    useEffect(() => {
        let array = []
        if (dataOptions !== undefined) {
            
            dataOptions.map((data) => {
                let index = options.findIndex(element => element.name === data)
                let input = { name: data, id: index }
                array.push(input)
            })
        }
        setOpciones(array)
        multiSelect(array)
    }, [peticiones])

    useEffect(()=>{
        setOpciones('')
    }, [limpieza])

    const onSelect = (data) => {
        
        multiSelect(data)
    }

    const onRemove = (data) => {
        
        multiSelect(data)
    }
        return (
            <div className="chat-container">
                <Multiselect
                    options={options}
                    selectedValues={opciones}
                    displayValue="name"
                    onSelect={onSelect}
                    onRemove={onRemove}
                />
            </div>

        )
}