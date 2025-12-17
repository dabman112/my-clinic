import React from "react";

export default function Dashboard({ patients, appointments }) {
  const upcoming = appointments.filter(a => new Date(a.date) >= new Date()).length;
  return (
    <div className="summary">
      <div className="card-small">
        <div className="small">Total Patients</div>
        <div style={{fontSize:24, fontWeight:600}}>{patients.length}</div>
      </div>
      <div className="card-small">
        <div className="small">Total Appointments</div>
        <div style={{fontSize:24, fontWeight:600}}>{appointments.length}</div>
      </div>
      <div className="card-small">
        <div className="small">Upcoming</div>
        <div style={{fontSize:24, fontWeight:600}}>{upcoming}</div>
      </div>
    </div>
  );
}
