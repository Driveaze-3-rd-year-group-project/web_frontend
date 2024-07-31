import React from 'react';
import { FaCar, FaTasks, FaTools } from 'react-icons/fa';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

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
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        label: 'Job Status',
        data: [metrics.jobStatusDistribution.completed, metrics.jobStatusDistribution.pending],
        backgroundColor: ['#4caf50', '#ff5722'],
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

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
      <h3 className="text-gray-800 text-xl font-bold sm:text-2xl mb-6">Customer Dashboard</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
          <div className="flex-shrink-0 text-5xl text-blue-500">
            <FaCar />
          </div>
          <div className="ml-4">
            <h4 className="text-gray-800 text-lg font-semibold">My Vehicles</h4>
            <p className="text-gray-600 text-xl font-bold">3</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
          <div className="flex-shrink-0 text-5xl text-red-500">
            <FaTools />
          </div>
          <div className="ml-4">
            <h4 className="text-gray-800 text-lg font-semibold">Total Services</h4>
            <p className="text-gray-600 text-xl font-bold">10</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
          <div className="flex-shrink-0 text-5xl text-green-500">
            <FaTasks />
          </div>
          <div className="ml-4">
            <h4 className="text-gray-800 text-lg font-semibold">Upcoming Services</h4>
            <p className="text-gray-600 text-xl font-bold">2</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h4 className="text-gray-800 text-xl font-semibold mb-4">Online Bookings This Week</h4>
          <div className="w-full h-64">
            <Line data={bookingData} options={options} />
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col">
          <h4 className="text-gray-800 text-xl font-semibold mb-4">Job Status Distribution</h4>
          <div className="w-full h-64 flex items-center justify-center">
            <Pie data={jobStatusData} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
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
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
