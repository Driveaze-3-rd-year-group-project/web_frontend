
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
import CustomerDashboard from './components/userpage/Customer/CustomerDashboard';
import VehicleInfo from './components/userpage/Customer/Vehicleinfo';
import ServiceHistory from './components/userpage/Customer/Servicehistory';
import Servicebookings from './components/userpage/Customer/Servicebookings';
import NewService from './components/userpage/Customer/newservice';
import Feedback from './components/userpage/Customer/feedback';



function App() {
  return (
    <BrowserRouter>
      <div className="App flex">        {UserService.isAuthenticated() && (
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
                  <Route path="/myvehicles" element={<Navigate to="/" />} />
                </>
              ) : (
                <>
                  <Route path="/dashboard" element={<CustomerDashboard/>} />
                  <Route path="/vehicleinfo" element={<VehicleInfo/>} /> 
                  <Route path="/servicehistory" element={<ServiceHistory/>} /> 
                  <Route path="/servicebookings" element={<Servicebookings/>} /> 
                  <Route path="/newservice" element={<NewService/>}/>
                  <Route path="/feedback" element={<Feedback/>}/>
                </>
              )}
              {!UserService.isSupervisor() ? (
                <>
                  {/* <Route path="/dashboard" element={<Navigate to="/" />} /> */}
                </>
              ) : (
                <>
                  <Route path="/dashboard" element={<SupervisorDashboard />} />
                  <Route path="/admin/user-management" element={<Navigate to="/profile" />} />
                  <Route path="/update-user/:userId" element={<Navigate to="/profile" />} />
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