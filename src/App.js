import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./App.css";
import data from "./data/data.json";
import Header from "./components/Header";


function App() {
  // Managing state for Trucks to track if "clicked" or not
  const [activeTruck, setActiveTruck] = useState(null);

  return (
    <div className="App">
      <div className="page-container">
        <MapContainer
          className="leaflet-container"
          //  Starting point when page renders
          center={[37.77949545478787, -122.41927388849264]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* TO GET THE MARKERS: Map over the data and give the marker a unique key as well as the coordinates of the food truck  */}
          {data.trucks.map((truck) => (
            <Marker
              key={truck.id}
              position={truck.coordinates}
              // handle user click and update state
              eventHandlers={{
                click: () => {
                  setActiveTruck(truck);
                },
              }}
            ></Marker>
          ))}
          {activeTruck && (
            <Popup
              position={activeTruck.coordinates}
              onClose={() => {
                setActiveTruck(null);
              }}
            >
              <div>
                <h2>
                  <b>{activeTruck.name}</b>
                </h2>
                <p>
                  <b>Food Types:</b>
                  <br />
                  {activeTruck.description}
                </p>
                <p>
                  <b>Address:</b>
                  <br />
                  {activeTruck.address}
                </p>
              </div>
            </Popup>
          )}
        </MapContainer>
        <Header />
      </div>
    </div>
  );
}

export default App;
