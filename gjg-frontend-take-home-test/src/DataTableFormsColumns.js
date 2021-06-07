import React, {useContext} from 'react'
import {Context} from './App.js'

function DataTableFormsColumns(){
    const {currentColumns, setCurrentColumns} = useContext(Context)
    
    const handleCheckboxClick = (key, newValue) => {
        
        let newColumns = JSON.parse(JSON.stringify(currentColumns))
        newColumns[key] = newValue
        setCurrentColumns(newColumns)
    }

    const selectTableColumns = () => {
        return (
                <form style={{ width: "50%", display: "inline-block", backgroundColor: "rgba(57, 170, 227, 0.1)"}}>
                    <h4>Enable/Disable the Columns</h4>
                    <div style={{justifyContent: "space-around", display:"flex"}}>
                        {Object.entries(currentColumns).map((entry, index) => {
                            return <div key={entry[0] + index}>                           
                                    <input type="checkbox" readOnly checked={entry[1]} id={entry[0] + index} onClick={() => handleCheckboxClick(entry[0], !entry[1])}/>
                                    <label htmlFor={entry[0] + index}>{entry[0].charAt(0).toUpperCase() + entry[0].slice(1)}</label>
                            </div>
                        })}
                    </div>
                </form>
        )
    }

    return <>{selectTableColumns()}</>
}

export default DataTableFormsColumns