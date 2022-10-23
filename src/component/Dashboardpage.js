import React, { Fragment, useState } from 'react'
import "./Dash.css"
import { MdOutlineDashboard } from 'react-icons/md';
import { useNavigate } from 'react-router-dom'

function Dashboardpage({setYear}) {

    const navigate = useNavigate();
    const handlebattle = ()=>{
        navigate("/battleduo")
    }
    const handle_performance = ()=>{
        navigate("/performance")
    }
    const handleseason = (e)=>{
        setYear(e);
        navigate("/season")
        console.log(e);
    }
  return (
   <Fragment>
     <div id="body">
            <div id="left">
            </div>
            <div id="right">
                <div id="top">
                    <div id="header">
                        <MdOutlineDashboard/>
                        <p>Dashboard</p>
                    </div>
                </div>
                <div id="mid">
                   <div className='battle' onClick={handlebattle}>
                    <p>Team battles</p>
                    </div> 
                    <div className='navbar'  onClick={handle_performance}>
                    <p>Performance Stats</p>
                    </div>

                </div>
                <div id="bottom">
                    <div id="header-season">
                    <p id="text">Checkout Seasons</p>
                    </div>
                    <div className="row" >
                        <div className='card' onClick={()=>{handleseason(2008)}}>Season 2008</div>
                        <div className='card' onClick={()=>{handleseason(2009)}}>Season 2009</div>
                        <div className='card' onClick={()=>{handleseason(2010)}}>Season 2010</div>
                    </div>
                    <div className="row" >
                        <div className='card' onClick={()=>{handleseason(2011)}}>Season 2011</div>
                        <div className='card' onClick={()=>{handleseason(2012)}}>Season 2012</div>
                        <div className='card' onClick={()=>{handleseason(2013)}}>Season 2013</div>
                    </div>
                    <div className="row" >
                        <div className='card' onClick={()=>{handleseason(2014)}}>Season 2014</div>
                        <div className='card' onClick={()=>{handleseason(2015)}}>Season 2015</div>
                        <div className='card' onClick={()=>{handleseason(2016)}}>Season 2016</div>
                    </div>
                    <div className="row" >
                        <div className='card' onClick={()=>{handleseason(2017)}}>Season 2017</div>
                    </div>
                </div>
            </div>
     </div>
   </Fragment>
  )
}

export default Dashboardpage
