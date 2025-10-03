import React from 'react'

function QuestCard({q, onSelect}){
  return (
    <article className="quest-card" onClick={()=>onSelect(q)}>
      <div className="thumb" aria-hidden>
        <span className="thumb-placeholder">{q.area.split(' ')[0]}</span>
      </div>
      <div className="meta">
        <div className="meta-top">
          <h3 className="title">{q.title}</h3>
          <div className="badge">{q.distance} km</div>
        </div>
        <p className="small muted">{q.area} • {q.short}</p>
        <div className="actions">
          <button className="btn-outline">Details</button>
          <button className="btn-primary" onClick={(e)=>{ e.stopPropagation(); onSelect(q) }}>Start</button>
        </div>
      </div>
    </article>
  )
}

export default function QuestList({quests, onSelect}){
  return (
    <div className="quest-list">
      {quests.map(q=> (
        <QuestCard key={q.id} q={q} onSelect={onSelect} />
      ))}
    </div>
  )

}

