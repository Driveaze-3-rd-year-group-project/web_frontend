// import React from 'react'

// const VehicleHistory = () => {
//   return (
//     <div>SupervisorDashboard</div>
//   )
// }

// export default VehicleHistory

import React from 'react';

const VehicleHistory = () => {
  const repairRecords = [
    {
      date: "2023-07-10",
      repairDetails: "Engine repair"
    },
    {
      date: "2023-06-15",
      repairDetails: "Brake replacement"
    },
    {
      date: "2023-05-20",
      repairDetails: "Tire change"
    },
    {
      date: "2023-04-25",
      repairDetails: "Battery replacement"
    },
  ];

  return (
    <div className="mt-20 max-w-2xl mx-auto px-4">
      <div className="items-start justify-between sm:flex">
        <div>
          <h4 className="text-gray-800 text-xl font-semibold">Vehicle Repair History</h4>
          <p className="mt-2 text-gray-600 text-base sm:text-sm">Detailed history of vehicle repairs.</p>
        </div>
      </div>
      <ul className="mt-12 divide-y">
        {repairRecords.map((record, idx) => (
          <li key={idx} className="py-5 flex items-start justify-between">
            <div>
              <span className="block text-sm text-gray-700 font-semibold">{record.date}</span>
              <span className="block text-sm text-gray-600">{record.repairDetails}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VehicleHistory;
