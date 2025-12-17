import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function PatientForm({ addPatient }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "Male",
    phone: "",
    notes: ""
  });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.firstName || !form.phone) {
      alert("Please enter name and phone");
      return;
    }
    const patient = {
      id: uuidv4(),
      ...form,
      createdAt: new Date().toISOString()
    };
    addPatient(patient);
    setForm({ firstName: "", lastName: "", dob: "", gender: "Male", phone: "", notes: "" });
  };

  return (
    <form onSubmit={onSubmit}>
      <input name="firstName" placeholder="First name" value={form.firstName} onChange={onChange} />
      <input name="lastName" placeholder="Last name" value={form.lastName} onChange={onChange} />
      <input name="dob" type="date" value={form.dob} onChange={onChange} />
      <select name="gender" value={form.gender} onChange={onChange}>
        <option>Male</option><option>Female</option><option>Other</option>
      </select>
      <input name="phone" placeholder="Phone" value={form.phone} onChange={onChange} />
      <textarea name="notes" placeholder="Notes" value={form.notes} onChange={onChange} />
      <div style={{display:"flex", gap:8}}>
        <button type="submit">Add Patient</button>
        <button type="button" className="secondary" onClick={() => setForm({ firstName: "", lastName: "", dob: "", gender: "Male", phone: "", notes: "" })}>Clear</button>
      </div>
    </form>
  );
}