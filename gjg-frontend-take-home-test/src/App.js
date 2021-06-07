import React, {useState, useEffect} from 'react'
import './index.css'
import DataTable from './DataTable'
import DataGraph from './DataGraph'
import {Box, Button, Grid} from '@material-ui/core'
import logo from './gjg-icon.png';

const url = 'https://recruitment-mock-data.gjg-ads.io/data'
export const Context = React.createContext()

function App() {
  const [showTable, setShowTable] = useState(true)
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => { //fetches api data and sets it to the corresponding state
    
    let dataSet = new Set() //will store unique dates to be checked
    let platforms = new Set() //will store unique platforms to be filtered
    let apps = new Set() //will store unique apps to be filtered
    let metrics = new Set() //will store unique metrics to be sorted

    const fetchData = async () => {
      try {
        const response = await fetch(url); //data is being fetched
        const data = await response.json() //data is being retrieved
        const newData = [...data.data] //the data array is set to be traversed
        let finalData = [] //will be used to store data with unique dates

        if(data){
          setIsLoading(false)
        }

        newData.forEach((singleData) => { //checks unique dates so that there wont be multiple values for a single date

          singleData.date = new Date(Date.parse(singleData.date)).toLocaleDateString()

          if(!dataSet.has(singleData.date)){ //checks for unique dates for the data chart to be displayed smoothly
            dataSet.add(singleData.date)
            finalData.push(singleData)
          }
          if(singleData.revenue % 1 > 0){ //excessive floating digits for some "revenue"s are handled to have only 1 floating digit
            singleData.revenue = Number(singleData.revenue.toFixed(1))
          }
          if(!platforms.has(singleData.platform)){ //checks for unique platform names
            platforms.add(singleData.platform)
          }
          if(!apps.has(singleData.app)){ //checks for unique app names
            apps.add(singleData.app)
          }
        })

        Object.entries(newData[0]).forEach(column => { //checks for unique metric keys and set them as both ascending & descending
          if(!isNaN(column[1])){
            metrics.add({key: column[0], type: "ascending"})
            metrics.add({key: column[0], type: "descending"})
          }
        })
        
        setData({data: [...newData], graphData:[...finalData], apps: [...apps], platforms: [...platforms], metrics: [...metrics]})
      
      } catch (error) {
        throw error
      }
    }
    
    fetchData()
  }, []) //if I add apiData as dependancy, as the data being fetched from api constantly changes,
         //the constant change can also be displayed within the table and the graph


  
  return (
    <Context.Provider value={data ? data : null}>
      {!isLoading 
      ? <Grid>
          <Box style={{width:"100%", display:"flex", alignItems:"center", backgroundColor: "rgba(245,245,245,0.5)"}}>
            <img src={logo} alt="Erkut Ös" width="275" height="100" />
            <Button style={{backgroundColor: "rgba(57,170,227,18)", color: "white"}} variant="contained" size="medium" onClick={() => setShowTable(!showTable)}>
              {showTable ? "Show Graph" : "Show Table"}
            </Button>
          </Box>
          {showTable 
          ? data && <DataTable /> 
          : data && <DataGraph/>}
        </Grid>
      : <h1 style={{justifyContent: "center", display: "flex"}}>Loading...</h1>} 
    </Context.Provider>
  );
}

export default App


