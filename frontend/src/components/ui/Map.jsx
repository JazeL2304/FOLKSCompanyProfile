import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Memperbaiki isu icon default Leaflet di React
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Custom pin icon dengan warna hijau khas FOLKS (#105647)
const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

// Komponen untuk otomatis memusatkan peta saat resize
const MapResizer = () => {
  const map = useMap()
  useEffect(() => {
    setTimeout(() => map.invalidateSize(), 100)
  }, [map])
  return null
}

const Map = ({ center, zoom = 15, addressTitle, addressDesc, googleMapsUrl }) => {
  return (
    <div style={{ height: '100%', width: '100%', zIndex: 0 }}>
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={false} 
        style={{ height: '100%', width: '100%', zIndex: 1 }}
      >
        <MapResizer />
        
        {/* Menggunakan CartoDB Positron untuk tampilan bersih ala Shadcn */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        <Marker position={center} icon={customIcon}>
          <Popup>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <strong>{addressTitle}</strong><br/>
              {addressDesc}
              {googleMapsUrl && (
                <a 
                  href={googleMapsUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  style={{ display: 'inline-block', marginTop: '8px', color: '#105647', textDecoration: 'none', fontWeight: '700', fontSize: '13px' }}
                >
                  Buka di Google Maps →
                </a>
              )}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default Map
