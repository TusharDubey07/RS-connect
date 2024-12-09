// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { Layout } from './component/Layout';
// import { useState } from 'react';
// import Patient from './pages/Patient'
// import PatientDetails from './pages/Patientdetails';
// import AnalyticsDashboard from './pages/AnalyticsDashboard';
// import Staff from './pages/Staff';
// import Staffdetails from './pages/Staffdetails';
// import AppointmentDetails from './pages/AppointmentDetails';
// import AuthPage from './pages/AuthPage';
// import useAuthStore from './stores/authStore';
// import './App.css'

// function App() {
//   const { isAuthenticated } = useAuthStore();
  
//   const ProtectedRoute = ({ children }) => {
//     if (!isAuthenticated) {
//       return <Navigate to="/auth" />;
//     }
//     return <Layout>{children}</Layout>;
//   };

//   return (
//     <Router>
//       <Routes>
//         {/* Auth Route */}
//         <Route 
//           path="/auth" 
//           element={
//             isAuthenticated ? 
//             <Navigate to="/" /> : 
//             <AuthPage />
//           } 
//         />

//         {/* Protected Routes */}
//         <Route path="/" element={
//           <ProtectedRoute>
//             <Patient />
//           </ProtectedRoute>
//         } />
//         <Route path="/patient-details" element={
//           <ProtectedRoute>
//             <PatientDetails />
//           </ProtectedRoute>
//         } />
//         <Route path="/analytics" element={
//           <ProtectedRoute>
//             <AnalyticsDashboard />
//           </ProtectedRoute>
//         } />
//         <Route path="/staff" element={
//           <ProtectedRoute>
//             <Staff />
//           </ProtectedRoute>
//         } />
//         <Route path="/staff-details" element={
//           <ProtectedRoute>
//             <Staffdetails />
//           </ProtectedRoute>
//         } />
//         <Route path="/appointment-details" element={
//           <ProtectedRoute>
//             <AppointmentDetails />
//           </ProtectedRoute>
//         } />

//         {/* Redirect all unknown routes to auth */}
//         <Route path="*" element={<Navigate to="/auth" />} />
//       </Routes>
//     </Router>
//   )
// }

// export default App

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
import useAuthStore from './stores/authStore';
import './App.css'
import { withLoader } from "./component/Layout";


const WrappedPatient = withLoader(Patient);
const WrappedPatientDetails = withLoader(PatientDetails);
const WrappedAnalyticsDashboard = withLoader(AnalyticsDashboard);
const WrappedStaff = withLoader(Staff);
const WrappedStaffDetails = withLoader(Staffdetails);
const WrappedAppointmentDetails = withLoader(AppointmentDetails);


function App() {
  const { isAuthenticated } = useAuthStore();
  
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/auth" />;
    }
    return <Layout>{children}</Layout>;
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
            <AuthPage />
          } 
        />

        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <WrappedPatient />
          </ProtectedRoute>
        } />
        <Route path="/patient-details" element={
          <ProtectedRoute>
            <WrappedPatientDetails />
          </ProtectedRoute>
        } />
        <Route path="/analytics" element={
          <ProtectedRoute>
            <WrappedAnalyticsDashboard />
          </ProtectedRoute>
        } />
        <Route path="/staff" element={
          <ProtectedRoute>
            <WrappedStaff />
          </ProtectedRoute>
        } />
        <Route path="/staff-details" element={
          <ProtectedRoute>
            <WrappedStaffDetails />
          </ProtectedRoute>
        } />
        <Route path="/appointment-details" element={
          <ProtectedRoute>
            <WrappedAppointmentDetails />
          </ProtectedRoute>
        } />

        {/* Redirect all unknown routes to auth */}
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </Router>
  )
}

export default App
