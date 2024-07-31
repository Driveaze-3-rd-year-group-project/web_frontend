import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { FaWrench, FaCheckCircle, FaBoxes, FaUserCog } from 'react-icons/fa';

const SupervisorDashboard = () => {
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPageIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const announcements = [
    { title: 'System Maintenance Notice', details: 'Due to scheduled maintenance, our services will be unavailable on 20/08/2024 from 9 AM to 12 PM.' },
    { title: 'Announcement 2', details: 'Details of announcement 2' },
    { title: 'Announcement 3', details: 'Details of announcement 3' },
    { title: 'Announcement 4', details: 'Details of announcement 4' },
  ];

  const summaryData = [
    { title: 'Repairing', count: '7', icon: FaWrench },
    { title: 'Completed', count: '10', icon: FaCheckCircle },
    { title: 'Inventory item', count: '100', icon: FaBoxes },
    { title: 'Technicians', count: '30', icon: FaUserCog },
  ];

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Completed Vehicles',
        data: [10, 28, 27, 39, 35, 44],
        fill: false,
        backgroundColor: 'rgba(0, 123, 255, 0.5)',
        borderColor: 'rgba(0, 123, 255, 1)',
      },
    ],
  };

  return (
    <div className="mt-14 max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-start justify-between md:flex">
      <div className="max-w-lg">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
          Dashboard
        </h3>
      </div>
      </div>
      <main className="p-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {summaryData.map((data, index) => (
            <SummaryCard key={index} title={data.title} count={data.count} Icon={data.icon} />
          ))}
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-2/3">
            <div className="p-4 bg-white rounded shadow">
              <SectionTitle title="Monthly Repairs" />
              <Line data={chartData} />
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <div className="space-y-4">
              {announcements.map((announcement, index) => (
                <AnnouncementCard key={index} title={announcement.title} details={announcement.details} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const AnnouncementCard = ({ title, details }) => (
  <div className="p-4 bg-white rounded shadow">
    <h3 className="font-bold text-lg">{title}</h3>
    <p className="mt-2 text-sm">{details}</p>
  </div>
);

const SummaryCard = ({ title, count, Icon }) => (
  <div className="p-4 bg-white rounded shadow flex justify-between items-center">
    <div>
      <h4 className="font-semibold">{title}</h4>
      <p className="text-2xl text-blue-900 font-bold">{count}</p>
    </div>
    <Icon className="text-3xl text-gray-400" />
  </div>
);

const SectionTitle = ({ title }) => (
  <div className="my-4 p-2 rounded">
    <h2 className="text-xl font-semibold">{title}</h2>
  </div>
);

export default SupervisorDashboard;