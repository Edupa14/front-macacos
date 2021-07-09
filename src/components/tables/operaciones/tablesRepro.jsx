import React from 'react';
import {Table } from 'react-bootstrap';
import editIcon from 'img/utils/edit.svg'
import CabeceraTable from 'components/tables/cabecera'
import '../table.css'

const TableFuncional = ({datos,funciones,nombreFuncion,propsTableDataConfig,title,propsTableHead,propsTableData,nroRegistros}) => {

    const funcionesTable = (data)=>{
        funciones(data)
    }

    if(nroRegistros===0){
        return(
            <p>Aún no se han registrado datos.</p>
        )
    }else{ 
        return (
            <>
                <span className="letratableTitle">{title}</span>
                <CabeceraTable data={datos}></CabeceraTable>
               
                <hr/>
                <Table className="tableexpand" striped responsive bordered hover size="sm">
                    <thead>
                        <tr>
                            {propsTableHead.map((ele,index)=>
                                <th className="letratable" key={index}>{ele}</th>
                            )}
                            <th className="letratable">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {propsTableData.map((ele,index)=>
                        <tr key={index}>
                            {propsTableDataConfig.map((elem,inde)=>
                                <td className="letratable" key={inde}>{ele[elem]}</td>
                            )}    
                            <td> 
                                <button className="btn letratable pt-0 buttonTable done-btn" onClick={()=>funcionesTable(ele)}>
                                    {nombreFuncion}
                                    <img height="12px" className="mx-2" src={editIcon} alt=""/> 
                                </button> 
                            </td>                    
                        </tr>
                        )}
                    </tbody>
                </Table>
            </>
        );
    }
    
}
export default TableFuncional;