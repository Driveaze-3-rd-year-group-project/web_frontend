import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const ServiceHistory = () => {
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
    <div className='max-w-screen-xl px-4 ml-10 mr-10 md:px-8 mt-14'>
       <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{vehicle_number}</h1>
          <p className="text-gray-600">
            {brand || "No vehicle_number available."}
          </p>
        </div>
         
        <button className="text-white bg-indigo-600 rounded duration-150 hover:bg-indigo-500 active:bg-indigo-700 font-bold py-2 px-4 rounded">
          Download Full History
        </button>
      </div>
    <div className="max-w-screen-xl mx-auto px-4 ml-5md:px-8 mt-14">
     
      <div className='mt-4 mb-2 flex justify-between'>
            <div className='flex flex-col justify-between justify-items-center'>
                <div className="text-sm text-gray-700 mb-1  font-semibold">Manufactured Year - <span className='font-normal'>{vehicle.manufactured_year}</span> </div>
                <div className="text-sm text-gray-700 mb-1  font-semibold">Registered Date - <span className='font-normal'>{vehicle.registered_date}</span> </div>
            </div>

            <div  className='flex flex-col justify-between justify-items-center'>
              <div className="text-sm text-gray-700 mb-2 font-semibold">Last service - <span className='font-normal'>7/16/2024</span></div>
              <div className="text-sm text-gray-700 mb-2  font-semibold">Next service - <span className='font-normal'>7/16/2024</span></div>

            </div>
        </div>
      <div className="h-px bg-gray-200 border-t border-gray-400 my-4"></div>
     
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
