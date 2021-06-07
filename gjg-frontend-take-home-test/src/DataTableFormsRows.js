import React, {useContext} from 'react'
import {ImCross} from 'react-icons/im'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import {Context} from './App.js'

function DataTableFormsRows(){
    const {data, apps, platforms, forms, metrics, setForms} = useContext(Context)
    
    const getTableHeaderForms = () => {
        let sortCount = 0
        const checkColumns = Object.entries(data[0]).map((column, index) => {
            if(column[0] === "date"){ //date picker
                return   setDatePicker()
            } else if(isNaN(column[1])){ //filter for app and platforms
                return setBreakdownFilterOptions(column[0], column[1])               
            } else{
                if(sortCount > 0){ //there should be only 1 sort input, instead of using a state rerendering the code, I decided to use a counter
                    return null
                }
                sortCount = sortCount + 1
                return setMetricSortOptions(column[0]) 
            }      
        })
        return (
                <div style={{width:"50%", display:"inline-block",  backgroundColor: "rgba(57, 170, 227, 0.1)"}}>
                    <h4>Sort/Filter Table Data</h4>
                    <form style={{display:"flex", justifyContent:"space-around"}}>
                        {checkColumns}
                    </form>     
                </div>
        )
    }

    const setDatePicker = () => {
        return <div key="date picker">
            <label htmlFor="datePicker">Date: </label>
            <DatePicker id="datePicker" value={forms.date} style={{justifyContent: "space-around"}}onChange={date => setForms({...forms, date: date.toLocaleDateString()})}>
                <ImCross onClick={() => setForms({...forms, date: null})}/>
            </DatePicker>
        </div>
    }
 
    const setBreakdownFilterOptions = (key) => {
        const array = key === "app" ? apps  : platforms
        return <div key={"breakdown filter" + key}>
            <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}: </label>
            <select name={key} id={key} onChange={() => selectFilterType(key)}>
                <option value="unfiltered">None</option>
                {array?.map((item, index) => {
                    return <option key={item + index} value={item}>
                        {item}
                    </option>
                })}        
            </select>    
        </div> 
    }

    const selectFilterType = (key) => {

        const selectedBox = document?.getElementById(key)
        const selectedValue = selectedBox?.options[selectedBox?.selectedIndex]?.value 
        let newFilters = [...forms.filters]
        const duplicateIndex = newFilters.findIndex(filter => filter.key === key)
        
        if(selectedValue === "unfiltered"){
            newFilters = newFilters.filter(filter => filter.key !== key)
        } else if(duplicateIndex > -1){
            newFilters = newFilters.filter(filter => filter.key !== key)
            newFilters.push({key: key, value: selectedValue})
        } else{
            newFilters.push({key: key, value: selectedValue})
        }
        setForms({...forms, filters: newFilters})
    }   

    const setMetricSortOptions = () => {
        return <div key="sort by metrics">
            <label htmlFor="metrics">Sort: </label>
            <select name="metrics" id="metrics" onChange={() => selectSortType()}>
            <option value="unsorted">None</option>
            {metrics?.map((metric) => {
                const metricKey = metric.key.charAt(0).toUpperCase() + metric.key.slice(1)
                const metricType = metric.type.charAt(0).toUpperCase() + metric.type.slice(1)
                return <option key={metricKey + metricType} value={JSON.stringify(metric)}>{metricKey} ({metricType})</option>
            })}  
            </select> 
        </div>
    }

    const selectSortType = () => {
        const selectedBox = document?.getElementById("metrics")
        const selectedValue = selectedBox?.options[selectedBox?.selectedIndex]?.value

        if(selectedValue === "unsorted"){
            setForms({...forms, sort: null})
        } else{
            
            setForms({...forms, sort: JSON.parse(selectedValue)})
        }
    }

    return <>{getTableHeaderForms()}</>
}

export default DataTableFormsRows