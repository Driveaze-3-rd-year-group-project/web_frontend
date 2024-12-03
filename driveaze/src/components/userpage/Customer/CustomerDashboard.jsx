import React, { useState, useEffect } from 'react';
import { FaCar, FaCalendarCheck, FaClock, FaClipboardList, FaEnvelope } from 'react-icons/fa';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
// import UserService from '../../service/UserService'; // Assuming you have a user service
import DashboardService from "../../service/DashboardService";
import UserService from "../../service/UserService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../WarehouseKeeper/WarehouseKeeperDashboard.css";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const CustomerDashboard = () => {
    const [metrics, setMetrics] = useState({
        completedBooking: 0,
        pendingBooking: 0,
        customerVehicle: 0,
    });

    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        fetchCustomerStatistics();
        fetchAnnouncements();
    }, []);

    const fetchCustomerStatistics = async () => {
        try {
            const token = localStorage.getItem('token');
            const userProfile = await UserService.getYourProfile(token);
            const response = await DashboardService.getCustomerStatistics(userProfile.ourUsers.id,userProfile.ourUsers.contactNumber,token); // Fetch customer statistics
            if (response.statusCode === 200) {
                setMetrics({
                    completedBooking: response.details.completedBooking,
                    pendingBooking: response.details.pendingBooking,
                    customerVehicle: response.details.customerVehicle,
                });
            } else {
                toast.error(response.message || 'Failed to fetch customer statistics!');
            }
        } catch (error) {
            console.error('Failed to fetch customer statistics', error);
            toast.error('Failed to fetch customer statistics!');
        }
    };

    const fetchAnnouncements = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await UserService.getCustomerAnnouncement(token); // Fetch announcements
            if (response.statusCode === 200) {
                setAnnouncements(response.announcementList); // Assuming announcementList is an array
            } else {
                toast.error(response.message || 'Failed to fetch announcements!');
            }
        } catch (error) {
            console.error('Failed to fetch announcements', error);
            toast.error('Failed to fetch announcements!');
        }
    };

    const jobStatusData = {
        labels: ['Completed Bookings', 'Pending Bookings'],
        datasets: [
            {
                label: 'Booking Status',
                data: [metrics.completedBooking, metrics.pendingBooking],
                backgroundColor: ['#4caf50', '#f44336'], // Green for completed, Red for pending
                borderColor: '#fff',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl mb-6">Customer Dashboard</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
                    <div className="flex-shrink-0 text-4xl text-blue-500">
                        <FaCar />
                    </div>
                    <div className="ml-4">
                        <h4 className="text-gray-800 text-lg font-semibold">My Vehicles</h4>
                        <p className="text-gray-600 text-xl font-bold">{metrics.customerVehicle}</p>
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
                    <div className="flex-shrink-0 text-4xl text-green-500">
                        <FaCalendarCheck />
                    </div>
                    <div className="ml-4">
                        <h4 className="text-gray-800 text-lg font-semibold">Completed Bookings</h4>
                        <p className="text-gray-600 text-xl font-bold">{metrics.completedBooking}</p>
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
                    <div className="flex-shrink-0 text-4xl text-red-500">
                        <FaClock />
                    </div>
                    <div className="ml-4">
                        <h4 className="text-gray-800 text-lg font-semibold">Pending Bookings</h4>
                        <p className="text-gray-600 text-xl font-bold">{metrics.pendingBooking}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h4 className="text-gray-800 text-xl font-semibold mb-4">Booking Status Distribution</h4>
                    <div className="w-full h-64 flex items-center justify-center">
                        <Pie data={jobStatusData} />
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-gray-800 text-xl font-semibold">Announcements</h4>
                        <a href='allannouncements' className="py-1 px-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150 mb-2">View All</a>
                    </div>
                    <div className="max-h-80 overflow-hidden overflow-y-auto scrollbar-hide space-y-4">
                        {announcements.length > 0 ? (
                            announcements.slice(0, 5).map((announcement, index) => (
                                <div key={index} className="p-4 border rounded-lg shadow-md">
                                    <h5 className="font-bold">{announcement.title}</h5>
                                    <p className="text-xs text-gray-500 mb-2">{new Date(announcement.date).toLocaleDateString()}</p>
                                    <p className="text-sm text-gray-600">{announcement.content}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">No announcements available.</p>
                        )}
                    </div>
                </div>
            </div>

            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
        </div>
    );
};

export default CustomerDashboard;