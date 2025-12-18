import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function PatientForm({ addPatient }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
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
    if (!form.gender) {
      alert("Please select a gender");
      return;
    }
    const patient = {
      id: uuidv4(),
      ...form,
      createdAt: new Date().toISOString()
    };
    addPatient(patient);
    setForm({ firstName: "", lastName: "", dob: "", gender: "", phone: "", notes: "" });
  };

  return (
    <form onSubmit={onSubmit}>
      <input name="firstName" placeholder="First name" value={form.firstName} onChange={onChange} />
      <input name="lastName" placeholder="Last name" value={form.lastName} onChange={onChange} />
      <label className="small">Date of Birth</label>
<input
  type="date"
  name="dob"
  value={form.dob}
  onChange={onChange}
/>
      <label className="small">Gender</label>
<select name="gender" value={form.gender} onChange={onChange}>
  <option value="" disabled>
    Select Gender
  </option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
  <option value="Other">Other</option>
</select>
      <input name="phone" placeholder="Phone" value={form.phone} onChange={onChange} />
      <textarea name="notes" placeholder="Notes" value={form.notes} onChange={onChange} />
      <div style={{display:"flex", gap:8}}>
        <button type="submit">Add Patient</button>
        <button type="button" className="secondary" onClick={() => setForm({ firstName: "", lastName: "", dob: "", gender: "", phone: "", notes: "" })}>Clear</button>
      </div>
    </form>
  );
}
