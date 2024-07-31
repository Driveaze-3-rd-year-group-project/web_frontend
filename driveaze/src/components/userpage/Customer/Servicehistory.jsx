import React, { useState } from 'react';
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import { useParams } from "react-router-dom";

const ServiceHistory = () =>{
  const location = useLocation();
  const vehicle = location.state;
  const { brand, vehicle_number } = location.state || {}; // Make sure to use the correct keys

  const [expandedRows, setExpandedRows] = useState({}); // State to track expanded rows

  const tableItems = [
    {
      SN: "01",
      Date: "3/16/2023",
      title: "Regular Maintenance",
      expand: "expand",
      content: "Changed oil, brake pads changed, fixed an oil leak, brake fluid replaced."
    },
    {
      SN: "02",
      Date: "9/16/2023",
      title: "Regular Maintenance",
      expand: "expand",
      content: "Changed oil, brake pads changed, fixed an oil leak, brake fluid replaced."
    },
    // Add more items with content
  ];

  const handleRowClick = (index) => {
    setExpandedRows({ ...expandedRows, [index]: !expandedRows[index] });
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
          {vehicle.vehicle_number} <span className='flex flex-col font-normal'>{vehicle.brand} {vehicle.model}</span>
        </h3>
       
        <button className="text-white bg-indigo-600 rounded duration-150 hover:bg-indigo-500 active:bg-indigo-700 font-bold py-2 px-4 rounded">
          Download Full History
        </button>

          
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-gray-700">
                <strong>Manufactured Year</strong> {vehicle.manufactured_year}
              </p>
              <p className="font-semibold text-gray-700">
                <strong>Registered Date</strong> {vehicle.registered_date}
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">
                <strong>Last Service -</strong> 7/16/2024
                
              </p>
              <p className="font-semibold text-gray-700">
                <strong>Next Service</strong> 7/16/2024
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="mt-12 shadow-sm border rounded-lg overflow-hidden">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="text-deepblue bg-dered font-bold py-3 px-6">Service Number</th>
                <th className="text-deepblue  bg-dered font-bold py-3 px-6">Date</th>
                <th className="text-deepblue  bg-dered font-bold py-3 px-6">Summary</th>
                <th className="text-deepblue  bg-dered font-bold py-3 px-6"></th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {tableItems.map((item, idx) => (
                <React.Fragment key={idx}>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">{item.SN}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.Date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="text-sm text-white duration-150 bg-indigo-600 rounded-full hover:bg-indigo-500 active:bg-indigo-700hover:bg-blue-700 px-3 py-1 rounded font-bold"
                        onClick={() => handleRowClick(idx)}
                      >
                        {expandedRows[idx] ? 'Collapse' : 'Details'}
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="4" className="border-1  border-black px-6 py-0 whitespace-nowrap">
                      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedRows[idx] ? 'max-h-40' : 'max-h-0'}`}>
                        <p className="text-deepblue font-bold  p-4">{item.content}</p>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      </div>
    </div>
  );
};

export default ServiceHistory;

