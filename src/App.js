import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from './HomePage/HomePage'; 
import MapPage from './MapPage/MapPage';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import keralaGeoJson from './geojson/district.json'; // Adjust the path accordingly


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </Router>
  );
}

export default App;
