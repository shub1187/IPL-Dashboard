import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Records from "../matches.json"
import { useState,useEffect } from 'react'
import "./duobattle.css"
import { MdOutlineDashboard } from 'react-icons/md';
import { useNavigate } from 'react-router-dom'
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
function Custompie1 () {
    const [data,Setdata]=useState(Records);
    const [allteam,setAllteam]=useState([]);
    const [teamsummary,setteamsummary]=useState({totalmatches:0,win_team1:0,win_team2:0});
    const [show,setShow]=useState([ { name: 'Team A', value: 50},
    { name: 'Team B', value: 50 }])
    // const[twoteam,setTwoteam] =useState([])
    const navigate = useNavigate();
    const goback = ()=>{
      navigate("/")
  }
    // Logic for finding out teams.....
        useEffect(()=>{
          Setdata(Records)
            let teams = [];
        for(let i=0;i<data.length;i++){
            teams.push(data[i].team1);
            teams.push(data[i].team2);
        }
        let singleteam = [...new Set(teams)];
        // console.log(singleteam);
        setAllteam(singleteam);
        // console.log(allteam);
        },[data])
        // console.log(allteam);
    let battleData;
    let summary;
    let team1;
    let team2;
    const duobattle = ()=>{
         team1=document.getElementById("team1").value;
         team2=document.getElementById("team2").value;
        let totalplayed =0;
        let totalwon_team1 = 0;
        let totalwon_team2=0;
        for(let i=0;i<data.length;i++){
            if(team1===data[i].team1 && team2===data[i].team2){
                totalplayed=totalplayed+1;
                if(data[i].winner === team1){
                    totalwon_team1=totalwon_team1+1;
                }
                else{
                    totalwon_team2=totalwon_team2+1;
                }
            }
            else if(team1===data[i].team2 && team2===data[i].team1){
                totalplayed=totalplayed+1;
                if(data[i].winner === team1){
                    totalwon_team1=totalwon_team1+1;
                }
                else{
                    totalwon_team2=totalwon_team2+1;
                }
            } 
            }
            let winning_percent_team1 = Math.round((totalwon_team1/totalplayed)*100);
            let winning_percent_team2 = 100-winning_percent_team1;
             battleData = [];
             summary =[];
             summary.push({totalmatches:totalplayed,win_team1:totalwon_team1,win_team2:totalwon_team2})
             setteamsummary(...summary);
             console.log(teamsummary);
            battleData.push({name:team1,value:winning_percent_team1})
            battleData.push({name:team2,value:winning_percent_team2})
            // console.log(battleData)
            setShow(battleData);
            // console.log(`winning chances of ${team1} is ${winning_percent_team1}%`)
            // console.log(`winning chances of ${team2} is ${winning_percent_team2}%`)
    }
    return (
        <>
        <div id="battle">
      <div id="pie-header">
        <div id="dash">
        <h1>Duo Battle Analysis</h1>
        <span id="backbtn"><button id="dashbtn" onClick={goback}><MdOutlineDashboard/>Dashboard</button></span>
        </div>
        <div id="pie-select">
        <select id="team1"> 
        {
        allteam.map((value)=>{
            return(
        <option>{value}</option>
            )
        })
        }      
      </select>
      <span><b>Versus</b></span>
      <select id="team2"> 
        {
        allteam.map((value)=>{
            return(
    <option>{value}</option>
            )
        })
        }      
      </select>
      </div>
      <button id="mybtn" onClick={duobattle}>Find Battle Results</button>
      </div>
      <div id="pie-div">
      <ResponsiveContainer width="100%" aspect={4.7}>
        <PieChart width={700} height={800}>
          <Pie
            data={show}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={160}
            fill="#8884d8"
            dataKey="value"
          >
            {show.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
         </ResponsiveContainer>
      </div>
      <div id="card-div">
        <div className="card1">
          <h1>Matches Won<br/>By</h1>
          <p><b>{show[0].name}</b></p>
          <p>{teamsummary.win_team1}</p>
        </div>
        <div className='circle'>
          <p><b>Total Matches<br/>played between</b></p>
          <p><b>{teamsummary.totalmatches}</b></p>
        </div>
        <div className='card1'>
        <h1>Matches Won<br/>By</h1>
        <p><b>{show[1].name}</b></p>
        <p><b>{teamsummary.win_team2}</b></p>
        </div>
      </div>
     
      </div>
      </>
    );
  }
  export default Custompie1;
