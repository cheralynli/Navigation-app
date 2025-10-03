import React, { forwardRef, useImperativeHandle } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix default icon paths for leaflet in Vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

function MapHelper({quests, selected}){
  const map = useMap()
  // center on HK by default
  map.setView([22.3193, 114.1694], 12)
  return null
}

const MapView = forwardRef(({quests, selected, onSelect}, ref)=>{
  const flyToQuest = (q) => {
    if(!q) return
    // use map instance by creating a temporary map component
    // We'll store the map instance via a ref approach in a real app. For brevity, use a hacky global.
    const mapEl = document.querySelector('.leaflet-container')
    if(mapEl && mapEl._leaflet_map) {
      mapEl._leaflet_map.flyTo([q.lat, q.lng], 16)
    }
  }

  useImperativeHandle(ref, ()=>({
    flyToQuest
  }))

  return (
    <div style={{height:'100%', width:'100%'}}>
      <MapContainer center={[22.3193, 114.1694]} zoom={12} style={{height:'100%', width:'100%'}} whenCreated={(map)=>{ const el = map.getContainer(); el._leaflet_map = map }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapHelper quests={quests} selected={selected} />
        {quests.map(q=> (
          <Marker key={q.id} position={[q.lat, q.lng]} eventHandlers={{click:()=>onSelect(q)}}>
            <Popup>
              <strong>{q.title}</strong><br />
              {q.short}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Floating info card */}
      {selected && (
        <div className="floating-card" role="region" aria-live="polite">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>
              <strong style={{display:'block'}}>{selected.title}</strong>
              <div className="small muted">{selected.area} • {selected.distance} km</div>
            </div>
            <div>
              <button className="btn-outline" style={{marginRight:8}}>Directions</button>
              <button className="btn-primary" onClick={()=>onSelect(selected)}>Start</button>
            </div>
          </div>
        </div>
      )}

      <button className="fab" title="Locate me">Start</button>
    </div>
  )
})

export default MapView
