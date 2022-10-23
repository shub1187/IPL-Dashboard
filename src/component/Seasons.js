import React, { useEffect,Fragment } from 'react'
import Records from "../matches.json"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./seasons.css"
import { MdOutlineDashboard } from 'react-icons/md';

function Seasons({year}) {
    const navigate = useNavigate();
     //Using Usestate to store dynamic data 
    const [data,Setdata]=useState(Records)
    const [show,Setshow]=useState([]);
    // function to handle season
    let arr;
    let handleSeason = ()=>{
         Setdata(Records)
        arr=[];
        for(let i=0;i<data.length;i++){
            if(year===data[i].season){
                arr.push(data[i]);
            }
        }
        let finals = arr.pop();
        Setshow([finals]);
    }
    useEffect(()=>{
        handleSeason();
    })

    const goback = ()=>{
        navigate("/")
    }

  return (
    <Fragment>
        <div id="screen">
            <h1>IPL {year} Finale Summary</h1>
            <div id="post">
            <div id="trophy">
            </div>
            {
                show.map((value)=>{
                return(
                <div id="data">
                    <br/>
                    <p><b>{value.team1}</b> Vs <b>{value.team2}</b></p><br/>
                    <p>Venue:{value.venue}</p><br/>
                    <p>Toss won by <b>{value.toss_winner}</b> and choose to <b>{value.toss_decision}</b></p><br/>
                    <p>Winner of the match : <b>{value.winner} </b></p><br/>
                    <p>Player of the match : <b>{value.player_of_match}</b></p><br/>
                </div>
                    )
                })
            } 
        <div id="mybtn1"><button onClick={goback} id="btn">< MdOutlineDashboard/>Dashboard</button></div>
        </div>
        </div>
     </Fragment>
  )
}
export default Seasons
