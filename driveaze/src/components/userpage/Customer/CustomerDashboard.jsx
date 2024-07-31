import React from 'react';
import { FaCar, FaCalendarDay, FaTools, FaEnvelope } from 'react-icons/fa';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  // Dummy data
  const metrics = {
    bookingsToday: 5,
    physicalPaymentsToday: 50000,
    ongoingJobs: 8,
    jobsCompletedThisWeek: [
      { id: 1, customerName: 'Nimali Perera', vehicleNumber: 'XYZ 1234', model: 'Camry' },
      { id: 2, customerName: 'Kumarasiri Silva', vehicleNumber: 'ABC 5678', model: 'Accord' },
      { id: 3, customerName: 'Ayesha Fernando', vehicleNumber: 'DEF 9012', model: 'Focus' },
    ],
    pendingPayments: [
      { id: 1, customerName: 'Nimali Perera', vehicleNumber: 'XYZ 1234', model: 'Camry', amount: 12000 },
      { id: 2, customerName: 'Kumarasiri Silva', vehicleNumber: 'ABC 5678', model: 'Accord', amount: 8500 },
      { id: 3, customerName: 'Ayesha Fernando', vehicleNumber: 'DEF 9012', model: 'Focus', amount: 1500 },
    ],
    weeklyBookings: [5, 8, 7, 10, 6, 9, 4], // Example data for 7 days
    jobStatusDistribution: {
      completed: 9,
      pending: 6
    }
  };

  const bookingData = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], // Week days
    datasets: [
      {
        label: 'Online Bookings',
        data: metrics.weeklyBookings,
        borderColor: '#4c51bf',
        backgroundColor: 'rgba(76, 81, 191, 0.2)',
        fill: true,
      },
    ],
  };

  const jobStatusData = {
    labels: ['Completed', 'Cancelled'],
    datasets: [
      {
        label: 'Job Status',
        data: [metrics.jobStatusDistribution.completed, metrics.jobStatusDistribution.pending],
        backgroundColor: ['#191970', '#696969'], // Light blue and dark blue
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `Jobs: ${tooltipItem.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      }
    }
  };

  const [notifications, setNotifications] = useState([
    { title: 'Upcoming Service', message: 'You have an upcoming service in this week.' },
    { title: '20% off on all services', message: 'In this month we offer 20% off for all services.' },
    { title: 'New Message', message: 'You have received a new message.' },
    { title: 'Update Available', message: 'A new update is available.' },
    { title: 'New Message', message: 'You have received a new message.' },
  ]);

  const clearNotifications = () => {
    setNotifications([]);
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
            <p className="text-gray-600 text-xl font-bold">3</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
          <div className="flex-shrink-0 text-4xl text-red-500">
            <FaTools />
          </div>
          <div className="ml-4">
            <h4 className="text-gray-800 text-lg font-semibold">Total Services</h4>
            <p className="text-gray-600 text-xl font-bold">10</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
          <div className="flex-shrink-0 text-4xl text-blue-500">
            <FaCalendarDay />
          </div>
          <div className="ml-4">
            <h4 className="text-gray-800 text-lg font-semibold">Upcoming Services</h4>
            <p className="text-gray-600 text-xl font-bold">2</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="w-120 bg-white rounded-lg shadow-lg">
          <div className="p-4 border-b border-gray-400 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-700">Notifications</h2>
            <button
              onClick={clearNotifications}
              className="text-md text-blue-500 hover:underline"
            >
              Clear All
            </button>
          </div>
          <div className="p-4 h-100 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <div
                  key={index}
                  className="flex items-center p-2 border-b border-gray-200"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 mr-3">
                    <FaEnvelope />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-medium text-gray-700">
                      {notification.title}
                    </p>
                    <p className="text-md text-gray-500">{notification.message}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center">No notifications</p>
            )}
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col">
          <h4 className="text-gray-800 text-xl font-semibold mb-4">My Service Bookings</h4>
          <div className="w-full h-64 flex items-center justify-center">
            <Pie data={jobStatusData} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* <div className="bg-white shadow-lg rounded-lg p-6">
          <h4 className="text-gray-800 text-xl font-semibold mb-4">Jobs Completed This Week</h4>
          <ul className="divide-y divide-gray-200">
            {metrics.jobsCompletedThisWeek.map(job => (
              <li key={job.id} className="py-2 flex justify-between items-center">
                <div>
                  <p className="text-gray-600 font-bold">{job.customerName}</p>
                  <p className="text-gray-600">Vehicle Number: {job.vehicleNumber}</p>
                  <p className="text-gray-600">Model: {job.model}</p>
                </div>
              </li>
            ))}
          </ul>
        </div> */}

        {/* <div className="bg-white shadow-lg rounded-lg p-6">
          <h4 className="text-gray-800 text-xl font-semibold mb-4">Pending Payments</h4>
          <ul className="divide-y divide-gray-200">
            {metrics.pendingPayments.map(payment => (
              <li key={payment.id} className="py-2 flex justify-between items-center">
                <div>
                  <p className="text-gray-600 font-bold">{payment.customerName}</p>
                  <p className="text-gray-600">Vehicle Number: {payment.vehicleNumber}</p>
                  <p className="text-gray-600">Model: {payment.model}</p>
                </div>
                <p className="text-gray-600 font-bold">LKR {payment.amount}</p>
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
