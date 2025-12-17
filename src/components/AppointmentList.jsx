import React from "react";

export default function AppointmentList({ appointments, patients, updateAppointment, deleteAppointment }) {
  const findPatient = (id) => patients.find(p => p.id === id);

  if (appointments.length === 0) return <div className="small">No appointments</div>;

  const sorted = [...appointments].sort((a,b) => new Date(b.date + " " + b.time) - new Date(a.date + " " + a.time));

  return (
    <div>
      {sorted.map(a => {
        const p = findPatient(a.patientId);
        return (
          <div className="list-item" key={a.id}>
            <div>
              <div style={{fontWeight:600}}>{p ? `${p.firstName} ${p.lastName}` : "Patient removed"}</div>
              <div className="small">{a.date} {a.time} • {a.doctor} • {a.purpose}</div>
            </div>
            <div className="btns">
              <button className="secondary" onClick={()=>{
                const newStatus = a.status === "scheduled" ? "completed" : "scheduled";
                updateAppointment({...a, status:newStatus});
              }}>{a.status === "scheduled" ? "Mark done" : "Undo"}</button>
              <button onClick={() => { if (confirm("Delete appointment?")) deleteAppointment(a.id); }}>Delete</button>
            </div>
          </div>
        )
      })}
    </div>
  );
}
