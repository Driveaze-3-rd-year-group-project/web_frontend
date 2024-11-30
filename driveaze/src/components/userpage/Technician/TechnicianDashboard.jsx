import React, { useState, useEffect } from "react";
import { FaWarehouse, FaExclamationCircle, FaChartLine, FaEnvelope } from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import InventoryService from "../../service/InventoryService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = ({ token }) => {
  const [metrics, setMetrics] = useState({
    inventoryItemsCount: 0,
    itemsToRefill: 0,
    itemsExceedingInitialCount: 0,
    weeklyInventoryChanges: [50, 60, 55, 70, 65, 80, 75], // Dummy data for now
  });

  const [notifications, setNotifications] = useState([
    { title: "Upcoming Service", message: "You have an upcoming service this week." },
    { title: "20% off on all services", message: "This month we offer 20% off for all services." },
    { title: "New Message", message: "You have received a new message." },
    { title: "Update Available", message: "A new update is available." },
    { title: "New Message", message: "You have received a new message." },
  ]); // Initialize notifications state

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await InventoryService.getStatistic(token); // Use the token prop directly
      if (response.statusCode === 200) {
        setMetrics((prevMetrics) => ({
          ...prevMetrics,
          inventoryItemsCount: response.details.totalItems,
          itemsToRefill: response.details.belowTenItems,
          itemsExceedingInitialCount: response.details.overStockItems,
        }));
      } else {
        toast.error(response.message || "Failed to get Details!");
      }
    } catch (error) {
      console.error("Failed to fetch inventory statistics", error);
      toast.error(error.message || "Failed to get Details!");
    }
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const inventoryData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Inventory Changes",
        data: metrics.weeklyInventoryChanges,
        borderColor: "#4c51bf",
        backgroundColor: "rgba(76, 81, 191, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
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
      <h3 className="text-gray-800 text-xl font-bold sm:text-2xl mb-6">Technician Dashboard</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
          <div className="flex-shrink-0 text-4xl text-blue-500">
            <FaWarehouse />
          </div>
          <div className="ml-4">
            <h4 className="text-gray-800 text-lg font-semibold">Today Completed Jobs</h4>
            <p className="text-gray-600 text-xl font-bold">{metrics.inventoryItemsCount}</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
          <div className="flex-shrink-0 text-4xl text-red-500">
            <FaExclamationCircle />
          </div>
          <div className="ml-4">
            <h4 className="text-gray-800 text-lg font-semibold">Today Pending Jobs</h4>
            <p className="text-gray-600 text-xl font-bold">{metrics.itemsToRefill}</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
          <div className="flex-shrink-0 text-4xl text-green-500">
            <FaChartLine />
          </div>
          <div className="ml-4">
            <h4 className="text-gray-800 text-lg font-semibold">Today Working Hours</h4>
            <p className="text-gray-600 text-xl font-bold">{metrics.itemsExceedingInitialCount}</p>
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
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </div>
  );
};

export default Dashboard;
