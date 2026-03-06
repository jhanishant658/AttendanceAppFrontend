import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './Components/Authentication/Signup';
import Signin from './Components/Authentication/Signin';
import Home from './Components/Dashboard/Home';
import AttendanceDetails from './Components/Dashboard/AttendanceDetails';


function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/signup" element={<Signup/>} />
        <Route path='/signin' element={<Signin/>} />
        <Route path='/' element= {<Home/>} />
        <Route path='/AttendanceDetail' element= {<AttendanceDetails/>} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;

