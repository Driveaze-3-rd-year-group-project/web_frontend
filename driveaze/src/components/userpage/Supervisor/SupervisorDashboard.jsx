import React, { useState, useEffect } from 'react';
import { FaWarehouse, FaExclamationCircle, FaChartLine } from 'react-icons/fa';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import InventoryService from "../../service/InventoryService";
import UserService from '../../service/UserService'; // Assuming you have an announcement service
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../WarehouseKeeper/WarehouseKeeperDashboard.css";
import SupervisorService from '../../service/SupervisorService';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const Dashboard = ({ token }) => {
    const [metrics, setMetrics] = useState({
        JobCount: 0,
        completedJobs: 0,
        pendingJobs: 0,
        technicianCount: 0,
    });

    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        fetchStatistics();
        fetchAnnouncements();
    }, []);

    const fetchStatistics = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await SupervisorService.getSupervisorStatistic(token);
            if (response.statusCode === 200) {
                setMetrics(prevMetrics => ({
                    ...prevMetrics,
                    JobCount: response.details.JobCount,
                    completedJobs: response.details.completedJobs,
                    pendingJobs: response.details.pendingJobs,
                    technicianCount: response.details.technicianCount,
                }));
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
            const response = await UserService.getStaffAnnouncement(token); // Fetch announcements
            if (response.statusCode === 200) {
                setAnnouncements(response.announcementList); // Assuming details is an array of announcements
            } else {
                toast.error(response.message || 'Failed to fetch announcements!');
            }
        } catch (error) {
            console.error('Failed to fetch announcements', error);
            toast.error('Failed to fetch announcements!');
        }
    };

    const JobStatusData = {
        labels: ['Completed Repairs', 'Ongoing Repairs'],
        datasets: [
            {
                label: 'Job Status',
                data: [
                    metrics.completedJobs,
                    metrics.pendingJobs,
                ],
                backgroundColor: ['#191970','#d53300'],
                borderColor: '#fff',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl mb-6">Supervisor Dashboard</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
                    <div className="flex-shrink-0 text-4xl text-blue-500">
                        <FaWarehouse />
                    </div>
                    <div className="ml-4">
                        <h4 className="text-gray-800 text-lg font-semibold">Completed Jobs</h4>
                        <p className="text-gray-600 text-xl font-bold">{metrics.completedJobs}</p>
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
                    <div className="flex-shrink-0 text-4xl text-red-500">
                        <FaExclamationCircle />
                    </div>
                    <div className="ml-4">
                        <h4 className="text-gray- 800 text-lg font-semibold">Pending Jobs</h4>
                        <p className="text-gray-600 text-xl font-bold">{ metrics.pendingJobs}</p>
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
                    <div className="flex-shrink-0 text-4xl text-green-500">
                        <FaChartLine />
                    </div>
                    <div className="ml-4">
                        <h4 className="text-gray-800 text-lg font-semibold">Technician Count</h4>
                        <p className="text-gray-600 text-xl font-bold">{metrics.technicianCount}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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

                <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col">
                    <h4 className="text-gray-800 text-xl font-semibold mb-4">Job Status Distribution</h4>
                    <div className="w-full h-64 flex items-center justify-center">
                        <Doughnut data={JobStatusData} />
                    </div>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
        </div>
    );
};

export default Dashboard;