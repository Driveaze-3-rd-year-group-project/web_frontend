import React, { useContext } from 'react';
import Landingpage from "./components/userpage/Landingpage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { UserContext } from './UserContext.jsx';
import { useEffect } from 'react';

import LoginPage from "./components/auth/LoginPage";
import ForgetPassword from "./components/auth/ForgetPassword.jsx";
import RegistrationPage from "./components/auth/RegistrationPage";

import UserService from "./components/service/UserService";
import ProtectedRoute from "./components/ProtectedRoute";

import Sidebar from "./components/common/Sidebar";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

import SupervisorDashboard from "./components/userpage/Supervisor/SupervisorDashboard";
import UpdateRepairs from './components/userpage/Supervisor/UpdateRepairs.jsx';
import CompletedJobs from "./components/userpage/Supervisor/CompletedJobs";
import CompletedRepairs from "./components/userpage/Supervisor/CompletedRepairs.jsx";
import AddTechnicians from "./components/userpage/Supervisor/AddTechnicians.jsx";
import VehicleHistory from "./components/userpage/Supervisor/VehicleHistory.jsx";
import ViewHistory from "./components/userpage/Supervisor/ViewHistory.jsx";
import InventoryManagement from "./components/userpage/Supervisor/InventoryManagement.jsx";
import RepairVehicles from "./components/userpage/Supervisor/ReapairVehicles";
import SupAnnouncement from './components/userpage/Supervisor/AllAnnouncements.jsx';


import UpdateEmployee from "./components/userpage/Admin/UpdateEmployee";
import SiteAnnouncements from "./components/userpage/Admin/SiteAnnouncements";
import RegisterEmployee from "./components/userpage/Admin/RegisterEmployee";
import ReportsAnalytics from "./components/userpage/Admin/ReportsAnalytics.jsx";
import AdminDashboard from "./components/userpage/Admin/AdminDashboard";
import StaffAccounts from "./components/userpage/Admin/StaffAccounts";


import Myvehicles from "./components/userpage/Customer/Myvehicles";
import VehicleInfo from "./components/userpage/Customer/Vehicleinfo";
import ServiceHistory from "./components/userpage/Customer/Servicehistory";
import Billings from "./components/userpage/Customer/Billings";
import Billinfo from "./components/userpage/Customer/Billinfo";
import ServiceBookings from "./components/userpage/Customer/ServiceBookings.jsx";
import BookNewService from "./components/userpage/Customer/BookNewService.jsx";
import OngoingRepairs from "./components/userpage/Customer/OngoingRepairs.jsx"
import RepairDetails from "./components/userpage/Customer/RepairDetails.jsx"
import CustomerDashboard from "./components/userpage/Customer/CustomerDashboard";
import SendComplaint from "./components/userpage/Customer/SendComplaint.jsx";
import CustAnnouncement from './components/userpage/Customer/AllAnnouncements.jsx';

import ManagerDashboard from "./components/userpage/Manager/ManagerDashboard.jsx";
import MStaffAccounts from "./components/userpage/Manager/MStaffAccounts.jsx";
import CustomerAccounts from "./components/userpage/Manager/CustomerAccounts.jsx";
import MUpdateEmployee from "./components/userpage/Manager/MUpdateEmployee.jsx";
import OngoingJob from './components/userpage/Manager/OngoingJob';
import ViewOngoingjob from './components/userpage/Manager/ViewOngoingjob';
import RegisteredVehicle from './components/userpage/Manager/RegisteredVehicle';
import CustomerComplaints from './components/userpage/Manager/CustomerComplaints';
import CustomerReports from "./components/userpage/Manager/CustomerReports.jsx";
import CustomerAccountDetails from "./components/userpage/Manager/CustomerAccountDetails.jsx";
import OngoingJobs from './components/userpage/Manager/OngoingJobs';
import MRegisterEmployee from "./components/userpage/Manager/MRegisterEmployee.jsx";
import ServiceTypes from "./components/userpage/Manager/ServiceTypes.jsx";
import VehicleModelBrand from "./components/userpage/Manager/VehicleModelBrand.jsx";
import AddService from "./components/userpage/Manager/AddService.jsx";
import TechnicianCategory from './components/userpage/Manager/TechnicianCategory.jsx';
import AddTechnicianCategory from "./components/userpage/Manager/AddTechnicianCategory.jsx";


import AddSupplierBill from "./components/userpage/Receptionist/AddSupplierbill.jsx";
import AddVehicle from "./components/userpage/Receptionist/AddVehicle";
import CreateBill from "./components/userpage/Receptionist/CreateBill";
import ViewBill from "./components/userpage/Receptionist/ViewBill";
import CustomerPayments from "./components/userpage/Receptionist/CustomerPayments";
import MakePayments from "./components/userpage/Receptionist/MakePayments";
import SupplierPayments from "./components/userpage/Receptionist/SupplierPayments";
import AddSupplier from "./components/userpage/Receptionist/AddSupplier";
import ManageSupplier from "./components/userpage/Receptionist/ManageSupplier";
import ReceptionistDashboard from "./components/userpage/Receptionist/ReceptionistDashboard";
import JobManagement from "./components/userpage/Receptionist/JobManagement";
import VehicleManagement from "./components/userpage/Receptionist/VehicleManagement";
import BookingManagement from "./components/userpage/Receptionist/BookingManagement";
import Billing from "./components/userpage/Receptionist/Billing";
import EditVehicle from "./components/userpage/Receptionist/EditVehicle";
import JobDetails from "./components/userpage/Receptionist/JobDetails";
import JobCreate from "./components/userpage/Receptionist/JobCreate";
import UpdateJob from "./components/userpage/Receptionist/UpdateJob.jsx";
import RecepAnnouncement from './components/userpage/Receptionist/AllAnnouncements.jsx';

import WarehouseKeeperDashboard from "./components/userpage/WarehouseKeeper/WarehouseKeeperDashboard"
import Inventory from "./components/userpage/WarehouseKeeper/Inventory.jsx"
import UserProfile from "./components/common/UserProfile.jsx";
import TechnicianDashboard from "./components/userpage/Technician/TechnicianDashboard.jsx";
import AssignedJobs from "./components/userpage/Technician/AssignedJobs.jsx";
import PaymentPage from "./components/common/PaymentPage.jsx";
import PaymentSuccess from "./components/common/PaymentSuccess.jsx";
import PaymentCancel from "./components/common/PaymentCancel.jsx";
import OTPVerification from "./components/userpage/Customer/OTPVerificationScreen.jsx";
import AllAnnouncement from './components/userpage/WarehouseKeeper/AllAnnouncements.jsx';
import UpdateServiceType from './components/userpage/Manager/UpdateServiceType.jsx';
import TecAnnouncement from './components/userpage/Technician/AllAnnouncements.jsx';
import EditTechnicianCategory from './components/userpage/Manager/EditTechnicianCategory.jsx';
import AddVehicleBrand from './components/userpage/Manager/AddVehicleBrand.jsx';
import AddVehicleModel from './components/userpage/Manager/AddVehicleModel.jsx';
import EditVehicleModel from './components/userpage/Manager/EditVehicleModel.jsx';







function App() {
  const { userData } = useContext(UserContext); // Accessing userData from context
  const [requiresOTP, setRequiresOTP] = useState(false);

  // Update the state only when userData changes
  useEffect(() => {
    if (userData && userData.requiresOTP) {
      setRequiresOTP(true);  // Set requiresOTP state when the user requires OTP
    } else {
      setRequiresOTP(false); // Set it to false when not required
    }
  }, [userData]); // Runs whenever userData changes

  // Function to check if customer needs phone verification
  const needsPhoneVerification = () => {
    return requiresOTP;  // Simply return the state, no need to refer to userData again
  };

  // Modified userRoleRedirect to include OTP verification check
  const userRoleRedirect = () => {
    // Check if OTP verification is required
    if (needsPhoneVerification()) {
        return "/verify-phone";
  }

    // Role-based redirects after OTP verification or full authentication
    if (UserService.isCustomer()) {
        return "/dashboard";
    }

    const rolesWithDashboardAccess = [
        "Admin",
        "Manager",
        "Supervisor",
        "Receptionist",
        "WarehouseKeeper",
        "Technician"
    ];

    for (const role of rolesWithDashboardAccess) {
        if (UserService[`is${role}`]?.()) {
            return "/dashboard";
        }
    }

    // Fallback for unauthenticated users or unrecognized roles
    return "/";
  };

  // const userRoleRedirect = () => {
  //   if (UserService.isAdmin()) return "/dashboard";
  //   if (UserService.isManager()) return "/dashboard";
  //   if (UserService.isCustomer()) return "/dashboard";
  //   if (UserService.isSupervisor()) return "/dashboard";
  //   if (UserService.isReceptionist()) return "/dashboard";
  //   if (UserService.isWarehouseKeeper()) return "/dashboard";
  //   return "/";
  // };
  
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
        {/* {UserService.isAuthenticated() && (
          <div className="w-72">
            <Sidebar />
          </div>
        )}
        <div
          className={`content ${
            UserService.isAuthenticated() ? "w-3/4" : "w-full"
          }`}
        > */}

        {UserService.isAuthenticated() && !needsPhoneVerification() && (
          <div className="w-72">
            <Sidebar />
          </div>
        )}
        <div
          className={`content ${
            UserService.isAuthenticated() && !needsPhoneVerification() ? "w-3/4" : "w-full"
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

            {/* Handle Customers with Unverified Phone Numbers */}
            {needsPhoneVerification() && (
              <Route path="/verify-phone" element={<OTPVerification />} />
            )}

            {/* Redirect Authenticated Users */}
            {UserService.isAuthenticated() && (
              <Route path="/" element={<Navigate to={userRoleRedirect()} />} />
            )}

            {/* OTP Verification Route */}
            <Route 
              path="/verify-phone" 
              element={
                needsPhoneVerification() 
                  ? <OTPVerification/> 
                  : <Navigate to={userRoleRedirect()} />
              } 
            />

            {!UserService.isSuperUser() && (
              <Route path="/staffaccounts" element={<Navigate to="/" />} />
            )}

            <Route element={<ProtectedRoute />}>
              <Route path="/login" element={<Navigate to={userRoleRedirect()} />} />
              <Route path="/register" element={<Navigate to={userRoleRedirect()} />} />

              {!UserService.isAdmin() ? (
                <>
                  <Route path="/" element={<Navigate to="/" />} />
                </>
              ) : (
                <>
                  <Route path="/dashboard" element={<AdminDashboard />} />
                  <Route path="/staffaccounts" element={<StaffAccounts />} />
                  <Route path="/update-user/:userId" element={<UpdateEmployee />} />
                  <Route path="/siteannouncements" element={<SiteAnnouncements />} />
                  <Route path="/register-employee" element={<RegisterEmployee />} />
                  <Route path="/reports" element={<ReportsAnalytics />} />
                  <Route path="/userProfile" element={<UserProfile />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </>
              )}
              {!UserService.isManager() ? (
                <>
                  <Route path="/customeraccounts" element={<Navigate to="/" />} />
                </>
              ) : (
                <>
                  <Route path="/dashboard" element={<ManagerDashboard />} />
                  <Route path="/staffaccounts" element={<MStaffAccounts />} />
                  <Route path="/customeraccounts" element={<CustomerAccounts />} />
                  <Route path="/update-user/:userId" element={<MUpdateEmployee />} />
                  <Route path="/ongoingjobs" element={<OngoingJob />} />
                  <Route path="/registeredvehicles" element={<RegisteredVehicle />} />
                  <Route path="/customercomplaints" element={<CustomerComplaints />} />
                  <Route path="/siteannouncements" element={<SiteAnnouncements />} />
                  <Route path="/viewongoingjob" element={<ViewOngoingjob />} />
                  <Route path="/CustomerReports" element={<CustomerReports />} />
                  <Route path="/register-employee" element={<MRegisterEmployee />} />
                  <Route path="/customer-details/:userId" element={<CustomerAccountDetails />} />
                  <Route path="/ongoingjobs" element={<OngoingJobs />} />
                  <Route path="/userProfile" element={<UserProfile />} />
                  <Route path="/update-service-types/:serviceId" element={<UpdateServiceType />} />
                  <Route path="/servicetypes" element={<ServiceTypes />} />
                  <Route path="/addservice" element={<AddService />} />
                  <Route path="/vehiclemodelbrand" element={<VehicleModelBrand />} />
                  <Route path="/techniciancategory" element={<TechnicianCategory />} />
                  <Route path="/addtechniciancategory" element={<AddTechnicianCategory />} />
                  <Route path="/edittechniciancategory/:categoryId" element={<EditTechnicianCategory />} />
                  <Route path="/addvehiclebrand" element={<AddVehicleBrand />} />
                  <Route path="/addvehiclemodel" element={<AddVehicleModel />} />
                  <Route path="/editvehiclemodel/:modelId" element={<EditVehicleModel />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                  <Route path="/viewongoingjobs/:numberPlate" element={<ViewOngoingjob/>} />
                </>
              )}

              {/* Customer Routes */}
              {!UserService.isCustomer() ? (
                <Route path="/profile" element={<Navigate to="/" />} />
              ) : (
                <>
                  <Route 
                    path="/dashboard" 
                    element={
                      needsPhoneVerification() 
                        ? <Navigate to="/verify-phone" /> 
                        : <CustomerDashboard />
                    }
                  />
                  {/* Protect all customer routes with phone verification check */}
                  {!needsPhoneVerification() && (
                    <>
                      <Route path="/myvehicles" element={<Myvehicles/>} />
                      <Route path="/vehicleinfo" element={<VehicleInfo/>} />
                      <Route path="/billings" element={<Billings/>} />
                      <Route path="/billinfo/:billId" element={<Billinfo/>} />
                      <Route path="/servicehistory/:vehicleId" element={<ServiceHistory/>} />
                      <Route path="/booknewservice" element={<BookNewService/>} />
                      <Route path="/servicebookings" element={<ServiceBookings/>} />
                      <Route path="/ongoingrepairs" element={<OngoingRepairs/>} />
                      <Route path="/ongoingrepairs/repairdetails/:numberPlate" element={<RepairDetails/>} />
                      <Route path="/sendcomplaint" element={<SendComplaint/>}/>
                      <Route path="/userProfile" element={<UserProfile />} />
                      <Route path="/payment" element={<PaymentPage />} />
                      <Route path="/payment/success" element={<PaymentSuccess />} />
                      <Route path="/payment/cancel" element={<PaymentCancel />} />
                      <Route path="/allannouncements" element={<CustAnnouncement />} />
                    </>
                  )}
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
                  <Route path="/vehiclehistory/viewhistory/:vehicleId" element={<ViewHistory />} />
                  <Route path="/inventorymanagement" element={<InventoryManagement />} />
                  <Route path="/userProfile" element={<UserProfile />} />
                  <Route path="/allannouncements" element={<SupAnnouncement />} />
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
                  <Route path="/create-job" element={<JobCreate />} />
                  <Route path="/update-job/:jobId" element={<UpdateJob />} />
                  <Route path="/jobdetails/:jobId" element={<JobDetails />} />
                  <Route path="/vehiclemanagement"  element={<VehicleManagement />} />
                  <Route path="/addvehicle" element={<AddVehicle />} />
                  <Route path="/editvehicle/:vehicleId" element={<EditVehicle />} />
                  <Route path="/bookingmanagement" element={<BookingManagement />} />
                  <Route path="/billing" element={<Billing />} />
                  <Route path="/createbill" element={<CreateBill />} />
                  <Route path="/viewbill" element={<ViewBill />} />
                  <Route path="/customerpayments" element={<CustomerPayments />} />
                  <Route path="/editbill/:billId" element={<ViewBill />} />
                  <Route path="/billpaymentview/:billId" element={<MakePayments />} />
                  <Route path="/supplierpayments" element={<SupplierPayments />} />
                  <Route path="/addsupplier" element={<AddSupplier />} />
                  <Route path="/managesupplier" element={<ManageSupplier />} />
                  <Route path="/userProfile" element={<UserProfile />} />
                  <Route path="/addsupplierbill" element={<AddSupplierBill />} />  
                  <Route path="/allannouncements" element={<RecepAnnouncement />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </>
              )}
              {!UserService.isTechnician() ? (
                <>
                  <Route path="/profile" element={<Navigate to="/" />} />
                </>
              ) : (
                <>
                  <Route path="/dashboard" element={<TechnicianDashboard />} />
                  <Route path="/assigned-jobs" element={<AssignedJobs/>} />
                  <Route path="/userProfile" element={<UserProfile />} />
                  <Route path="/allannouncements" element={<TecAnnouncement />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </>
              )}
              {!UserService.isWarehouseKeeper() ? (
                <>
                  <Route path="/profile" element={<Navigate to="/" />} /> 
                </>
              ) : (
                <>
                  <Route path="/dashboard" element={<WarehouseKeeperDashboard />} />
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/assigned-jobs" element={<Myvehicles/>} />
                  <Route path="/userProfile" element={<UserProfile />} />
                  <Route path="/allannouncements" element={<AllAnnouncement />} />
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
