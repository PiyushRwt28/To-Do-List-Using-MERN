import React from 'react';
import './App.css';
import Login from './Components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import SignUp from './Components/Signup';
import TaskPage from './Components/TaskPage';

function App() {


  return (
    <Router>
      <div> 
        {/* Normal route layout */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/tasks' element={<TaskPage />}></Route>
        </Routes>
      </div>
    </Router>
  );
}


export default App;
