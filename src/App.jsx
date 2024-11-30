import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from './component/Layout';
import { useState } from 'react';
import Patient from './pages/Patient'
import PatientDetails from './pages/Patientdetails';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import Staff from './pages/Staff';
import Staffdetails from './pages/Staffdetails';
import AppointmentDetails from './pages/AppointmentDetails';
import AuthPage from './pages/AuthPage';
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/auth" />;
    }
    return <Layout setIsAuthenticated={setIsAuthenticated}>{children}</Layout>;
  };

  return (
    <Router>
      <Routes>
        {/* Auth Route */}
        <Route 
          path="/auth" 
          element={
            isAuthenticated ? 
            <Navigate to="/" /> : 
            <AuthPage setIsAuthenticated={setIsAuthenticated} />
          } 
        />

        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Patient />
          </ProtectedRoute>
        } />
        <Route path="/patient-details" element={
          <ProtectedRoute>
            <PatientDetails />
          </ProtectedRoute>
        } />
        <Route path="/analytics" element={
          <ProtectedRoute>
            <AnalyticsDashboard />
          </ProtectedRoute>
        } />
        <Route path="/staff" element={
          <ProtectedRoute>
            <Staff />
          </ProtectedRoute>
        } />
        <Route path="/staff-details" element={
          <ProtectedRoute>
            <Staffdetails />
          </ProtectedRoute>
        } />
        <Route path="/appointment-details" element={
          <ProtectedRoute>
            <AppointmentDetails />
          </ProtectedRoute>
        } />

        {/* Redirect all unknown routes to auth */}
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </Router>
  )
}

export default App
