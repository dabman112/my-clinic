import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import PatientForm from "./components/PatientForm";
import PatientList from "./components/PatientList";
import AppointmentForm from "./components/AppointmentForm";
import AppointmentList from "./components/AppointmentList";

function App() {
  const [patients, setPatients] = useState(() => {
    const p = localStorage.getItem("patients");
    return p ? JSON.parse(p) : [];
  });
  const [appointments, setAppointments] = useState(() => {
    const a = localStorage.getItem("appointments");
    return a ? JSON.parse(a) : [];
  });

  // Save patients
  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients));
  }, [patients]);

  // Save appointments
  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  const addPatient = (patient) => {
    setPatients((prev) => [patient, ...prev]);
  };
  const updatePatient = (updated) => {
    setPatients((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };
  const deletePatient = (id) => {
    setPatients((prev) => prev.filter((p) => p.id !== id));
    // also remove related appointments
    setAppointments((prev) => prev.filter((a) => a.patientId !== id));
  };

  const addAppointment = (appt) => {
    setAppointments((prev) => [appt, ...prev]);
  };
  const updateAppointment = (updated) => {
    setAppointments((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
  };
  const deleteAppointment = (id) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="container">
      <Header />
      <Dashboard patients={patients} appointments={appointments} />
      <div className="grid">
        <div className="card">
          <h2>Patients</h2>
          <PatientForm addPatient={addPatient} />
          <PatientList
            patients={patients}
            updatePatient={updatePatient}
            deletePatient={deletePatient}
          />
        </div>

        <div className="card">
          <h2>Appointments</h2>
          <AppointmentForm patients={patients} addAppointment={addAppointment} />
          <AppointmentList
            appointments={appointments}
            patients={patients}
            updateAppointment={updateAppointment}
            deleteAppointment={deleteAppointment}
          />
        </div>
      </div>
    </div>
  );
}

export default App;