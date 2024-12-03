import React, { useEffect, useState } from 'react';
import { FaUsers, FaUsersCog, FaCar, FaToolbox, FaTools } from "react-icons/fa";
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import DashboardService from '../../service/DashboardService'; // Ensure you have this service correctly implemented
ChartJS.register([BarElement, PointElement, CategoryScale, LinearScale]);

const AdminDashboard = () => {
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

    // Bar graph data for user distribution
    const dataBar = {
        labels: ['Managers', 'Technicians', 'Warehouse Keepers', 'Supervisors', 'Receptionists', 'Customers'],
        datasets: [
            {
                label: 'User  Distribution',
                data: [
                    stats.managerCount,
                    stats.technicianCount,
                    stats.whkeeperCount,
                    stats.supervisorCount,
                    stats.receptionistCount,
                    stats.customerCount,
                ],
                backgroundColor: [
                    '#9966FF', 
                    '#9966FF', 
                    '#9966FF', 
                    '#9966FF', 
                    '#9966FF', 
                    '#9966FF'
                ],
                borderColor: 'rgba(0, 0, 0, 0.1)',
                borderWidth: 1,
            },
        ],
    };

    // Doughnut graph data for job status
    const dataDoughnut = {
        labels: ['Completed Jobs', 'Pending Jobs'],
        datasets: [
            {
                data: [stats.completedJobs, stats.pendingJobs],
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384'],
            },
        ],
    };

    return (
        <div className='grow p-8 mt-6'>
            <h2 className='text-2xl font-bold mb-4'>Admin Dashboard</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
                
                <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
                    <div className="flex-shrink-0 text-3xl text-red-500">
                        <FaUsersCog />
                    </div>
                    <div className="ml-4">
 <h4 className="text-gray-800 text-xl font-semibold">Total Users</h4>
                        <p className="text-gray-600 text-2xl font-bold">{stats.managerCount + stats.technicianCount + stats.whkeeperCount + stats.supervisorCount + stats.receptionistCount + stats.customerCount}</p>
                    </div>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
                    <div className="flex-shrink-0 text-3xl text-blue-500">
                        <FaCar />
                    </div>
                    <div className="ml-4">
                        <h4 className="text-gray-800 text-xl font-semibold">Total Staff</h4>
                        <p className="text-gray-600 text-2xl font-bold">{stats.managerCount + stats.technicianCount + stats.whkeeperCount + stats.supervisorCount + stats.receptionistCount}</p>
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
                    <h3 className='text-lg font-semibold mb-4'>User  Distribution</h3>
                    <Bar data={dataBar} />
                </div>
                <div className='bg-white p-4 rounded-lg shadow-md'>
                  <h3 className='text-lg font-semibold mb-4'>Job Status</h3>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}> {/* Adjust height as needed */}
                      <Doughnut data={dataDoughnut} />
                  </div>
              </div>
            </div>
        </div>
    );
};

export default AdminDashboard;