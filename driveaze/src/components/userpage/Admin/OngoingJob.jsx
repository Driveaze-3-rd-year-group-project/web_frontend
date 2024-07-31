import React from 'react';

const tableItems = [
    {
        Customername: "Liam James",
        vehicletype: "BMW",
        Incomingdate: "2024/03/23",
        amount: "$100K"
    },
    {
        Customername: "Olivia Emma",
        vehicletype: "Toyota",
        Incomingdate: "2023/06/03",
        amount: "$90K"
    },
    {
        Customername: "a Emma",
        vehicletype: "Benz",
        Incomingdate: "2023/05/03",
        amount: "$50K"
    },
    {
        Customername: "Olma",
        vehicletype: "Hyundai",
        Incomingdate: "2023/06/05",
        amount: "$10K"
    },
];

function OngoingJob() {
    const handleView = (customerName) => {
        alert(`View details for ${customerName}`);
        // Implement your logic to view details
    };

    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="text-center mb-8">
                <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                    Ongoing Jobs
                </h3>
                <p className="text-gray-600 mt-2">
                    Manage current jobs
                </p>
            </div>

            <div className="mb-6 flex justify-center">
                <form onSubmit={(e) => e.preventDefault()} className="relative w-full max-w-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 right-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full py-3 pl-10 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                    />
                </form>
            </div>

            <div className="shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 px-6">Customer name</th>
                            <th className="py-3 px-6">Vehicle Type</th>
                            <th className="py-3 px-6">Incoming date</th>
                            <th className="py-3 px-6">Amount</th>
                            <th className="py-3 px-6">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {tableItems.map((item, idx) => (
                            <tr key={idx}>
                                <td className="px-6 py-4 whitespace-nowrap">{item.Customername}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.vehicletype}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.Incomingdate}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.amount}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => handleView(item.Customername)}
                                        className="text-indigo-600 hover:text-indigo-900"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OngoingJob;
