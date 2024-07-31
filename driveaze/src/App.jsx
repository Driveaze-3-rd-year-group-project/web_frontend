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
import UpdateRepairs from './components/userpage/Supervisor/UpdateRepairs.jsx';
import CustomerDashboard from "./components/userpage/Customer/CustomerDashboard";
import CompletedJobs from "./components/userpage/Supervisor/CompletedJobs";
import CompletedRepairs from "./components/userpage/Supervisor/CompletedRepairs.jsx";
import AddTechnicians from "./components/userpage/Supervisor/AddTechnicians.jsx";
import VehicleHistory from "./components/userpage/Supervisor/VehicleHistory.jsx";
import ViewHistory from "./components/userpage/Supervisor/ViewHistory.jsx";
import InventoryManagement from "./components/userpage/Supervisor/InventoryManagement.jsx";
import OngoingJobs from "./components/userpage/Admin/OngoingJobs.jsx";

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
import SupplierPayments from "./components/userpage/Receptionist/SupplierPayments";
import AddSupplier from "./components/userpage/Receptionist/AddSupplier";
import ManageSupplier from "./components/userpage/Receptionist/ManageSupplier";


import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Myvehicles from "./components/userpage/Customer/Myvehicles";
import VehicleInfo from "./components/userpage/Customer/Vehicleinfo";
import ServiceHistory from "./components/userpage/Customer/Servicehistory";
import Billings from "./components/userpage/Customer/Billings";
import Billinfo from "./components/userpage/Customer/Billinfo";

import UpdateEmployee from "./components/userpage/Admin/UpdateEmployee";


import OngoingJob from "./components/userpage/Admin/OngoingJob";
import RegisteredVehicle from "./components/userpage/Admin/RegisteredVehicle";
import CustomerComplaints from "./components/userpage/Admin/CustomerComplaints";
import SiteAnnouncements from "./components/userpage/Admin/SiteAnnouncements";
import ViewOngoingjob from "./components/userpage/Admin/ViewOngoingjob";
import CustomerReports from "./components/userpage/Admin/CustomerReports";

import RegisterEmployee from "./components/userpage/Admin/RegisterEmployee";
import CustomerAccountDetails from "./components/userpage/Admin/CustomerAccountDetails";
import ServiceBookings from "./components/userpage/Customer/ServiceBookings.jsx";
import BookNewService from "./components/userpage/Customer/BookNewService.jsx";
import AddSupplierBill from "./components/userpage/Receptionist/AddSupplierbill.jsx";
import OngoingRepairs from "./components/userpage/Customer/OngoingRepairs.jsx"
import RepairDetails from "./components/userpage/Customer/RepairDetails.jsx"
import ForgetPassword from "./components/auth/ForgetPassword.jsx";
import ReportsAnalytics from "./components/userpage/Admin/ReportsAnalytics.jsx";
import ViewOngoingjobs from "./components/userpage/Admin/ViewOngoingJobs.jsx";




function App() {
  const userRoleRedirect = () => {
    if (UserService.isAdmin()) return "/dashboard";
    if (UserService.isCustomer()) return "/dashboard";
    if (UserService.isSupervisor()) return "/dashboard";
    if (UserService.isReceptionist()) return "/dashboard";
    return "/";
  };
  
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
                <Route path="/forgetpassword" element={<ForgetPassword />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            )}

            {UserService.isAuthenticated() && (
              <Route path="/" element={<Navigate to={userRoleRedirect()} />} />
            )}

            <Route element={<ProtectedRoute />}>
              <Route path="/login" element={<Navigate to={userRoleRedirect()} />} />
              <Route path="/register" element={<Navigate to={userRoleRedirect()} />} />

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
                  <Route path="/ongoingjobs" element={<OngoingJob />} />
                  <Route path="/registeredvehicles" element={<RegisteredVehicle />} />
                  <Route path="/customercomplaints" element={<CustomerComplaints />} />
                  <Route path="/siteannouncements" element={<SiteAnnouncements />} />
                  <Route path="/viewongoingjob" element={<ViewOngoingjob />} />
                  <Route path="/CustomerReports" element={<CustomerReports />} />
                  <Route path="/register-employee" element={<RegisterEmployee />} />
                  <Route path="/customer-details/:userId" element={<CustomerAccountDetails />} />
                  <Route path="/reports" element={<ReportsAnalytics />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                  <Route path="/viewongoingjobs/:numberPlate" element={<ViewOngoingjobs/>} />
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
                  <Route path="/billinfo" element={<Billinfo/>} />
                  <Route path="/servicehistory" element={<ServiceHistory/>} />
                  <Route path="/booknewservice" element={<BookNewService/>} />
                  <Route path="/servicebookings" element={<ServiceBookings/>} />
                  <Route path="/admin/user-management" element={<Navigate to="/profile" />} />
                  <Route path="/update-user/:userId" element={<Navigate to="/profile" />} />
                  <Route path="/ongoingrepairs" element={<OngoingRepairs/>} />
                  <Route path="/ongoingrepairs/repairdetails/:numberPlate" element={<RepairDetails/>} />
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
                  <Route path="/updaterepairs/:numberPlate" element={<UpdateRepairs />} /> 
                  <Route path="/completedjobs" element={<CompletedJobs />} />
                  <Route path="/completedrepairs/:numberPlate" element={<CompletedRepairs />} />
                  <Route path="/addtechnicians" element={<AddTechnicians />} />
                  <Route path="/vehiclehistory" element={<VehicleHistory />} />
                  <Route path="/vehiclehistory/viewhistory/:vehicleNumber" element={<ViewHistory />} />
                  <Route path="/inventorymanagement" element={<InventoryManagement />} />
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
                  <Route path="/createnewjob" element={<JobCreate />} />
                  <Route path="/jobdetails" element={<JobDetails />} />
                  <Route path="/vehiclemanagement"  element={<VehicleManagement />} />
                  <Route path="/addvehicle" element={<AddVehicle />} />
                  <Route path="/editvehicle" element={<EditVehicle />} />
                  <Route path="/bookingmanagement" element={<BookingManagement />} />
                  <Route path="/billing" element={<Billing />} />
                  <Route path="/createbill" element={<CreateBill />} />
                  <Route path="/viewbill" element={<ViewBill />} />
                  <Route path="/customerpayments" element={<CustomerPayments />} />
                  <Route path="/editbill" element={<ViewBill />} />
                  <Route path="/payment" element={<MakePayments />} />
                  <Route path="/supplierpayments" element={<SupplierPayments />} />
                  <Route path="/addsupplier" element={<AddSupplier />} />
                  <Route path="/managesupplier" element={<ManageSupplier />} />
                  <Route path="/addsupplierbill" element={<AddSupplierBill />} />  
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
