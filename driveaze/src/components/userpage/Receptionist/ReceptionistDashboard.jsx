import React, { useState, useEffect } from 'react';
import { FaCar, FaMoneyBillWave, FaTools } from 'react-icons/fa';
import { Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';
// import ReceptionistService from "../../service/ReceptionistService"; // Ensure you have this service implemented
import UserService from '../../service/UserService'; // Assuming you have an announcement service
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardService from '../../service/DashboardService';

ChartJS.register(Title, Tooltip, Legend, ArcElement, LineElement, PointElement, LinearScale, CategoryScale);

const ReceptionistDashboard = ({ token }) => {
    const [metrics, setMetrics] = useState({
        totalVehicle: 0,
        totalBill: 0,
        ongoingRepairs: 0,
        completedJobs: 0,
    });

    const [announcements, setAnnouncements] = useState([]);
    const [bookingData, setBookingData] = useState({
        labels: [],
        datasets: [{
            label: 'Bookings',
            data: [],
            borderColor: '#4BC0C0',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
        }],
    });

    useEffect(() => {
        fetchStatistics();
        fetchAnnouncements();
        fetchBookingData();
    }, []);

    const fetchStatistics = async () => {
        try {
          const token = localStorage.getItem('token');
            const response = await DashboardService.getReceptionistStatistic(token);
            console.log(response);
            if (response.statusCode === 200) {
                setMetrics({
                    totalVehicle: response.details.totalVehicle,
                    totalBill: response.details.totalBill,
                    ongoingRepairs: response.details.pendingJobs,
                    completedJobs: response.details.completedJobs,
                });
            } else {
                toast.error(response.message || 'Failed to get statistic!');
            }
        } catch (error) {
            console.error('Failed to fetch statistics', error);
            toast.error('Failed to get details!');
        }
    };

    const fetchAnnouncements = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await UserService.getStaffAnnouncement(token);
            if (response.statusCode === 200) {
                setAnnouncements(response.announcementList);
            } else {
                toast.error(response.message || 'Failed to fetch announcements!');
            }
        } catch (error) {
            console.error('Failed to fetch announcements:', error.message);
            toast.error('Failed to fetch announcements! Please try again later.');
        }
    };

    const fetchBookingData = async () => {
        
        const dummyLabels = ['August', 'September', 'October', 'November', 'December'];
        const dummyData = [0, 3, 8, 5, 10]; // Replace with actual data from your API

        setBookingData({
            labels: dummyLabels,
            datasets: [{
                label: 'Bookings',
                data: dummyData,
                borderColor: '#4BC0C0',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            }],
        });
    };

    const JobStatusData = {
        labels: ['Completed Repairs', 'Ongoing Repairs'],
        datasets: [
            {
                label: 'Job Status',
                data: [metrics.completedJobs, metrics.ongoingRepairs],
                backgroundColor: ['#36A2EB', '#FF6384'],
                borderColor: '#fff',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl mb-6">Receptionist Dashboard</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
                    <div className="flex-shrink-0 text-4xl text-blue-500">
                        <FaCar />
                    </div>
                    <div className="ml-4">
                        <h4 className="text-gray-800 text-lg font-semibold">Total Vehicles</h4>
                        <p className="text-gray-600 text-xl font-bold">{metrics.totalVehicle}</p>
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
                    <div className="flex-shrink-0 text-4xl text-green-500">
                        <FaMoneyBillWave />
                    </div>
                    <div className="ml-4">
                        <h4 className="text-gray-800 text-lg font-semibold">Total Bill</h4>
                        <p className="text-gray-600 text-xl font-bold">{metrics.totalBill}</p>
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
                    <div className="flex-shrink-0 text-4xl text-orange-500">
                        <FaTools />
                    </div>
                    <div className="ml-4">
                        <h4 className="text-gray-800 text-lg font-semibold">Ongoing Repairs</h4>
                        <p className="text-gray-600 text-xl font-bold">{metrics.ongoingRepairs}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col">
                    <h4 className="text-gray-800 text-xl font-semibold mb-4">Job Status Distribution</h4>
                    <div className="w-full h-64 flex items-center justify-center">
                        <Doughnut data={JobStatusData} />
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col">
                    <h4 className="text-gray-800 text-xl font-semibold mb-4">Booking Trends</h4>
                    <div className="w-full h-64">
                        <Line data={bookingData} />
                    </div>
                </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col mb-6">
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

            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
        </div>
    );
};

export default ReceptionistDashboard;