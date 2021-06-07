import React, {useState, useContext} from 'react'
import {Table, TableContainer} from '@material-ui/core'
import DataTableHeader from './DataTableHeader'
import DataTableBody from './DataTableBody'
import DataTableForms from './DataTableForms'
import {Context} from './App.js'


const getDefaultColumns = (keys) => { //returns the default state of the initial table columns
    let initialState = {}
    keys.forEach((key) => {
        if(key !== 'app' && key !== 'platform'){
            initialState[key] = true
        } else{
            initialState[key] = false
        }
    })
    return initialState
}

function DataTable(){
    const {data} = useContext(Context)
    const [currentColumns, setCurrentColumns] = useState(() => getDefaultColumns(Object.keys(data[0])))
    const [forms, setForms] = useState({date: null, sort: null, filters: []})
    const contextValue = {...useContext(Context), currentColumns: currentColumns, setCurrentColumns: setCurrentColumns, forms: forms, setForms: setForms}
    
    return ( 
        <Context.Provider value={contextValue}>
            <DataTableForms/>
            <TableContainer>
                <Table>
                    <DataTableHeader context={Context} />
                    <DataTableBody context={Context} />
                </Table>
            </TableContainer>
        </Context.Provider>
    )
}

export default DataTable