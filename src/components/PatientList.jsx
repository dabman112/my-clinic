import React, { useState } from "react";

export default function PatientList({ patients, updatePatient, deletePatient }) {
  const [query, setQuery] = useState("");

  const filtered = patients.filter(p => {
    const full = `${p.firstName} ${p.lastName}`.toLowerCase();
    return full.includes(query.toLowerCase()) || (p.phone || "").includes(query);
  });

  return (
    <div>
      <input placeholder="Search by name or phone" value={query} onChange={(e)=>setQuery(e.target.value)} />
      {filtered.length === 0 ? <div className="small">No patients</div> :
        filtered.map(p => (
        <div className="list-item" key={p.id}>
          <div>
            <div style={{fontWeight:600}}>{p.firstName} {p.lastName}</div>
            <div className="small">{p.phone} • {p.gender}</div>
          </div>
          <div className="btns">
            <button className="secondary" onClick={()=>{
              const newNotes = prompt("Update notes", p.notes || "");
              if (newNotes !== null) updatePatient({...p, notes:newNotes});
            }}>Edit</button>
            <button onClick={()=> {
              if (confirm("Delete patient? This also removes their appointments.")) deletePatient(p.id);
            }}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
