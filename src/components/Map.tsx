import { MapContainer, TileLayer } from 'react-leaflet';
import MapMarker from './MapMarker';

const Map = ({ position }: { position: [lat: number, lng: number] }) => (
  <MapContainer
    style={{
      width: '100%',
      minHeight: '66.666667%',
      zIndex: 0,
    }}
    center={position}
    zoom={16}
    scrollWheelZoom={false}
    zoomControl={false}
    attributionControl={false}
    doubleClickZoom={false}
    dragging={false}
  >
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <MapMarker position={position} />
  </MapContainer>
);
export default Map;
