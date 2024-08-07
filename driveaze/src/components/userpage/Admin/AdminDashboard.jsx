import React from 'react'
import { FaUsers, FaUsersCog, FaCar, FaToolbox} from "react-icons/fa";
import { Line, Bar, Pie  } from 'react-chartjs-2';
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

  const dataPie = {
      labels: ['Oil Change', 'Brake Repair', 'Tire Change', 'Engine Repair'],
      datasets: [
          {
              data: [300, 50, 100, 150],
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
              hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
          },
      ],
  };

  
  return (
    <div className='grow p-8 mt-6'> 
      <h2 className='text-2xl font-bold mb-4'>Admin Dashboard</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
          <div className="flex-shrink-0 text-3xl text-blue-500">
            <FaUsers />
          </div>
          <div className="ml-4">
            <h4 className="text-gray-800 text-xl font-semibold">Customer Accounts</h4>
            <p className="text-gray-600 text-2xl font-bold">100</p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
          <div className="flex-shrink-0 text-3xl text-red-500">
            <FaUsersCog />
          </div>
          <div className="ml-4">
            <h4 className="text-gray-800 text-xl font-semibold">Staff Accounts</h4>
            <p className="text-gray-600 text-2xl font-bold">20</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
          <div className="flex-shrink-0 text-3xl text-green-500">
            <FaCar />
          </div>
          <div className="ml-4">
            <h4 className="text-gray-800 text-xl font-semibold">Total Vehicles</h4>
            <p className="text-gray-600 text-2xl font-bold">180</p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
          <div className="flex-shrink-0 text-3xl text-blue-500">
            <FaToolbox />
          </div>
          <div className="ml-4">
            <h4 className="text-gray-800 text-xl font-semibold">Ongoing Jobs</h4>
            <p className="text-gray-600 text-2xl font-bold">55</p>
          </div>
        </div>
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
        <div className='bg-white p-4 max-w-xl  rounded-lg shadow-md'>
          <h3 className='text-lg font-semibold mb-4'>Service Types Distribution</h3>
          <Pie data={dataPie} />
        </div>
        
        
      </div>
      
    </div>
  )
}

export default AdminDashboard