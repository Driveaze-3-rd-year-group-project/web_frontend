
import React from 'react';
import Landingpage from './components/userpage/Landingpage';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './components/auth/LoginPage';
import RegistrationPage from './components/auth/RegistrationPage';
import UserService from './components/service/UserService';
import Home from './components/userpage/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/common/Sidebar';
import AdminDashboard from './components/userpage/Admin/AdminDashboard';
import StaffAccounts from './components/userpage/Admin/StaffAccounts';
import SupervisorDashboard from './components/userpage/Supervisor/SupervisorDashboard';
import RepairVehicles from './components/userpage/Supervisor/RepairVehicles';

function App() {
  return (
    <BrowserRouter>
      <div className="App flex">
        {UserService.isAuthenticated() && (
          <div className="w-72">
            <Sidebar />
          </div>
        )}
        <div className={`content ${UserService.isAuthenticated() ? 'w-3/4' : 'w-full'}`}>
          <Routes>
            {!UserService.isAuthenticated() && (
              <>
                <Route path="/" element={<Landingpage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
              </>
            )}

            <Route element={<ProtectedRoute />}>
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="/register" element={<Navigate to="/" />} />

              {!UserService.isAdmin() ? (
                <>
                  <Route path="/staffaccounts" element={<Navigate to="/" />} />
                </>
              ) : (
                <>
                  <Route path="/dashboard" element={<AdminDashboard />} />
                  <Route path="/staffaccounts" element={<StaffAccounts />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </>
              )}
              {!UserService.isCustomer() ? (
                <>
                  <Route path="/profile" element={<Navigate to="/" />} />
                  <Route path="/update-user/:userId" element={<Navigate to="/profile" />} />
                </>
              ) : (
                <>
                  <Route path="/dashboard" element={<CustomerDashboard />} />
                  <Route path="/admin/user-management" element={<Navigate to="/profile" />} />
                  <Route path="/update-user/:userId" element={<Navigate to="/profile" />} />
                </>
              )}
              {!UserService.isSupervisor() ? (
                <>
                  {/* <Route path="/dashboard" element={<Navigate to="/" />} /> */}
                  
                </>
              ) : (
                <>
                  <Route path="/dashboard" element={<SupervisorDashboard />} />
                  <Route path="/repairvehicles" element={<RepairVehicles />} />
                </>
              )}
              {!UserService.isReceptionist() ? (
                <>
                  <Route path="/profile" element={<Home />} />
                  <Route path="/update-user/:userId" element={<Navigate to="/profile" />} />
                </>
              ) : (
                <>
                  <Route path="/profile" element={<Home />} />
                  <Route path="/admin/user-management" element={<Navigate to="/profile" />} />
                  <Route path="/update-user/:userId" element={<Navigate to="/profile" />} />
                </>
              )}
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;