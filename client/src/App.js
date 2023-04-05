import React from "react";
import './App.css';
import Home from "./pages/Home/Home";
import Navbar from "./Components/Navbar";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Upload from "./pages/upload/upload";
import Profile from "./pages/profile/profile";

function App() {
  return (
    <>
    <Navbar />
    <Router>
     <Routes>
     <Route path='/' Component={Home} />
     <Route path='/login' Component={Login} />
     <Route path='/register' Component={Register} />
     <Route path='/upload' Component={Upload} />
     <Route path='/profile' Component={Profile} />
     </Routes>
    </Router>
    </>
  );
}

export default App;
