import React from 'react';
import {Table } from 'react-bootstrap';

const TableUsable = ({size,propsTableDataConfig,title,propsTableHead,propsTableData,nroRegistros}) => {
    if(nroRegistros===0){
        return(
            <h5 className="letratable ml-4 my-5">Aún no se han registrado datos.</h5>
        )
    }else{
        return (
            <>
                <span className="letratableTitle">{title}</span>
                <p className="letratable mb-3">Encuentre los datos que necesita para realizar seguimiento de la actividades
                                            relacionadas con su cuenta, configuración y regla de negocio.</p>
                <p className="letratable mb-0">Total registros: <b>{nroRegistros}</b></p>
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