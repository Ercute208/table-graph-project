import React, {useContext} from 'react'
import {TableRow, TableCell, TableBody} from '@material-ui/core'
import {Context} from './App.js'

function DataTableBody(){

    const {currentColumns, data, forms} = useContext(Context)
    
    const getTableBody = () => {
        const processedData = processData()
        return processedData.map((object, rowNumber) => {
            const entries = Object.entries(object)
            return <TableRow key={"row" + rowNumber}>
                {entries.map((entry, columnNumber) => {
                    if(Object.entries(currentColumns).find(column => column[0] === entry[0] && column[1])){
                        return <TableCell key={rowNumber + " " + columnNumber}>{entry[1]}</TableCell>
                    }
                    return null
                })}
            </TableRow>   
        })
    }

    const processData = () => {
        let processedData = [...data]
        
        Object.entries(forms).forEach((form) => {
            if(form[1]){
                if(form[0] === "date"){ //table is filtered according to picked date
                processedData = processedData.filter(data => data[form[0]] === form[1]) 
                } else if(form[0] === "filters"){
                    forms.filters.forEach(filter => { //table is filtered according to the picked value
                        processedData = processedData.filter(data => filter.value === data[filter.key])
                })
                } else{
                    if(form[1].type === "ascending"){ //table is sorted according to the corresponding column asc/desc
                        processedData = processedData.sort((a, b) => a[form[1].key] - b[form[1].key])
                    }
                    else{
                        processedData = processedData.sort((a, b) => b[form[1].key] - a[form[1].key])
                    }      
                }                  
            }
        })

        return processedData
    }

    return (
        <TableBody>
            {getTableBody()}
        </TableBody>
    )
}

export default DataTableBody