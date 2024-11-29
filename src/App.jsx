import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import viteLogo from '/vite.svg'
import Patient from './pages/Patient'
import PatientDetails from './pages/Patientdetails';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import Staff from './pages/Staff';
import './App.css'

function App() {
  
  return (
    <Router>
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Patient />} />
          <Route path="/patient-details" element={<PatientDetails />} />
          <Route path='/analytics' element={<AnalyticsDashboard/>} />
          <Route path='/staff' element={<Staff/>} />
        </Routes>
      </main>
  </Router>
  )
}

export default App
