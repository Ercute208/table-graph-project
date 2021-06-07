import React from 'react'
import "react-datepicker/dist/react-datepicker.css"
import DataTableFormsRows from './DataTableFormsRows'
import DataTableFormsColumns from './DataTableFormsColumns'

function DataTableForms(){

    return (
        <div style={{ display: 'flex'}}>
            <DataTableFormsColumns />
            <DataTableFormsRows />
        </div>
    )
}

export default DataTableForms