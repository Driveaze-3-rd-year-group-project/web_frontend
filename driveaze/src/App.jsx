import React from "react";
import Landingpage from "./components/userpage/Landingpage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import RegistrationPage from "./components/auth/RegistrationPage";
import UserService from "./components/service/UserService";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/common/Sidebar";
import AdminDashboard from "./components/userpage/Admin/AdminDashboard";
import StaffAccounts from "./components/userpage/Admin/StaffAccounts";
import SupervisorDashboard from "./components/userpage/Supervisor/SupervisorDashboard";
import CustomerDashboard from "./components/userpage/Customer/CustomerDashboard";

import ReceptionistDashboard from "./components/userpage/Receptionist/ReceptionistDashboard";
import JobManagement from "./components/userpage/Receptionist/JobManagement";
import VehicleManagement from "./components/userpage/Receptionist/VehicleManagement";
import BookingManagement from "./components/userpage/Receptionist/BookingManagement";
import Payments from "./components/userpage/Receptionist/Payments";
import Billing from "./components/userpage/Receptionist/Billing";
import EditVehicle from "./components/userpage/Receptionist/EditVehicle";
import JobDetails from "./components/userpage/Receptionist/JobDetails";
import JobCreate from "./components/userpage/Receptionist/JobCreate";

function App() {
  return (
    <BrowserRouter>
      <div className="App flex">
        {UserService.isAuthenticated() && (
          <div className="w-72">
            <Sidebar />
          </div>
        )}
        <div
          className={`content ${
            UserService.isAuthenticated() ? "w-3/4" : "w-full"
          }`}
        >
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
                  <Route
                    path="/update-user/:userId"
                    element={<Navigate to="/profile" />}
                  />
                </>
              ) : (
                <>
                  <Route path="/dashboard" element={<CustomerDashboard />} />
                  <Route
                    path="/admin/user-management"
                    element={<Navigate to="/profile" />}
                  />
                  <Route
                    path="/update-user/:userId"
                    element={<Navigate to="/profile" />}
                  />
                </>
              )}
              {!UserService.isSupervisor() ? (
                <>
                  {/* <Route path="/dashboard" element={<Navigate to="/" />} /> */}
                </>
              ) : (
                <>
                  <Route path="/dashboard" element={<SupervisorDashboard />} />
                  <Route
                    path="/admin/user-management"
                    element={<Navigate to="/profile" />}
                  />
                  <Route
                    path="/update-user/:userId"
                    element={<Navigate to="/profile" />}
                  />
                </>
              )}
              {!UserService.isReceptionist() ? (
                <>
                  <Route
                    path="/jobmanagement"
                    element={<Navigate to="/dashboard" />}
                  />
                  <Route
                    path="/vehiclemanagement"
                    element={<Navigate to="/dashboard" />}
                  />
                  <Route
                    path="/bookingmanagement"
                    element={<Navigate to="/dashboard" />}
                  />
                  <Route
                    path="/billing"
                    element={<Navigate to="/dashboard" />}
                  />
                  <Route
                    path="/payments"
                    element={<Navigate to="/dashboard" />}
                  />
                </>
              ) : (
                <>
                  <Route
                    path="/dashboard"
                    element={<ReceptionistDashboard />}
                  />
                  <Route path="/jobmanagement" element={<JobManagement />} />
                  <Route path="/jobcreate" element={<JobCreate />} />
                  <Route path="/jobdetails" element={<JobDetails />} />
                  <Route
                    path="/vehiclemanagement"
                    element={<VehicleManagement />}
                  />
                  <Route path="/editvehicle" element={<EditVehicle />} />
                  <Route
                    path="/bookingmanagement"
                    element={<BookingManagement />}
                  />
                  <Route path="/billing" element={<Billing />} />
                  <Route path="/payments" element={<Payments />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
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
