import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function OngoingJob() {
    const [searchTerm, setSearchTerm] = useState('');
  const members = [
    {
        icon: "https://i.pinimg.com/736x/7b/51/cc/7b51cc879d02e11f06c34858f850424c.jpg",
      numberPlate: "ABC-1234",
      vehicleModel: "Toyota Corolla"
    },
    {
        icon: "https://i.pinimg.com/736x/7b/51/cc/7b51cc879d02e11f06c34858f850424c.jpg",
      numberPlate: "XYZ-5678",
      vehicleModel: "Honda CBR"
    },
    {
        icon: "https://i.pinimg.com/736x/7b/51/cc/7b51cc879d02e11f06c34858f850424c.jpg",
      numberPlate: "LMN-2468",
      vehicleModel: "Ford F-150"
    },
    {
        icon: "https://i.pinimg.com/736x/7b/51/cc/7b51cc879d02e11f06c34858f850424c.jpg",
      numberPlate: "QRS-1357",
      vehicleModel: "Mercedes Sprinter"
    },
    {
        icon: "https://i.pinimg.com/736x/7b/51/cc/7b51cc879d02e11f06c34858f850424c.jpg",
      numberPlate: "TUV-9753",
      vehicleModel: "BMW X5"
    },
]
//
const handleSearchChange = (e) => {
  setSearchTerm(e.target.value);
};

return (
    <div className="mt-14 max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="items-start justify-between md:flex">
            <div className="max-w-lg">
                <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                    Ongoing Jobs
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
                  
            </div>
        </div>
          <ul className="mt-12 divide-y">
              {
                  members
                  
                  .filter((item) =>
                    item.numberPlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.vehicleModel.toLowerCase().includes(searchTerm.toLowerCase()) 
                  )
                  
                  .map((item, idx) => (
                    <li key={idx} className="py-5 flex items-start justify-between">
                      <div className="flex gap-3">
                        <img src={item.icon} className="flex-none w-12 h-12 rounded-full" />
                        <div>
                          <span className="block text-sm text-gray-700 font-semibold">{item.numberPlate}</span>
                          <span className="block text-sm text-gray-600">{item.vehicleModel}</span>
                        </div>
                      </div>
                      <Link
                        to={`/viewongoingjobs/${item.numberPlate}`}
                        className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150 mb-2">
                          View
                      </Link>
                    </li>

                  ))
              }
          </ul>
        </div>
    );
}

export default OngoingJob;
