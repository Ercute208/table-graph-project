import React, {useContext} from 'react'
import {TableRow, TableHead, TableCell} from '@material-ui/core'
import {Context} from './App.js'

function DataTableHeader(){
    const {currentColumns} = useContext(Context)
    
    const getTableHeaderRow = () => {
        return <TableRow style={{backgroundColor: "rgba(245,245,245,0.5)", height: 70}}>{Object.entries(currentColumns)?.map((entry, index) => {//if the value is true, add the column with the corresponding key value to the table
            return entry[1] ? <TableCell key={index}>{entry[0].charAt(0).toUpperCase() + entry[0].slice(1)}</TableCell> : null
        })}</TableRow>
    }

    return (
        <TableHead >
            {getTableHeaderRow()}
        </TableHead>
    )
}

export default DataTableHeader