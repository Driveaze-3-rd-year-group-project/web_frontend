import React, { useState, useEffect } from 'react';
import { FaWarehouse, FaExclamationCircle, FaChartLine } from 'react-icons/fa';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import InventoryService from "../../service/InventoryService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = ({ token }) => {
    const [metrics, setMetrics] = useState({
        inventoryItemsCount: 0,
        itemsToRefill: 0,
        itemsExceedingInitialCount: 0,
        weeklyInventoryChanges: [50, 60, 55, 70, 65, 80, 75], // Kept as dummy data
        inventoryStatusDistribution: {
            refill: 0,
            normal: 0,
            overstock: 0,
        },
    });

    useEffect(() => {
      fetchStatistics();
    }, []);

    const fetchStatistics = async () => {
      try {
          const token = localStorage.getItem('token');
          const response = await InventoryService.getStatistic(token);
          if (response.statusCode === 200) {
            // toast.success("Get Details successfully!");
            setMetrics(prevMetrics => ({
              ...prevMetrics,
              inventoryItemsCount: response.details.totalItems,
              itemsToRefill: response.details.belowTenItems,
              itemsExceedingInitialCount: response.details.overStockItems,
              inventoryStatusDistribution: {
                  refill: response.details.belowTenItems,
                  normal: response.details.normalStock,
                  overstock: response.details.overStockItems,
              }
            }));
          } else {
            setError(response.message);
            toast.error(response.message || 'Failed to get Details!');
          }
          
      } catch (error) {
          console.error('Failed to fetch inventory statistics', error);
          toast.error(response.message || 'Failed to get Details!');
      }
  };

    const inventoryData = {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
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
                backgroundColor: ['#ff5722','#191970', '#696969'],
                borderColor: '#fff',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `Items: ${tooltipItem.raw}`;
                    },
                },
            },
        },
        scales: {
            x: { beginAtZero: true },
            y: { beginAtZero: true },
        },
    };
    
    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl mb-6">Warehouse Keeper Dashboard</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
                    <div className="flex-shrink-0 text-4xl text-blue-500">
                        <FaWarehouse />
                    </div>
                    <div className="ml-4">
                        <h4 className="text-gray-800 text-lg font-semibold">Inventory Items</h4>
                        <p className="text-gray-600 text-xl font-bold">{metrics.inventoryItemsCount}</p>
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
                    <div className="flex-shrink-0 text-4xl text-orange-500">
                        <FaExclamationCircle />
                    </div>
                    <div className="ml-4">
                        <h4 className="text-gray-800 text-lg font-semibold">Items to Refill</h4>
                        <p className="text-gray-600 text-xl font-bold">{metrics.itemsToRefill}</p>
                    </div>
                </div>

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h4 className="text-gray-800 text-xl font-semibold mb-4">Weekly Inventory Changes</h4>
                    <div className="w-full h-64">
                        <Line data={inventoryData} options={options} />
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col">
                    <h4 className="text-gray-800 text-xl font-semibold mb-4">Inventory Status Distribution</h4>
                    <div className="w-full h-64 flex items-center justify-center">
                        <Doughnut data={inventoryStatusData} />
                    </div>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
        </div>
    );
};

export default Dashboard;