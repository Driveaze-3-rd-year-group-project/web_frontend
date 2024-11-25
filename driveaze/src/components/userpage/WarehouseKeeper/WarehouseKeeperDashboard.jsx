import React from 'react';
import { FaWarehouse, FaExclamationCircle, FaChartLine } from 'react-icons/fa';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);


const Dashboard = () => {
    // Dummy data for demonstration
    const metrics = {
        inventoryItemsCount: 120,
        itemsToRefill: 8,
        itemsExceedingInitialCount: 15,
        weeklyInventoryChanges: [50, 60, 55, 70, 65, 80, 75], // Example data for 7 days
        inventoryStatusDistribution: {
        refill: 8,
        normal: 97,
        overstock: 15,
        },
    };

    const inventoryData = {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], // Week days
        datasets: [
        {
            label: 'Inventory Changes',
            data: metrics.weeklyInventoryChanges,
            borderColor: '#4c51bf',
            backgroundColor: 'rgba(76, 81, 191, 0.2)',
            fill: true,
        },
        ],
    };

    // Data for inventory status distribution doughnut chart
    const inventoryStatusData = {
        labels: ['Refill Needed', 'Normal Stock', 'Overstocked'],
        datasets: [
        {
            label: 'Inventory Status',
            data: [
            metrics.inventoryStatusDistribution.refill,
            metrics.inventoryStatusDistribution.normal,
            metrics.inventoryStatusDistribution.overstock,
            ],
            backgroundColor: ['#ff5722','#191970', '#696969'], // Red, Green, Blue
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
              label: function (tooltipItem) {
                return `Items: ${tooltipItem.raw}`;
              },
            },
          },
        },
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      };
    
    return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl mb-6">Warehouse Keeper Dashboard</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Inventory Items Count */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
            <div className="flex-shrink-0 text-4xl text-blue-500">
            <FaWarehouse />
            </div>
            <div className="ml-4">
            <h4 className="text-gray-800 text-lg font-semibold">Inventory Items</h4>
            <p className="text-gray-600 text-xl font-bold">{metrics.inventoryItemsCount}</p>
            </div>
        </div>

        {/* Items to Refill */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
            <div className="flex-shrink-0 text-4xl text-orange-500">
            <FaExclamationCircle />
            </div>
            <div className="ml-4">
            <h4 className="text-gray-800 text-lg font-semibold">Items to Refill</h4>
            <p className="text-gray-600 text-xl font-bold">{metrics.itemsToRefill}</p>
            </div>
        </div>

        {/* Items Exceeding Initial Count */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
            <div className="flex-shrink-0 text-4xl text-green-500">
            <FaChartLine />
            </div>
            <div className="ml-4">
            <h4 className="text-gray-800 text-lg font-semibold">Overstocked Items</h4>
            <p className="text-gray-600 text-xl font-bold">{metrics.itemsExceedingInitialCount}</p>
            </div>
        </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Weekly Inventory Changes */}
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h4 className="text-gray-800 text-xl font-semibold mb-4">Weekly Inventory Changes</h4>
            <div className="w-full h-64">
            <Line data={inventoryData} options={options} />
            </div>
        </div>

        {/* Inventory Status Distribution */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col">
            <h4 className="text-gray-800 text-xl font-semibold mb-4">Inventory Status Distribution</h4>
            <div className="w-full h-64 flex items-center justify-center">
            <Doughnut data={inventoryStatusData} />
            </div>
        </div>
        </div>
    </div>
    );
};

export default Dashboard;
