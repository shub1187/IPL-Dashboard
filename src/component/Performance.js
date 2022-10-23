import React, { Fragment, useEffect } from 'react'
import Records from "../matches.json"
import { useState } from 'react'
import {Line,LineChart,ResponsiveContainer,XAxis,Tooltip,YAxis,CartesianGrid,Legend} from "recharts"
import {useNavigate} from "react-router-dom"
import "./performance.css"
import { MdOutlineDashboard } from 'react-icons/md';

function Performance(){
    const navigate = useNavigate();
    //Using Usestate to store dynamic data 
    const [data,Setdata]=useState(Records);
    const [allteam,setAllteam]=useState([]);
    const [performance,setperformance]=useState([{season:0,matches_won:0}])

    // Logic for finding out teams.....
    useEffect(()=>{
        Setdata(Records)
        let teams = [];
    for(let i=0;i<data.length;i++){
        teams.push(data[i].team1);
        teams.push(data[i].team2);
    }
    let singleteam = [...new Set(teams)];
    setAllteam(singleteam);
    },[data])
  
       // We can make it progressive by changing only the i value for upcoming season that is 2019,2020,2021,2022
    let pdata;
    const handlePerformance = ()=>{
        const team = document.getElementById("team").value;
        pdata=[];                   
        for(let i=2008;i<=2017;i+=1){
            let year = i;
            let count = 0;
            for(let j=0;j<data.length;j++){
                if(data[j].season===year && ((data[j].team1===team)||(data[j].team2===team))){
                    if(data[j].winner===team){
                        count++
                    }

                }
            }
            pdata.push({season:i,matches_won:count})
        }
        setperformance(pdata)
        console.log(pdata)
    }
    const handleback = ()=>{
        navigate("/")
    }
    return (
        <Fragment>
            <div id="perform-outer">
               
                <div id="perform-select">
                    <div id="perform-header">
                    <h1>Team Performance Graph</h1>
                    </div>
            <div id="seperator">
             <select id="team" onChange={handlePerformance}> 
             <span>Select your team </span>
                {
                allteam.map((value)=>{
                    return(
                    <option>{value}</option>
                    )
                })
                }      
              </select>
              <button onClick={handleback} id="mybtn2"><MdOutlineDashboard/>Dashboard</button>
              </div>
              </div>
              <div id="perform-graph">
                <ResponsiveContainer width="100%" aspect={3.5}>
                    <LineChart data={performance} width={500} height={300} margin={{top:5,right:300,left:5,bottom:5}}>
                    <CartesianGrid/>
                    <XAxis dataKey="season" interval={"preserveStartEnd"}/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="matches_won" stroke="#251B37" activeDot={{r:8}} />
                    </LineChart>
            </ResponsiveContainer>
            </div>
            </div>
        </Fragment>
    )
}
export default Performance;