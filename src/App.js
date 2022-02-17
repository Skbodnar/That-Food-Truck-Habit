import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./App.css";
// import { Icon } from "leaflet";
import data from "./data/data.json";

//---------------------------------Checking to see if data is coming in
// console.log(data);

function App() {
  // Managing state for Trucks onClick
  const [activeTruck, setActiveTruck] = useState(null);

  return (
    <div className="App">
      <MapContainer
        className="leaflet-container"
        //  Starting point when page renders
        center={[37.77949545478787, -122.41927388849264]}
        zoom={12}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* TO GET THE MAKERS: Map over the data and give the marker a unique key as well as the coordinates of the food truck  */}
        {data.trucks.map((truck) => (
          <Marker
            key={truck.id}
            position={truck.coordinates}
            eventHandlers={{
              click: () => {
                setActiveTruck(truck);
                console.log("onClick works");
              },
            }}

            // onClick={() => {
            //   // updating state
            //   setActiveTruck(truck);
            //   console.log("onClick works!")
            // }}
          ></Marker>
        ))}
        {console.log("this is activeT", activeTruck)}
        {activeTruck && (
          <Popup
            position={activeTruck.coordinates}

            onClose={() => {
              setActiveTruck(null);
            }}
          >
            <div>
              <h2>{activeTruck.name}</h2>
              <p>{activeTruck.description}</p>
              <p>{activeTruck.address}</p>
              <p>{activeTruck.website}</p>
            </div>
          </Popup>
        )}
      </MapContainer>
    </div>
  );
}

export default App;
