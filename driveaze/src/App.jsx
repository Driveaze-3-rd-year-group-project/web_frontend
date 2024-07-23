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
import VehicleHistory from './components/userpage/Supervisor/VehicleHistory';
import CustomerDashboard from "./components/userpage/Customer/CustomerDashboard";

import ReceptionistDashboard from "./components/userpage/Receptionist/ReceptionistDashboard";
import JobManagement from "./components/userpage/Receptionist/JobManagement";
import VehicleManagement from "./components/userpage/Receptionist/VehicleManagement";
import BookingManagement from "./components/userpage/Receptionist/BookingManagement";
import Billing from "./components/userpage/Receptionist/Billing";
import EditVehicle from "./components/userpage/Receptionist/EditVehicle";
import JobDetails from "./components/userpage/Receptionist/JobDetails";
import JobCreate from "./components/userpage/Receptionist/JobCreate";
import RepairVehicles from "./components/userpage/Supervisor/ReapairVehicles";
import CustomerAccounts from "./components/userpage/Admin/CustomerAccounts";
import AddVehicle from "./components/userpage/Receptionist/AddVehicle";
import CreateBill from "./components/userpage/Receptionist/CreateBill";
import ViewBill from "./components/userpage/Receptionist/ViewBill";
import CustomerPayments from "./components/userpage/Receptionist/CustomerPayments";
import MakePayments from "./components/userpage/Receptionist/MakePayments";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Myvehicles from "./components/userpage/Customer/Myvehicles";
import VehicleInfo from "./components/userpage/Customer/Vehicleinfo";
import ServiceHistory from "./components/userpage/Customer/Servicehistory";
import Upcomingservices from "./components/userpage/Customer/upcomingservices";
import NewService from "./components/userpage/Customer/newservice";
import Billings from "./components/userpage/Customer/Billings";
import Billinfo from "./components/userpage/Customer/Billinfo";
import UpdateEmployee from "./components/userpage/Admin/UpdateEmployee";
import RegisterEmployee from "./components/userpage/Admin/RegisterEmployee";
import CustomerAccountDetails from "./components/userpage/Admin/CustomerAccountDetails";


function App() {
  return (
    <BrowserRouter>
      <div
        className={`content ${
          !UserService.isAuthenticated() ? "w-full" : "w-full"
        }`}
      >
        <div>
          <Navbar />
        </div>
      </div>
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
                <Route path="*" element={<Navigate to="/" />} />
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
                  <Route path="/customeraccounts" element={<CustomerAccounts />} />
                  <Route path="/update-user/:userId" element={<UpdateEmployee />} />
                  <Route path="/register-employee" element={<RegisterEmployee />} />
                  <Route path="/customer-details/:userId" element={<CustomerAccountDetails />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </>
              )}
              {!UserService.isCustomer() ? (
                <>
                  <Route path="/profile" element={<Navigate to="/" />} />
                </>
              ) : (
                <>
                  <Route path="/dashboard" element={<CustomerDashboard />} />
                  <Route path="/myvehicles" element={<Myvehicles/>} />
                  <Route path="/vehicleinfo" element={<VehicleInfo/>} />
                  <Route path="/billings" element={<Billings/>} />
                  <Route path="/newservice" element={<NewService/>} />
                  <Route path="/billinfo" element={<Billinfo/>} />
                  <Route path="/servicehistory" element={<ServiceHistory/>} />
                  <Route path="/upcomingservices" element={<Upcomingservices/>} />
                  <Route path="/admin/user-management" element={<Navigate to="/profile" />} />
                  <Route path="/update-user/:userId" element={<Navigate to="/profile" />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </>
              )}
              {!UserService.isSupervisor() ? (
                <>
                  <Route path="/repairvehicles" element={<Navigate to="/" />} />
                </>
              ) : (
                <>
                  <Route path="/dashboard" element={<SupervisorDashboard />} />
                  <Route path="/admin/user-management" element={<Navigate to="/profile" />} />
                  <Route path="/update-user/:userId" element={<Navigate to="/profile" />} />
                  <Route path="/repairvehicles" element={<RepairVehicles />} />
                  <Route path="/vehiclehistory" element={<VehicleHistory />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </>
              )}
              {!UserService.isReceptionist() ? (
                <>
                  <Route path="/jobmanagement" element={<Navigate to="/dashboard" />} />
                  <Route path="/vehiclemanagement" element={<Navigate to="/dashboard" />} />
                  <Route path="/bookingmanagement" element={<Navigate to="/dashboard" />} />
                  <Route path="/billing" element={<Navigate to="/dashboard" />} />
                  <Route path="/payments" element={<Navigate to="/dashboard" />} />
                </>
              ) : (
                <>
                  <Route path="/dashboard" element={<ReceptionistDashboard />}/>
                  <Route path="/jobmanagement" element={<JobManagement />} />
                  <Route path="/jobmanagement/createnewjob" element={<JobCreate />} />
                  <Route path="/jobmanagement/details" element={<JobDetails />} />
                  <Route path="/vehiclemanagement"  element={<VehicleManagement />} />
                  <Route path="/vehiclemanagement/addvehicle" element={<AddVehicle />} />
                  <Route path="/vehiclemanagement/edit" element={<EditVehicle />} />
                  <Route path="/bookingmanagement" element={<BookingManagement />} />
                  <Route path="/billing" element={<Billing />} />
                  <Route path="/billing/createbill" element={<CreateBill />} />
                  <Route path="/billing/viewbill" element={<ViewBill />} />
                  <Route path="/customerpayments" element={<CustomerPayments />} />
                  <Route path="/customerpayments/editbill" element={<ViewBill />} />
                  <Route path="/customerpayments/payment" element={<MakePayments />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </>
              )}
            </Route>
          </Routes>
        </div>
      </div>
      <div
        className={`content ${
          !UserService.isAuthenticated() ? "w-full" : "w-full"
        }`}
      >
        <div>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
