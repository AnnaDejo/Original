import { MapContainer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; 
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import districtData from './geojson/district.json';
import './MapPage.css'; // Import CSS file for styles

const MapPage = () => {
  const [hoveredDistrict, setHoveredDistrict] = useState(null);
  const [clickedDistrict, setClickedDistrict] = useState(null); // State to track clicked district
  const navigate = useNavigate();  

  // Set bounds for Kerala based on your GeoJSON data
  const keralaBounds = [
    [7.996, 74.851],  // Southwest corner (min lat, min lng)
    [12.925, 77.614]  // Northeast corner (max lat, max lng)
  ];

  // Style for each district polygon
  const getStyle = (feature) => ({
    fillColor: hoveredDistrict === feature.properties.DISTRICT ? '#ff7800' : '#87CEEB',
    weight: hoveredDistrict === feature.properties.DISTRICT ? 4 : 2,
    opacity: 1,
    color: '#333',
    fillOpacity: 0.7,
    outline: 'none' // Remove the rectangle on click
  });

  // Handle mouseover for district hover
  const handleMouseOver = (e, feature) => {
    setHoveredDistrict(feature.properties.DISTRICT);
    e.target.bindTooltip(`<strong>${feature.properties.DISTRICT}</strong>`, {
        className: 'district-tooltip',
        opacity: 1,
    }).openTooltip();
  };

  // Handle mouseout to reset the district style
  const handleMouseOut = (e) => {
    setHoveredDistrict(null);
    e.target.closeTooltip();
  };

  // Handle district click to show info panel and set clicked district
  const handleOnClick = (districtName) => {
    setClickedDistrict(districtName); // Set the clicked district
  };

  // Initial content for the panel
  const initialPanelContent = (
    <div className="panel-content">
      <h2>Welcome to Kerala</h2>
      <p>Explore the beauty of Kerala, known for its lush landscapes, backwaters, and diverse culture.</p>
      <h3>Districts of Kerala</h3>
      <ul className="district-list">
        {districtData.features.map((feature) => (
          <li key={feature.properties.DISTRICT}>{feature.properties.DISTRICT}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="map-container">
      <MapContainer 
        bounds={keralaBounds} 
        style={{ height: '100vh', width: '75vw', position: 'relative', float: 'left' }} // Adjust to fit the viewport and leave space for the panel
        zoom={1}
        zoomControl={true}
        dragging={true}
        scrollWheelZoom={false}
      >
        <GeoJSON 
          data={districtData} 
          style={getStyle}
          onEachFeature={(feature, layer) => {
            layer.on({
              mouseover: (e) => handleMouseOver(e, feature),
              mouseout: (e) => handleMouseOut(e, feature),
              click: () => handleOnClick(feature.properties.DISTRICT)
            });
          }}
        />
      </MapContainer>

      <div className="district-info-panel">
        {clickedDistrict ? (
          <div className="district-info">
            <h2>{clickedDistrict}</h2>
            <p>Explore popular attractions and more about {clickedDistrict}...</p>
            <button className="explore-button" onClick={() => navigate(`/district/${clickedDistrict}`)}>Explore More</button>
          </div>
        ) : (
          initialPanelContent
        )}
      </div>
    </div>
  );
};

export default MapPage;
