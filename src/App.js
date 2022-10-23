import React from 'react'
import { useState } from 'react';
import {Routes,BrowserRouter,Route} from "react-router-dom"
import './App.css';
// import Dashboard from './component/Dashboard';
// import Linechart from './component/Linechart';
// import Example from './component/Piechart';
// import Piechart from './component/Piechart';
// import Duobattle from './component/Duobattle';
// import Custompie from './component/Custompie';
import Custompie1 from './component/Custompie1';
import Performance from './component/Performance';
import Dashboardpage from './component/Dashboardpage';
import Seasons from './component/Seasons';


function App() {
  const [year,setYear]=useState(0);
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Dashboardpage setYear={setYear} />}/>
            <Route path="/performance" element={<Performance/>}/>
            <Route path="/battleduo" element={<Custompie1/>}/>
            <Route path="/season" element={<Seasons year={year}/>}/>
        </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
