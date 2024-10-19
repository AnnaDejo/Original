import { MapContainer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; 
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import districtData from './geojson/district.json';
import L from 'leaflet'; // Import leaflet for layer manipulation
import './MapPage.css'; // Import CSS file for styles

const MapPage = () => {
  const [hoveredDistrict, setHoveredDistrict] = useState(null);
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
    dashArray: hoveredDistrict === feature.properties.DISTRICT ? '5' : '0', // Dashed border on hover
});

  // Handle mouseover for district hover
  const handleMouseOver = (e, feature) => {
    setHoveredDistrict(feature.properties.DISTRICT);
    e.target.setStyle(getStyle(feature));
    e.target.bindTooltip(`<strong>${feature.properties.DISTRICT}</strong><br>Popular attractions...`, {
        className: 'district-tooltip enlarged-tooltip',
        permanent: true,
        opacity: 1,
    }).openTooltip();
};;

  // Handle mouseout to reset the district style
  const handleMouseOut = (e, feature) => {
    setHoveredDistrict(null);
    e.target.setStyle(getStyle(feature)); // Reset style
  };

  // Handle district click to navigate to another page
  const handleOnClick = (districtName) => {
    navigate(`/district/${districtName}`);
  };

  // Add district name labels
  const addDistrictLabels = (map) => {
    districtData.features.forEach((feature) => {
      const districtName = feature.properties.DISTRICT;
      const centroid = L.geoJson(feature).getBounds().getCenter(); // Get the centroid of the district

      // Create a marker for the district name
      const label = L.divIcon({
        className: 'district-label',
        html: `<span class="district-name">${districtName}</span>`,
        iconSize: [100, 20], // Set size for the label
      });

      // Add the label to the map
      L.marker(centroid, { icon: label }).addTo(map);
    });
  };

  return (
    <MapContainer 
      bounds={keralaBounds} 
      style={{ height: '150vh', width: '100%', position: 'absolute', left: 0 }} 
      zoom={1}
      zoomControl={true}
      dragging={true}
      scrollWheelZoom={false}
    >
      {/* Use the map instance from useMap hook */}
      <AddDistrictLabels />

      {/* Display the districts with interactivity */}
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
  );

  function AddDistrictLabels() {
    const map = useMap(); // Get the map instance

    useEffect(() => {
      addDistrictLabels(map); // Add labels to the map
    }, [map]); // Run only once when map instance is available
  }
};

export default MapPage;
