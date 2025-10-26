import * as React from "react";
import Leaflet from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import { MapRef } from "./MapRef";

import "leaflet/dist/leaflet.css";

Leaflet.Icon.Default.imagePath =
  "//cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/";

function MapComponent({ dimensions, onMarkerClick, selected }) {
  const style = {
    height: "100%",
    width: "100%"
  };

  return (
    <div style={style}>
      <MapContainer center={[51.505, -0.09]} zoom={5}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <MapRef
          width={dimensions.width}
          height={dimensions.height}
          onMarkerClick={onMarkerClick}
          selected={selected}
        />
      </MapContainer>
    </div>
  );
}

export default MapComponent;
