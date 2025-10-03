import React, { useState, useRef } from 'react'
import MapView from './components/MapView'
import QuestList from './components/QuestList'
import sampleQuests from './data/sampleQuests'

export default function App(){
  const [quests] = useState(sampleQuests)
  const [selected, setSelected] = useState(null)

  const mapRef = useRef(null)

  return (
    <div className="app">
      <header className="header">
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div>
            <h1 style={{margin:0}}>Heritage Explorer</h1>
            <div className="small muted">Weekly quests around Hong Kong</div>
          </div>
          <div>
            <button className="btn-primary">Start</button>
          </div>
        </div>
      </header>
      <main className="main">
        <aside className="sidebar">
          <h2>Weekly Quests</h2>
          <QuestList quests={quests} onSelect={(q)=>{setSelected(q); if(mapRef.current) mapRef.current.flyToQuest(q)}} />
        </aside>
        <section className="map">
          <MapView ref={mapRef} quests={quests} selected={selected} onSelect={(q)=>setSelected(q)} />
        </section>
      </main>
    </div>
  )
}
