import React, { useState, useEffect } from 'react';
import UserService from '../service/UserService';
import { useLocation } from 'react-router-dom';
import { FaTrademark, FaCog, FaSignOutAlt, FaHome, FaChartLine, FaUserTie, FaUsers, FaRegFrown, FaBullhorn, FaBusinessTime, FaCarAlt, FaCalendarCheck, FaMoneyCheckAlt, FaRegClipboard, FaWarehouse, FaUserPlus, FaClipboardList, FaClipboardCheck, FaCar, FaMoneyCheck, FaWrench, FaCalendarAlt, FaCommentDots  } from "react-icons/fa";
import Swal from 'sweetalert2';
import { useMemo } from 'react';

function Sidebar() {
    const [isAuthenticated, setIsAuthenticated] = useState(UserService.isAuthenticated());
    const [isAdmin, setIsAdmin] = useState(UserService.isAdmin());
    const [isManager, setIsManager] = useState(UserService.isManager());
    const [isCustomer, setIsCustomer] = useState(UserService.isCustomer());
    const [isReceptionist, setIsReceptionist] = useState(UserService.isReceptionist());
    const [isSupervisor, setIsSupervisor] = useState(UserService.isSupervisor());
    const [isTechnician, setIsTechnician] = useState(UserService.isTechnician());
    const [isWarehouseKeeper, setIsWarehouseKeeper] = useState(UserService.isWarehouseKeeper());
    const [tabPath,setTabPath]=useState('dashboard');
    const [profileInfo, setProfileInfo] = useState({});

    useEffect(() => {
        fetchProfileInfo();
    }, []);

    const getTabStyles = useMemo(() => (path) => {
        const location = useLocation();
        const currentPath = location.pathname.split('/').pop();
        return currentPath === path
          ? 'bg-lightblue text-black'
          : 'text-white hover:bg-slate-500 hover:text-white';
      }, [location.pathname]);

    const fetchProfileInfo = async () => {
        try {

            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            const response = await UserService.getYourProfile(token);
            setProfileInfo(response.ourUsers);
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
    };

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to logout this user?!',
            // icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Logout',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                UserService.logout(); // Perform the logout
                setIsAuthenticated(false);
                setIsAdmin(false);
                setIsManager(false);
                setIsCustomer(false);
                setIsTechnician(false);
                setIsWarehouseKeeper(false);
                setIsReceptionist(false);
                setIsSupervisor(false);
                location.href = '/';
    
                // Swal.fire('Logged Out!', 'You have been logged out successfully.', 'success');
            }
        });
    } 

    //if not authenticated return null
    if (!isAuthenticated) {
        return null;
    }

    return (
        <>
            <nav
                className="fixed top-0 left-0 w-full h-full border-r bg-deepblue space-y-8 sm:w-72 z-10">
                <div className="flex flex-col h-full">
                    <div className='h-20 flex items-center px-8'>
                    <a href="/dashboard" className="flex-none">
                        <img
                            src="/assets/driveazeheader3.svg"
                            width={190}
                            className="mx-auto mt-12"
                            alt="Driveaze Header"
                        />
                    </a>
                    </div>
                    <div className="flex-1 flex flex-col h-full overflow-auto mt-10">
                        <ul className="px-4 text-lg  font-medium flex-1">
                            {isAdmin && (
                               <li>
                                    <a href="/dashboard"  className={`flex items-center gap-x-2 p-2 rounded-lg duration-150 hover:bg-lightblue hover:text-black
                                         ${getTabStyles('dashboard')}`}>
                                        <div className="absolute left-0 w-1.5 h-full rounded-r-full text-white scale-y-0 group-hover:scale-y-100 transition-transform ease-in-out" />
                                        <div className="flex-none">
                                            <FaHome />
                                        </div>
                                        <p className="flex-1">Dashboard</p>
                                    </a>
                                    <a href="/staffaccounts"  className={`flex items-center gap-x-2 p-2 rounded-lg duration-150 hover:bg-lightblue hover:text-black
                                         ${getTabStyles('staffaccounts')}`}>
                                        <div className="absolute left-0 w-1.5 h-full rounded-r-full bg-gray-600 scale-y-0 group-hover:scale-y-100 transition-transform ease-in-out" />
                                        <div className="flex-none">
                                            <FaUserTie />
                                        </div>
                                        <p className="flex-1">Staff Accounts</p>
                                    </a>
                                    <a href="/reports"  className={`flex items-center gap-x-2 p-2 rounded-lg duration-150 hover:bg-lightblue hover:text-black
                                         ${getTabStyles('reports')}`}>
                                        <div className="absolute left-0 w-1.5 h-full rounded-r-full bg-gray-600 scale-y-0 group-hover:scale-y-100 transition-transform ease-in-out" />
                                        <div className="flex-none">
                                            <FaChartLine />
                                        </div>
                                        <p className="flex-1">Reports & Analytics</p>
                                    </a>
                                    <a href="/siteannouncements"  className={`flex items-center gap-x-2 p-2 rounded-lg duration-150 hover:bg-lightblue hover:text-black
                                         ${getTabStyles('siteannouncements')}`}>
                                        <div className="absolute left-0 w-1.5 h-full rounded-r-full bg-gray-600 scale-y-0 group-hover:scale-y-100 transition-transform ease-in-out" />
                                        <div className="flex-none">
                                            <FaBullhorn />
                                        </div>
                                        <p className="flex-1">Site Announcements</p>
                                    </a>
                                </li>
                            )}
                            {isManager && (
                               <li>
                                    <a href="/dashboard"  className={`flex items-center gap-x-2 p-2 rounded-lg duration-150 hover:bg-lightblue hover:text-black
                                         ${getTabStyles('dashboard')}`}>
                                        <div className="absolute left-0 w-1.5 h-full rounded-r-full text-white scale-y-0 group-hover:scale-y-100 transition-transform ease-in-out" />
                                        <div className="flex-none">
                                            <FaHome />
                                        </div>
                                        <p className="flex-1">Dashboard</p>
                                    </a>
                                    <a href="/staffaccounts"  className={`flex items-center gap-x-2 p-2 rounded-lg duration-150 hover:bg-lightblue hover:text-black
                                         ${getTabStyles('staffaccounts')}`}>
                                        <div className="absolute left-0 w-1.5 h-full rounded-r-full bg-gray-600 scale-y-0 group-hover:scale-y-100 transition-transform ease-in-out" />
                                        <div className="flex-none">
                                            <FaUserTie />
                                        </div>
                                        <p className="flex-1">Staff Accounts</p>
                                    </a>
                                    <a href="/customeraccounts"  className={`flex items-center gap-x-2 p-2 rounded-lg duration-150 hover:bg-lightblue hover:text-black
                                         ${getTabStyles('customeraccounts')}`}>
                                        <div className="absolute left-0 w-1.5 h-full rounded-r-full bg-gray-600 scale-y-0 group-hover:scale-y-100 transition-transform ease-in-out" />
                                        <div className="flex-none">
                                            <FaUsers />
                                        </div>
                                        <p className="flex-1">Customer Accounts</p>
                                    </a>
                                    <a href="/ongoingjobs"  className={`flex items-center gap-x-2 p-2 rounded-lg duration-150 hover:bg-lightblue hover:text-black
                                         ${getTabStyles('ongoingjobs')}`}>
                                        <div className="absolute left-0 w-1.5 h-full rounded-r-full bg-gray-600 scale-y-0 group-hover:scale-y-100 transition-transform ease-in-out" />
                                        <div className="flex-none">
                                            <FaBusinessTime />
                                        </div>
                                        <p className="flex-1">Ongoing Jobs</p>
                                    </a>
                                    <a href="/registeredvehicles"  className={`flex items-center gap-x-2 p-2 rounded-lg duration-150 hover:bg-lightblue hover:text-black
                                         ${getTabStyles('registeredvehicles')}`}>
                                        <div className="absolute left-0 w-1.5 h-full rounded-r-full bg-gray-600 scale-y-0 group-hover:scale-y-100 transition-transform ease-in-out" />
                                        <div className="flex-none">
                                            <FaCarAlt />
                                        </div>
                                        <p className="flex-1">Registered Vehicles</p>
                                    </a>
                                    <a href="/vehiclemodelbrand"  className={`flex items-center gap-x-2 p-2 rounded-lg duration-150 hover:bg-lightblue hover:text-black
                                         ${getTabStyles('vehiclemodelbrand')}`}>
                                        <div className="absolute left-0 w-1.5 h-full rounded-r-full bg-gray-600 scale-y-0 group-hover:scale-y-100 transition-transform ease-in-out" />
                                        <div className="flex-none">
                                            <FaTrademark />
                                        </div>
                                        <p className="flex-1">Vehicle Models & Brands</p>
                                    </a>
                                    <a href="/customercomplaints"  className={`flex items-center gap-x-2 p-2 rounded-lg duration-150 hover:bg-lightblue hover:text-black
                                         ${getTabStyles('customercomplaints')}`}>
                                        <div className="absolute left-0 w-1.5 h-full rounded-r-full bg-gray-600 scale-y-0 group-hover:scale-y-100 transition-transform ease-in-out" />
                                        <div className="flex-none">
                                            <FaRegFrown />
                                        </div>
                                        <p className="flex-1">Customer Complaints</p>
                                    </a>
                                    <a href="/servicetypes"  className={`flex items-center gap-x-2 p-2 rounded-lg duration-150 hover:bg-lightblue hover:text-black
                                         ${getTabStyles('servicetypes')}`}>
                                        <div className="absolute left-0 w-1.5 h-full rounded-r-full bg-gray-600 scale-y-0 group-hover:scale-y-100 transition-transform ease-in-out" />
                                        <div className="flex-none">
                                            <FaClipboardList />
                                        </div>
                                        <p className="flex-1">Service Types</p>
                                    </a>
                                    <a href="/siteannouncements"  className={`flex items-center gap-x-2 p-2 rounded-lg duration-150 hover:bg-lightblue hover:text-black
                                         ${getTabStyles('siteannouncements')}`}>
                                        <div className="absolute left-0 w-1.5 h-full rounded-r-full bg-gray-600 scale-y-0 group-hover:scale-y-100 transition-transform ease-in-out" />
                                        <div className="flex-none">
                                            <FaBullhorn />
                                        </div>
                                        <p className="flex-1">Site Announcements</p>
                                    </a>
                                </li>
                            )}
                            {isTechnician && (
                               <li>
                                    <a href="/dashboard"  className={`flex items-center gap-x-2 p-2 rounded-lg duration-150 hover:bg-lightblue hover:text-black
                                         ${getTabStyles('dashboard')}`}>
                                        <div className="absolute left-0 w-1.5 h-full rounded-r-full text-white scale-y-0 group-hover:scale-y-100 transition-transform ease-in-out" />
                                        <div className="flex-none">
                                            <FaHome />
                                        </div>
                                        <p className="flex-1">Dashboard</p>
                                    </a>
                                    <a href="/assigned-jobs"  className={`flex items-center gap-x-2 p-2 rounded-lg duration-150 hover:bg-lightblue hover:text-black
                                         ${getTabStyles('assigned-jobs')}`}>
                                        <div className="absolute left-0 w-1.5 h-full rounded-r-full bg-gray-600 scale-y-0 group-hover:scale-y-100 transition-transform ease-in-out" />
                                        <div className="flex-none">
                                            <FaBusinessTime />
                                        </div>
                                        <p className="flex-1">Completed Jobs</p>
                                    </a>
                                </li>
                            )}
                            {isWarehouseKeeper && (
                               <li>
                                    <a href="/dashboard"  className={`flex items-center gap-x-2 p-2 rounded-lg duration-150 hover:bg-lightblue hover:text-black
                                         ${getTabStyles('dashboard')}`}>
                                        <div className="absolute left-0 w-1.5 h-full rounded-r-full text-white scale-y-0 group-hover:scale-y-100 transition-transform ease-in-out" />
                                        <div className="flex-none">
                                            <FaHome />
                                        </div>
                                        <p className="flex-1">Dashboard</p>
                                    </a>
                                    <a href="/inventory"  className={`flex items-center gap-x-2 p-2 rounded-lg duration-150 hover:bg-lightblue hover:text-black
                                         ${getTabStyles('inventory')}`}>
                                        <div className="absolute left-0 w-1.5 h-full rounded-r-full bg-gray-600 scale-y-0 group-hover:scale-y-100 transition-transform ease-in-out" />
                                        <div className="flex-none">
                                            <FaUserTie />
                                        </div>
                                        <p className="flex-1">Inventory</p>
                                    </a>
                                </li>
                            )}
                            {isCustomer && (
                                <li>
                                    <a href="/dashboard"  className={`flex items-center gap-x-2 p-2 rounded-lg duration-150 hover:bg-lightblue hover:text-black
                                         ${getTabStyles('dashboard')}`}>
                                        <div className="absolute left-0 w-1.5 h-full rounded-r-full bg-gray-600 scale-y-0 group-hover:scale-y-100 transition-transform ease-in-out" />
                                        <div className="flex-none">
                                            <FaHome />
                                        </div>
                                        <p className="flex-1">Dashboard</p>
                                    </a>
                                    <a href="/myvehicles" className={`flex items-center gap-x-2 p-2 rounded-lg duration-150 hover:bg-lightblue hover:text-black
                                         ${getTabStyles('myvehicles')}`}>
                                        <div className="absolute left-0 w-1.5 h-full rounded-r-full bg-gray-600 scale-y-0 group-hover:scale-y-100 transition-transform ease-in-out" />
                                        <div className="flex-none">
                                            <FaCar />
                                        </div>
                                        <p className="flex-1">My Vehicles</p>
                                    </a>
                                    <a href="/ongoingrepairs"  className={`flex items-center gap-x-2 p-2 rounded-lg duration-150 hover:bg-lightblue hover:text-black
                                         ${getTabStyles('ongoingrepairs')}`}>
                                        <div className="absolute left-0 w-1.5 h-full rounded-r-full bg-gray-600 scale-y-0 group-hover:scale-y-100 transition-transform ease-in-out" />
                                        <div className="flex-none">
                                            <FaWrench />
                                        </div>
                                        <p className="flex-1">Ongoing Repairs</p>
                                    </a>
                                    <a href="/servicebookings"  className={`flex items-center gap-x-2 p-2 rounded-lg duration-150 hover:bg-lightblue hover:text-black
                                         ${getTabStyles('servicebookings')}`}>
                                        <div className="absolute left-0 w-1.5 h-full rounded-r-full bg-gray-600 scale-y-0 group-hover:scale-y-100 transition-transform ease-in-out" />
                                        <div className="flex-none">
                                            <FaCalendarAlt />
                                        </div>
                                        <p className="flex-1">Service Bookings</p>
                                    </a>
                                    <a href="/billings"  className={`flex items-center gap-x-2 p-2 rounded-lg duration-150 hover:bg-lightblue hover:text-black
                                         ${getTabStyles('billings')}`}>
                                        <div className="absolute left-0 w-1.5 h-full rounded-r-full bg-gray-600 scale-y-0 group-hover:scale-y-100 transition-transform ease-in-out" />
                                        <div className="flex-none">
                                            <FaMoneyCheckAlt />
                                        </div>
                                        <p className="flex-1">Payments & Billing</p>
                                    </a>
                                </li>
                            )}
                            {isSupervisor && (
                                <li>
                                    <a href="/dashboard"  className={`flex items-center gap-x-2 p-2 rounded-lg duration-150 hover:bg-lightblue hover:text-black
                                         ${getTabStyles('dashboard')}`}>
                                        <div className="absolute left-0 w-1.5 h-full rounded-r-full bg-gray-600 scale-y-0 group-hover:scale-y-100 transition-transform ease-in-out" />
                                        <div className="flex-none">
                                            <FaHome />
                                        </div>
                                        <p className="flex-1">Dashboard</p>
                                    </a>
                                    
                                    <a href="/repairvehicles"  className={`flex items-center gap-x-2 p-2 rounded-lg duration-150 hover:bg-lightblue hover:text-black
                                         ${getTabStyles('repairvehicles')}`}>
                                        <div className="absolute left-0 w-1.5 h-full rounded-r-full bg-gray-600 scale-y-0 group-hover:scale-y-100 transition-transform ease-in-out" />
                                        <div className="flex-none">
                                            <FaClipboardList />
                                        </div>
                                        <p className="flex-1">Assigned Jobs</p>
                                    </a>

                                    <a href="/completedjobs"  className={`flex items-center gap-x-2 p-2 rounded-lg duration-150 hover:bg-lightblue hover:text-black
                                         ${getTabStyles('completedjobs')}`}>
                                        <div className="absolute left-0 w-1.5 h-full rounded-r-full bg-gray-600 scale-y-0 group-hover:scale-y-100 transition-transform ease-in-out" />
                                        <div className="flex-none">
                                            <FaClipboardCheck />
                                        </div>
                                        <p className="flex-1">Completed Jobs</p>
                                    </a>

                                    <a href="/vehiclehistory"  className={`flex items-center gap-x-2 p-2 rounded-lg duration-150 hover:bg-lightblue hover:text-black
                                         ${getTabStyles('vehiclehistory')}`}>
                                        <div className="absolute left-0 w-1.5 h-full rounded-r-full bg-gray-600 scale-y-0 group-hover:scale-y-100 transition-transform ease-in-out" />
                                        <div className="flex-none">
                                            <FaCar />
                                        </div>
                                        <p className="flex-1">Vehicle History</p>
                                    </a>

                                    
                                </li>
                            )}
                            {isReceptionist && (
                                <li>
                                    <a href="/dashboard"  className={`flex items-center gap-x-2 p-2 rounded-lg duration-150 hover:bg-lightblue hover:text-black
                                         ${getTabStyles('dashboard')}`}>
                                        <div className="absolute left-0 w-1.5 h-full rounded-r-full bg-gray-600 scale-y-0 group-hover:scale-y-100 transition-transform ease-in-out" />
                                        <div className="flex-none">
                                            <FaHome />
                                        </div>
                                        <p className="flex-1">Dashboard</p>
                                    </a>
                                    <a href="/jobmanagement"  className={`flex items-center gap-x-2 p-2 rounded-lg duration-150 hover:bg-lightblue hover:text-black
                                         ${getTabStyles('jobmanagement')}`}>
                                        <div className="absolute left-0 w-1.5 h-full rounded-r-full bg-gray-600 scale-y-0 group-hover:scale-y-100 transition-transform ease-in-out" />
                                        <div className="flex-none">
                                            <FaBusinessTime />
                                        </div>
                                        <p className="flex-1">Job Management</p>
                                    </a>
                                    <a href="/vehiclemanagement"  className={`flex items-center gap-x-2 p-2 rounded-lg duration-150 hover:bg-lightblue hover:text-black
                                         ${getTabStyles('vehiclemanagement')}`}>
                                        <div className="absolute left-0 w-1.5 h-full rounded-r-full bg-gray-600 scale-y-0 group-hover:scale-y-100 transition-transform ease-in-out" />
                                        <div className="flex-none">
                                            <FaCarAlt />
                                        </div>
                                        <p className="flex-1">Vehicle Management</p>
                                    </a>
                                    <a href="/bookingmanagement"  className={`flex items-center gap-x-2 p-2 rounded-lg duration-150 hover:bg-lightblue hover:text-black
                                         ${getTabStyles('bookingmanagement')}`}>
                                        <div className="absolute left-0 w-1.5 h-full rounded-r-full bg-gray-600 scale-y-0 group-hover:scale-y-100 transition-transform ease-in-out" />
                                        <div className="flex-none">
                                            <FaCalendarCheck />
                                        </div>
                                        <p className="flex-1">Booking Management</p>
                                    </a>
                                    <a href="/billing"  className={`flex items-center gap-x-2 p-2 rounded-lg duration-150 hover:bg-lightblue hover:text-black
                                         ${getTabStyles('billing')}`}>
                                        <div className="absolute left-0 w-1.5 h-full rounded-r-full bg-gray-600 scale-y-0 group-hover:scale-y-100 transition-transform ease-in-out" />
                                        <div className="flex-none">
                                            <FaRegClipboard />
                                        </div>
                                        <p className="flex-1">Billing</p>
                                    </a>
                                    <a href="/customerpayments"  className={`flex items-center gap-x-2 p-2 rounded-lg duration-150 hover:bg-lightblue hover:text-black
                                         ${getTabStyles('customerpayments')}`}>
                                        <div className="absolute left-0 w-1.5 h-full rounded-r-full bg-gray-600 scale-y-0 group-hover:scale-y-100 transition-transform ease-in-out" />
                                        <div className="flex-none">
                                            <FaMoneyCheckAlt />
                                        </div>
                                        <p className="flex-1">Customer Payments</p>
                                    </a>
                                    <a href="/supplierpayments"  className={`flex items-center gap-x-2 p-2 rounded-lg duration-150 hover:bg-lightblue hover:text-black
                                         ${getTabStyles('supplierpayments')}`}>
                                        <div className="absolute left-0 w-1.5 h-full rounded-r-full bg-gray-600 scale-y-0 group-hover:scale-y-100 transition-transform ease-in-out" />
                                        <div className="flex-none">
                                            <FaMoneyCheck />
                                        </div>
                                        <p className="flex-1">Supplier Payments</p>
                                    </a>
                                </li>
                            )}
                        </ul>
                        <div>
                            <ul className="px-4 pb-4 text-lg font-medium">
                                {isCustomer && (
                                        <a href="/sendComplaint"  className={`flex items-center gap-x-2 p-2 rounded-lg duration-150 hover:bg-lightblue hover:text-black
                                         ${getTabStyles('sendComplaint')}`}>
                                            <div className="absolute left-0 w-1.5 h-full rounded-r-full bg-gray-600 scale-y-0 group-hover:scale-y-100 transition-transform ease-in-out" />
                                            <div className="flex-none">
                                                <FaCommentDots/>
                                            </div>
                                            <p className="flex-1">Report an issue</p>
                                        </a>
                                )}
                                {isAuthenticated && (
                                    <li>
                                        <a href="/userProfile"  className={`flex items-center gap-x-2 p-2 rounded-lg duration-150 hover:bg-lightblue hover:text-black
                                         ${getTabStyles('userProfile')}`}>
                                            <div className="absolute left-0 w-1.5 h-full rounded-r-full bg-gray-600 scale-y-0 group-hover:scale-y-100 transition-transform ease-in-out" />
                                            <div className="flex-none">
                                                <FaCog />
                                            </div>
                                            <p className="flex-1">Settings</p>
                                        </a>
                                        
                                        <a  onClick={handleLogout} className="flex items-center gap-x-2 text-white p-2 rounded-lg  hover:bg-lightblue hover:text-driveazered active:bg-gray-100 duration-150">
                                            <div className="absolute left-0 w-1.5 h-full rounded-r-full bg-gray-600 scale-y-0 group-hover:scale-y-100 transition-transform ease-in-out" />
                                            <div className="flex-none">
                                                <FaSignOutAlt />
                                            </div>
                                            <p className="flex-1">Logout</p>
                                        </a>
                                    </li>
                                )}
                            </ul>
                            <div className="py-4 px-4 border-t">
                                <div className="flex items-center gap-x-4">
                                    <img 
                                        src={profileInfo.profilePictureUrl ? profileInfo.profilePictureUrl : "https://driveaze-images.s3.eu-north-1.amazonaws.com/12345.jpg"} 
                                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-300" 
                                    />
                                    <div>
                                        <span className="block text-white text-lg font-semibold">{profileInfo.name}</span>
                                        <span className="block mt-px text-red-600 text-sm">
                                            {profileInfo.role === "ADMIN" && "Admin Account"}
                                            {profileInfo.role === "RECEPTIONIST" && "Receptionist Account"}
                                            {profileInfo.role === "MANAGER" && "Manager Account"}
                                            {profileInfo.role === "CUSTOMER" && "Customer Account"}
                                            {profileInfo.role === "TECHNICIAN" && "Technician Account"}
                                            {profileInfo.role === "WAREHOUSE_KEEPER" && "Warehouse Keeper Account"}
                                            {profileInfo.role === "SUPERVISOR" && "Supervisor Account"}
                                        </span>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div>
            </nav>
        </>
    );

    
}

export default Sidebar;
    

