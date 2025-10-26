import * as React from "react";
// import { useState } from 'react'
import "./styles.css";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'

import MapComponent from "./MapComponent";
import { options, data } from "./LineChart";
import { LineChart } from "./LineChart";

import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import "react-reflex/styles.css";

export default function App() {
  const [selected, setSelected] = React.useState([]);

  const position = [51.505, -0.09]

  function LocationMarker() {
    const [position, setPosition] = React.useState(null);
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })

    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }

  const handleMarkerClick = React.useCallback((id) => {
    setSelected((prev) => Array.from(new Set([...prev, id])));
  }, []);

  return (
    <div className="App">
      {/* <ReflexContainer orientation="vertical">
        <ReflexElement className="left-pane" propagateDimensions={true}>
          <MapComponent onMarkerClick={handleMarkerClick} selected={selected} />
        </ReflexElement>

        <ReflexSplitter />

        <ReflexElement className="right-pane" minSize="10" maxSize="800">
          <ul>
            {selected.map((id) => (
              <li key={id}>{id} selected</li>
            ))}
          </ul>
          <button onClick={() => setSelected([])}>reset</button>
        </ReflexElement>
      </ReflexContainer> */}
      <header>
        <h1>Atmos Jones Lab Clone</h1>
        <nav>

        </nav>
      </header>
      <section className="hero">
        <h2>Urban Tree Ecophysiology Network</h2>
        <p>
          We are collecting data from a sugar maple (Acer saccharum) located on Georgetown's campus in Washington, D.C.
          This tree is part of the Urban Trees Ecophysiology Network (UTEN), a network of researchers aiming to understand the
          urban trees response to climate change.
          The data is collected using a variety of sensors.
        </p>

      </section>
      <h2 className="section-title">Map of Data Locations</h2>
      <div id="map">
        <MapContainer center={{ lat: 51.505, lng: -0.09 }} zoom={15}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
        </MapContainer>
        <LineChart options={options} data={data} />
      </div>
      <section className="carousel-section">
        <div className="carousel">
          <button className="carousel-btn prev">‹</button>

          <div className="carousel-track-container">
            <ul className="carousel-track" >
              
            </ul>
          </div>

          <button className="carousel-btn next">›</button>
        </div>
      </section>
    </div>
  );
}
