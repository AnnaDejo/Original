import { MapContainer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; 
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import districtData from './geojson/district.json';
import tourismData from './tourismData'; // Import your tourism data
import './MapPage.css'; // Import CSS file for styles

const MapPage = () => {
  const [hoveredDistrict, setHoveredDistrict] = useState(null);
  const [clickedDistrict, setClickedDistrict] = useState("Kasaragod"); // Set initial clicked district to Kasargod
  const navigate = useNavigate();  

  const keralaBounds = [
    [7.996, 74.851], 
    [12.925, 77.614]
  ];

  const getStyle = (feature) => ({
    fillColor: hoveredDistrict === feature.properties.DISTRICT ? '#ff7800' : 
               clickedDistrict === feature.properties.DISTRICT ? '#ffcc00' : '#87CEEB',
    weight: 2,
    opacity: 1,
    color: '#333',
    fillOpacity: 0.7,
    outline: 'none'
  });

  const handleMouseOver = (e, feature) => {
    setHoveredDistrict(feature.properties.DISTRICT);
    e.target.bindTooltip(`<strong>${feature.properties.DISTRICT}</strong>`, {
      className: 'district-tooltip',
      opacity: 1,
    }).openTooltip();
  };

  const handleMouseOut = (e) => {
    setHoveredDistrict(null);
    e.target.closeTooltip();
  };

  const handleOnClick = (districtName) => {
    setClickedDistrict(districtName); 
  };

  return (
    <div className="map-container">
      <div className="flex-container">
        <MapContainer 
          bounds={keralaBounds} 
          style={{ height: '100vh', width: '85vw' }} // Increased width to 85% of the viewport
          zoom={1}  
          dragging={false}  // Disable dragging
          scrollWheelZoom={false}  // Disable scroll zoom
          doubleClickZoom={false}  // Disable double-click zoom
          boxZoom={false}  // Disable box zoom
          keyboard={false}  // Disable keyboard controls
          attributionControl={false}
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
          {clickedDistrict && (
            <div className="card">
              <img src={tourismData[clickedDistrict].image} className="card-img-top" alt={clickedDistrict} />
              <h5 className="card-title">{clickedDistrict}</h5>
              <p className="card-text">{tourismData[clickedDistrict].description}</p>
              <button className="btn btn-primary" onClick={() => navigate(`/district/${clickedDistrict}`)}>
                Explore More
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default MapPage;
