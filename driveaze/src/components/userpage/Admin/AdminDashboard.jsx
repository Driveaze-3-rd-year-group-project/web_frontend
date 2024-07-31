import React from 'react'
import Card from './DashboardComponents/Card'
import { FaUsers, FaUsersCog, FaCar, FaToolbox } from "react-icons/fa";
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, BarElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
ChartJS.register([LineElement, BarElement, PointElement, CategoryScale, LinearScale]);

const AdminDashboard = () => {
    const dataLine = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'Sales',
              data: [65, 59, 80, 81, 56, 55, 60],
              fill: false,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
          },
      ],
  };

  const dataBar = {
      labels: ['Product A', 'Product B', 'Product C', 'Product D'],
      datasets: [
          {
              label: 'Quantity',
              data: [12, 19, 3, 5],
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
          },
      ],
  };
  return (
    <div className='grow p-8'> 
      <h2 className='text-2xl mb-4'>Admin Dashboard</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
        <Card icon={<FaUsers />} title="Total Customers Registered" value="100" />
        <Card icon={<FaUsersCog />} title="Total Staff Members" value="20" />
        <Card icon={<FaCar />} title="Total Vehicles" value="180" />
        <Card icon={<FaToolbox />} title="Ongoing Jobs" value="55" />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <div className='bg-white p-4 rounded-lg shadow-md'>
          <h3 className='text-lg font-semibold mb-4'>Vehicles Serviced Monthly</h3>
          <Line data={dataLine} />
        </div>
        <div className='bg-white p-4 rounded-lg shadow-md'> 
          <h3 className='text-lg font-semibold mb-4'>Newly Registered Vehicles</h3>
          <Bar data={dataBar} />
        </div>
        <div className='bg-white p-4 rounded-lg shadow-md'> 
          <h3 className='text-lg font-semibold mb-4'>Income & Payments</h3>
          <Line data={dataBar} />
        </div>
        
      </div>
      
    </div>
  )
}

export default AdminDashboard