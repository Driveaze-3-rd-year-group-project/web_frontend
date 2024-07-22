import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlinePayment } from "react-icons/md";

const Billings = () => {
  const navigate = useNavigate();

  const handleClick = (item) => {
    navigate('/billinfo', { state: item }); // Use the item object as state
  };

  const members = [
    {
      brand: "Toyota-Corolla",
      date: "01/04/2023",
      vehi_no: "WP-8721",
      description: "Routine Service",
      status: "Completed",
      cost:12000,
    },
    {
      brand: "BMW-X3",
      date: "01/08/2023",
      vehi_no: "CBH-1312",
      description: "Routine Service",
      status: "Completed",
      cost:12000,
    },
    {
      brand: "Nissan-Caravan",
      date: "23/04/2023",
      vehi_no: "NC-9033",
      description: "Engine Replacement",
      status: "Pending",
      cost:402000,
    },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 mt-20">
      <div className="items-start justify-between sm:flex">
        <div>
          <h4 className="text-gray-800 text-xl font-bold">Payments and Bills</h4>
        </div>
      </div>
      <div className="h-px bg-gray-200 border-t border-gray-400 mt-4 mb-2"></div>
      <ul className="mt-8 divide-y">
        {members.map((item, idx) => (
          <li key={idx} className="py-5 flex items-start justify-between">
            <div className="flex gap-3">
              <MdOutlinePayment size="35" className="mr-3" />
              <div>
                <span className="block text-sm text-gray-700 font-semibold">
                  {item.date}
                </span>
                <span className="block text-sm text-gray-600">{item.vehi_no}</span>
              </div>
              <div>
                <span
                  className={`block text-sm text-gray-700 font-semibold ${
                    item.status === "Pending" ? "text-red-500" : ""
                  }`}
                >
                  <div className='font-semibold'>{item.cost} LKR</div>
                </span>
                <span
                  className={`block text-sm text-gray-700 font-semibold ${
                    item.status === "Pending" ? "text-red-500" : ""
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>
            <button
              className="px-4 py-2 text-white bg-indigo-600 rounded duration-150 hover:bg-indigo-500 active:bg-indigo-700"
              onClick={() => handleClick(item)}
            >
              Info
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Billings;
