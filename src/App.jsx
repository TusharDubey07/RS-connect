import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Patient from './pages/Patient'
import PatientDetails from './pages/Patientdetails';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import Staff from './pages/Staff';
import Staffdetails from './pages/Staffdetails';
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
          <Route path='/staff-details' element={<Staffdetails/>} />
        </Routes>
      </main>
  </Router>
  )
}

export default App
