import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from './HomePage'; 
import MapPage from './MapPage';
import keralaGeoJson from './geojson/district.json'; // Adjust the path accordingly


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<MapPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
