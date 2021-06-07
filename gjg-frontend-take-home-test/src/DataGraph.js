import React, {useState, useContext} from 'react'
import {ArgumentAxis, ValueAxis, Chart, LineSeries} from '@devexpress/dx-react-chart-material-ui';
import {Context} from './App.js'

const getGraphData = (data, verticalAxis) => {
    let newGraphData = []
    
    data?.forEach((singleData, index) => {
        newGraphData.push({argument: index + 1, value: singleData[verticalAxis]})
    })

    return newGraphData
}

function DataGraph(){
    const data = useContext(Context).graphData
    const [verticalAxis, setVerticalAxis] = useState("dau")
    const [graphData, setGraphData] = useState(() => getGraphData(data, verticalAxis))

    const changeVerticalAxis = () => {
        const selectBox = document.getElementById("numerics");
        const selectedValue = selectBox.options[selectBox.selectedIndex].value;
        setVerticalAxis(selectedValue)
        setGraphData(() => getGraphData(data, selectedValue))
    }

    const selectVerticalAxis = () => {
        return (
            <div style={{height: 90.35, backgroundColor:"rgba(57, 170, 227, 0.1)"}}>
                <form>
                    <label htmlFor="numerics">Vertical Axis: </label>
                    <select name="numerics" id="numerics" onChange={changeVerticalAxis} value={verticalAxis}>
                        {Object?.entries(data[0])?.map((entry, index) => {
                            return typeof entry[1] === 'number' && 
                                <option key={index} value={entry[0]} >
                                    {entry[0].charAt(0).toUpperCase() + entry[0].slice(1)}
                                </option>
                        })}        
                    </select>
                    <h5>*Displaying {data.length} consecutive days: ({data[0].date} - {data[data.length - 1].date})</h5> 
                </form>
            </div>
        ) 
    }
    
    return (
        <>
            {selectVerticalAxis()}        
            <Chart data={graphData} style={{marginTop: 20}} >
                <ArgumentAxis />
                <ValueAxis />
                <LineSeries valueField="value" argumentField="argument" />
            </Chart>
        </>
    )
}

export default DataGraph