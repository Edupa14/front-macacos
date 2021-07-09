import React from 'react';
import {Table } from 'react-bootstrap';
import './table.css'
import iconError from 'img/datos.png'

const TableUsable = ({size,propsTableDataConfig,title,propsTableHead,propsTableData,nroRegistros}) => {
    if(nroRegistros===0){
        return(
            <>
                <img src={iconError} alt="img" style={{ margin: "5% 25%", width: "50%", height: "30%" }} />
                <h3 style={{ width: "100%", height: "20%", margin: "0% 23%" }}>No se han encontraron resutados</h3>
                <h6 style={{ width: "100%", height: "20%", margin: "0% 20%", color: "#ababab" }}>Selecciona un valor o prueba con otro para visualizar los datos</h6>
                <br />
            </>
        )
    }else{ 
        return (
            <>
                <span className="letratableTitle">{title}</span>
                <p className="letratable">N° de registros encontrados: {nroRegistros}</p>
                <hr/>
                <Table style={(size)? {width:size} : {width:"1500px"}} striped responsive bordered hover size="sm">
                    <thead>
                        <tr>
                            {propsTableHead.map((ele,index)=>
                                <th className="letratable" key={index}>{ele}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {propsTableData.map((ele,index)=>
                        <tr key={index}>
                            {propsTableDataConfig.map((elem,inde)=>
                                <td className="letratable" key={inde}>{ele[elem]}</td>
                            )}                        
                        </tr>
                        )}
                    </tbody>
                </Table>
            </>
        );
    }
    
}
export default TableUsable;