import React from 'react';
import { FaCalendarDay, FaTasks, FaMoneyCheckAlt } from 'react-icons/fa';
import { Line, Doughnut } from 'react-chartjs-2';
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

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
      <h3 className="text-gray-800 text-xl font-bold sm:text-2xl mb-6">Receptionist Dashboard</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
          <div className="flex-shrink-0 text-3xl text-blue-500">
            <FaCalendarDay />
          </div>
          <div className="ml-4">
            <h4 className="text-gray-800 text-xl font-semibold">Online Bookings Today</h4>
            <p className="text-gray-600 text-2xl font-bold">{metrics.bookingsToday}</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
          <div className="flex-shrink-0 text-3xl text-green-500">
            <FaMoneyCheckAlt />
          </div>
          <div className="ml-4">
            <h4 className="text-gray-800 text-xl font-semibold">Physical Payments Today</h4>
            <p className="text-gray-600 text-2xl font-bold">LKR {metrics.physicalPaymentsToday}</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
          <div className="flex-shrink-0 text-3xl text-red-500">
            <FaTasks />
          </div>
          <div className="ml-4">
            <h4 className="text-gray-800 text-xl font-semibold">Ongoing Jobs</h4>
            <p className="text-gray-600 text-2xl font-bold">{metrics.ongoingJobs}</p>
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
            <Doughnut data={jobStatusData} />
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
