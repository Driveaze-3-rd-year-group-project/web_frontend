import React, { useState, useEffect } from 'react';
import { FaWarehouse, FaClock, FaUser  } from 'react-icons/fa';
import UserService from '../../service/UserService'; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TechnicianDashboard = ({ token }) => {
    const [metrics, setMetrics] = useState({
        jobCount: 0,
        totalWorkedHours: 0,
        technicianId: 0,
    });
    
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        fetchTechnicianStatistics();
    }, []);

    const fetchTechnicianStatistics = async () => {
        try {
            const token = localStorage.getItem('token');
            const userProfile = await UserService.getYourProfile(token);
            const response = await UserService.getTechnicianEntries(userProfile.ourUsers.id, token);  // Replace with actual API call
            
            if (response.statusCode === 200) {
                const jobs = response.details; // Assuming details is an array of job entries
                const jobCount = jobs.length;
                const totalWorkedHours = jobs.reduce((total, job) => total + job[0].manHours, 0); // Sum of all man hours
                const technicianId = jobs.length > 0 ? jobs[0][0].technicianId : 0; // Assuming technicianId is the same for all jobs

                setMetrics({
                    jobCount,
                    totalWorkedHours,
                    technicianId,
                });
                fetchAnnouncements(userProfile.ourUsers.id); // Fetch announcements after fetching statistics
            } else {
                toast.error(response.message || 'Failed to get technician statistics!');
            }
        } catch (error) {
            console.error('Failed to fetch technician statistics', error);
            toast.error('Failed to get technician statistics!');
        }
    };

    const fetchAnnouncements = async (technicianId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await UserService.getStaffAnnouncement(token);
    
            if (response.statusCode === 200) {
                setAnnouncements(response.announcementList);
            } else {
                console.error('Error fetching announcements:', response.message);
                toast.error('Failed to fetch announcements!');
            }
        } catch (error) {
            console.error('Failed to fetch announcements:', error.message);
            toast.error('Failed to fetch announcements! Please try again later.');
        }
    };

    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl mb-6">Technician Dashboard</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
                    <div className="flex-shrink-0 text-4xl text-blue-500">
                        <FaWarehouse />
                    </div>
                    <div className="ml-4">
                        <h4 className="text-gray-800 text-lg font-semibold">Job Count</h4>
                        <p className="text-gray-600 text-xl font-bold">{metrics.jobCount}</p>
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
                    <div className="flex-shrink-0 text-4xl text-green-500">
                        <FaClock />
                    </div>
                    <div className="ml-4">
                        <h4 className="text-gray-800 text-lg font-semibold">Total Worked Hours</h4>
                        <p className="text-gray-600 text-xl font-bold">{metrics.totalWorkedHours}</p>
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
                    <div className="flex-shrink-0 text-4xl text-orange-500">
                        <FaUser  />
                    </div>
                    <div className="ml-4">
                        <h4 className="text-gray-800 text-lg font-semibold">Your Employee ID</h4>
                        <p className="text-gray-600 text-xl font-bold">{metrics.technicianId}</p>
                    </div>
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

            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
        </div>
    );
};

export default TechnicianDashboard;