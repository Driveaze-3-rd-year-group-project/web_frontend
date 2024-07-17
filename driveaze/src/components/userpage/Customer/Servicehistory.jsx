import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const ServiceHistory = () => {
  const location = useLocation();
  const { brand, model } = location.state || {}; // Make sure to use the correct keys

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
    <div className="max-w-screen-xl mx-auto p-10 shadow-lg ml-5 mt-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{brand}</h1>
          <p className="text-gray-600">
            {model || "No model available."}
          </p>
        </div>
        <button className="bg-deepblue hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
          Download service history
        </button>
      </div>
      <div className="h-px bg-gray-200 border-t border-gray-400 my-4"></div>
     
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="mt-12 shadow-sm border rounded-lg overflow-hidden">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="text-deepblue bg-dered font-bold py-3 px-6">Service Number</th>
                <th className="text-deepblue  bg-dered font-bold py-3 px-6">Date</th>
                <th className="text-deepblue  bg-dered font-bold py-3 px-6">Title</th>
                <th className="text-deepblue  bg-dered font-bold py-3 px-6"></th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {tableItems.map((item, idx) => (
                <React.Fragment key={idx}>
                  <tr>
                    <td className="bg-deepblue text-white px-6 py-4 whitespace-nowrap">{item.SN}</td>
                    <td className="bg-deepblue text-white px-6 py-4 whitespace-nowrap">{item.Date}</td>
                    <td className="bg-deepblue text-white px-6 py-4 whitespace-nowrap">{item.title}</td>
                    <td className="bg-deepblue text-white px-6 py-4 whitespace-nowrap">
                      <button
                        className="bg-dered hover:bg-blue-700 px-3 py-1 rounded font-bold text-white"
                        onClick={() => handleRowClick(idx)}
                      >
                        {expandedRows[idx] ? 'Collapse' : 'Details'}
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="4" className="border-1  border-black px-6 py-0 whitespace-nowrap">
                      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedRows[idx] ? 'max-h-40' : 'max-h-0'}`}>
                        <p className="text-deepblue p-4">{item.content}</p>
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
  );
};

export default ServiceHistory;
