import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// import withContext from './Context';
import Courses from "./components/Courses";

function App() {
    
  return (
    
    <div className="App">
        <Router>
          <Routes>
            <Route path='courses' component={Courses}/>
          </Routes>
        </Router>
    </div>
  );
}


export default App;
