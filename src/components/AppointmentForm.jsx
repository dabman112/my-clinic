import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function AppointmentForm({ patients, addAppointment }) {
  const [form, setForm] = useState({
    patientId: patients.length ? patients[0].id : "",
    doctor: "",
    date: "",
    time: "",
    purpose: ""
  });

  // update patientId when patients list changes
  React.useEffect(()=> {
    if (patients.length && !form.patientId) setForm(f => ({...f, patientId: patients[0].id}));
  }, [patients]);

  const onChange = (e) => setForm({...form, [e.target.name]: e.target.value});

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.patientId || !form.date || !form.time) {
      alert("Please select patient, date and time.");
      return;
    }
    const appt = {
      id: uuidv4(),
      ...form,
      status: "scheduled",
      createdAt: new Date().toISOString()
    };
    addAppointment(appt);
    setForm({ patientId: patients.length ? patients[0].id : "", doctor: "", date: "", time: "", purpose: "" });
  };

  return (
    <form onSubmit={onSubmit}>
      <select name="patientId" value={form.patientId} onChange={onChange}>
        {patients.length === 0 ? <option value="">No patients — add one first</option> :
          patients.map(p => <option key={p.id} value={p.id}>{p.firstName} {p.lastName}</option>)}
      </select>
      <input name="doctor" placeholder="Doctor name" value={form.doctor} onChange={onChange} />
      <input name="date" type="date" value={form.date} onChange={onChange} />
      <input name="time" type="time" value={form.time} onChange={onChange} />
      <input name="purpose" placeholder="Purpose" value={form.purpose} onChange={onChange} />
      <button type="submit">Book Appointment</button>
    </form>
  );
}
