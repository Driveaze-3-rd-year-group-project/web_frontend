import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlinePayment } from "react-icons/md";

const Billings = () => {
  const navigate = useNavigate();

  const handleClick = (item) => {
    navigate('/billinfo', { state: item }); // Use the item object as state
  };

  // const members = [
  //   {
  //     brand: "Toyota-Corolla",
  //     date: "01/04/2023",
  //     vehi_no: "WP-8721",
  //     description: "Routine Service",
  //     status: "Completed",
  //     cost:12000,
  //   },
  //   {
  //     brand: "BMW-X3",
  //     date: "01/08/2023",
  //     vehi_no: "CBH-1312",
  //     description: "Routine Service",
  //     status: "Completed",
  //     cost:12000,
  //   },
  //   {
  //     brand: "Nissan-Caravan",
  //     date: "23/04/2023",
  //     vehi_no: "NC-9033",
  //     description: "Engine Replacement",
  //     status: "Pending",
  //     cost:402000,
  //   },
  // ];

  // return (
  //   <div className="max-w-2xl mx-auto px-4 mt-20">
  //     <div className="items-start justify-between sm:flex">
  //       <div>
  //         <h4 className="text-gray-800 text-xl font-bold">Payments and Bills</h4>
  //       </div>
  //     </div>
  //     <div className="h-px bg-gray-200 border-t border-gray-400 mt-4 mb-2"></div>
  //     <ul className="mt-8 divide-y">
  //       {members.map((item, idx) => (
  //         <li key={idx} className="py-5 flex items-start justify-between">
  //           <div className="flex gap-3">
  //             <MdOutlinePayment size="35" className="mr-3" />
  //             <div>
  //               <span className="block text-sm text-gray-700 font-semibold">
  //                 {item.date}
  //               </span>
  //               <span className="block text-sm text-gray-600">{item.vehi_no}</span>
  //             </div>
  //             <div>
  //               <span
  //                 className={`block text-sm text-gray-700 font-semibold ${
  //                   item.status === "Pending" ? "text-red-500" : ""
  //                 }`}
  //               >
  //                 <div className='font-semibold'>{item.cost} LKR</div>
  //               </span>
  //               <span
  //                 className={`block text-sm text-gray-700 font-semibold ${
  //                   item.status === "Pending" ? "text-red-500" : ""
  //                 }`}
  //               >
  //                 {item.status}
  //               </span>
  //             </div>
  //           </div>
  //           <button
  //             className="px-4 py-2 text-white bg-indigo-600 rounded duration-150 hover:bg-indigo-500 active:bg-indigo-700"
  //             onClick={() => handleClick(item)}
  //           >
  //             Info
  //           </button>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
  const tableItems = [
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
  ]

  const labelColors = {
    "Completed": {
        color: "text-green-600",
    },
    "Pending": {
        color: "text-red-600",
    },
  }

  return (
    <div className="pt-14 max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="items-start justify-between md:flex">
            <div className="max-w-lg">
                <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                    Payments
                </h3>
            </div>
            <div className="mt-3 md:mt-0">

            </div>
        </div>
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
            <table className="w-full table-auto text-sm text-left">
                <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                    <tr>
                        <th className="py-3 px-6">Vehicle Number</th>
                        <th className="py-3 px-6">Date</th>
                        <th className="py-3 px-6">Description</th>
                        <th className="py-3 px-6">Status</th>
                        <th className="py-3 px-6">Cost</th>
                        <th className="py-3 px-6">Action</th>

                    </tr>
                </thead>
                <tbody className="text-gray-600 divide-y">
                    {
                        tableItems.map((item, idx) => (
                            <tr key={idx}>
                                <td className="px-6 py-4 whitespace-nowrap">{item.vehi_no}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.description}</td>
                                <td className={`py-2 px-3 rounded-full font-semibold text-xs ${labelColors[item?.status]?.color || ""}`}>{item.status}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.cost}</td>
                                <td className="py-0  pl-3 whitespace-nowrap">
                                    <button href="javascript:void()" className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150" onClick={() => handleClick(item)}>
                                        Details
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
  );

};

export default Billings;
