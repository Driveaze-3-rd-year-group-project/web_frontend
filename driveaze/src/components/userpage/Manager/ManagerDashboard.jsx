import React, { useEffect, useState } from 'react';
import { FaUsers, FaUsersCog, FaCar, FaToolbox, FaTools } from "react-icons/fa";
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, BarElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import DashboardService from '../../service/DashboardService'; // Ensure you have this service correctly implemented
ChartJS.register([LineElement, BarElement, PointElement, CategoryScale, LinearScale]);

const ManagerDashboard = () => {
    const [stats, setStats] = useState({
        totalVehicle: 0,
        managerCount: 0,
        technicianCount: 0,
        whkeeperCount: 0,
        supervisorCount: 0,
        pendingJobs: 0,
        completedJobs: 0,
        receptionistCount: 0,
        customerCount: 0,
        totalJob: 0
    });

    // Fetch statistics from the API
    const fetchStatistics = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await DashboardService.getManagerStatistic(token);
            if (response.statusCode === 200) {
                setStats({
                    totalVehicle: response.details.totalVehicle,
                    managerCount: response.details.managerCount,
                    technicianCount: response.details.technicianCount,
                    whkeeperCount: response.details.whkeeperCount,
                    supervisorCount: response.details.supervisorCount,
                    pendingJobs: response.details.pendingJobs,
                    completedJobs: response.details.completedJobs,
                    receptionistCount: response.details.receptionistCount,
                    customerCount: response.details.customerCount,
                    totalJob: response.details.totalJob,
                });
            } else {
                console.error(response.message || 'Failed to get statistics!');
            }
        } catch (error) {
            console.error('Failed to fetch statistics', error);
        }
    };

    useEffect(() => {
        fetchStatistics();
    }, []);

    const dataLine = {
        labels: ['Jane', 'july', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Completed Jobs',
                data: [0, 5, 6, 3, 6, 8, 1], // Example data
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };

    const dataBar = {
        labels: ['Pending Jobs', 'Completed Jobs'],
        datasets: [
            {
                label: 'Job Count',
                data: [stats.pendingJobs, stats.completedJobs],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const dataPie = {
        labels: ['Technicians', 'Managers', 'Warehouse Keepers', 'Supervisors', 'Receptionists'],
        datasets: [
            {
                data: [stats.technicianCount, stats.managerCount, stats.whkeeperCount, stats.supervisorCount, stats.receptionistCount],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            },
        ],
    };

    return (
        <div className='grow p-8 mt-6'>
            <h2 className='text-2xl font-bold mb-4'>Manager Dashboard</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
                <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
                    <div className="flex-shrink-0 text-3xl text-blue-500">
                        <FaCar />
                    </div>
                    <div className="ml-4">
                        <h4 className="text-gray-800 text-xl font-semibold">Total Vehicles</h4>
                        <p className="text-gray-600 text-2xl font-bold">{stats.totalVehicle}</p>
                    </div>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
                    <div className="flex-shrink-0 text-3xl text-red-500">
                        <FaUsersCog />
                    </div>
                    <div className="ml-4">
                        <h4 className="text-gray-800 text-xl font-semibold">Staff Count</h4>
                        <p className="text-gray-600 text-2xl font-bold">{stats.managerCount+stats.technicianCount+stats.whkeeperCount+stats.supervisorCount+stats.receptionistCount}</p>
                    </div>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
                    <div className="flex-shrink-0 text-3xl text-green-500">
                        <FaUsers />
                    </div>
                    <div className="ml-4">
                        <h4 className="text-gray-800 text-xl font-semibold">Customer Count</h4>
                        <p className="text-gray-600 text-2xl font-bold">{stats.customerCount}</p>
                    </div>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
                    <div className="flex-shrink-0 text-3xl text-gray-500">
                        <FaTools />
                    </div>
                    <div className="ml-4">
                        <h4 className="text-gray-800 text-xl font-semibold">Pending Jobs</h4>
                        <p className="text-gray-600 text-2xl font-bold">{stats.pendingJobs}</p>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                <div className='bg-white p-4 rounded-lg shadow-md'>
                    <h3 className='text-lg font-semibold mb-4'>Completed Jobs Over Time</h3>
                    <Line data={dataLine} />
                </div>
                <div className='bg-white p-4 rounded-lg shadow-md'>
                    <h3 className='text-lg font-semibold mb-4'>Job Status</h3>
                    <Bar data={dataBar} />
                </div>
                <div className='bg-white p-4 max-w-xl rounded-lg shadow-md'>
                    <h3 className='text-lg font-semibold mb-4'>Staff Distribution</h3>
                    <Pie data={dataPie} />
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;