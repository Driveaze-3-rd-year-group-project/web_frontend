import React, { useState } from 'react'

const RepairVehicles = () => {
  //
  const [searchTerm, setSearchTerm] = useState('');
  const tableItems = [
    {
      vehicleID: "V001",
      numberPlate: "ABC-1234",
      vehicleType: "Car",
      owner: "Liam James"
    },
    {
      vehicleID: "V002",
      numberPlate: "XYZ-5678",
      vehicleType: "Motorbike",
      owner: "Olivia Emma"
    },
    {
      vehicleID: "V003",
      numberPlate: "LMN-2468",
      vehicleType: "Truck",
      owner: "William Benjamin"
    },
    {
      vehicleID: "V004",
      numberPlate: "QRS-1357",
      vehicleType: "Van",
      owner: "Henry Theodore"
    },
    {
      vehicleID: "V005",
      numberPlate: "TUV-9753",
      vehicleType: "SUV",
      owner: "Amelia Elijah"
    },
]
//
const handleSearchChange = (e) => {
  setSearchTerm(e.target.value);
};

return (
    <div className="mt-20 max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="items-start justify-between md:flex">
            <div className="max-w-lg">
                <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                    Repairing Vehicle List
                </h3>
            </div>
            <div className="mt-3 md:mt-0 flex items-center">
                <form
                    onSubmit={(e) => e.preventDefault()} 
                    className="max-w-md px-4 mx-auto mt-12">
                    <div className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>

                        <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search members..."
                        className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                        />

                    </div>
                </form>
                
              {/* <button
                className="px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
              >
                Search
              </button> */}
                  
            </div>
        </div>
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
            <table className="w-full table-auto text-sm text-left">
                <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                    <tr>
                        <th className="py-3 px-6">Vehicle ID</th>
                        <th className="py-3 px-6">Number Plate</th>
                        <th className="py-3 px-6">Vehicle Type</th>
                        <th className="py-3 px-6">Owner</th>
                        <th className="py-3 px-6">Action</th>

                    </tr>
                </thead>
                <tbody className="text-gray-600 divide-y">
                    {tableItems
                    
                    .filter((item) =>
                      item.vehicleID.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      item.numberPlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      item.vehicleType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      item.owner.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    
                    .map((item, idx) => (
                            <tr key={idx}>
                                <td className="px-6 py-4 whitespace-nowrap">{item.vehicleID}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.numberPlate}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.vehicleType}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.owner}</td>
                                <td className="text-left px-6 whitespace-nowrap">
                                    <a href="javascript:void()" className="py-2 px-2 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                                        History
                                    </a>
                                    {/* <button href="javascript:void()" className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
                                        Delete
                                    </button> */}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
)
}

export default RepairVehicles