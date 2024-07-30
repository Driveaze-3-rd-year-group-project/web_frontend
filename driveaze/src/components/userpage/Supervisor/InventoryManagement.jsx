import React, { useState } from 'react';
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";

const InventoryManagement = () => {
    const [jobs, setJobs] = useState([
        {
            title: "Screwdriver",
            initcount: 100,
            curentcount: 56,
            adjustCount: 0,
        },
        {
            title: "Hammer",
            initcount: 10,
            curentcount: 5,
            adjustCount: 0,
        },
        {
            title: "Wrench Set",
            initcount: 30,
            curentcount: 16,
            adjustCount: 0,
        },
        {
            title: "Wrench Set",
            initcount: 200,
            curentcount: 80,
            adjustCount: 0,
        },
    ]);

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleUpdate = (idx) => {
        console.log(`Update item at index: ${idx}`);
    };

    const handleDelete = (idx) => {
        console.log(`Delete item at index: ${idx}`);
    };

    const handleAdjustChange = (index, value) => {
        const updatedJobs = [...jobs];
        updatedJobs[index].adjustCount = parseInt(value, 10) || 0;
        setJobs(updatedJobs);
    };

    const handleApplyAdjustment = (index, isIncrement) => {
        const updatedJobs = [...jobs];
        const job = updatedJobs[index];
        if (isIncrement) {
            job.curentcount += job.adjustCount;
        } else {
            job.curentcount = Math.max(0, job.curentcount - job.adjustCount);
        }
        job.adjustCount = 0;
        setJobs(updatedJobs);
    };

    return (
        <section className="mt-20 max-w-screen-lg mx-auto px-4 md:px-8 ">
            
            <div className="flex justify-end items-center mt-5 md:mt-0 absolute top-5 right-0 p-4">
                <form
                    onSubmit={(e) => e.preventDefault()} 
                    className="max-w-md">
                    <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>

                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search items..."
                        className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                    />
                    </div>
                </form>
            </div>


            <ul className="mt-12 space-y-6">
                {
                    jobs.filter((job) => 
                        job.title.toLowerCase().includes(searchTerm.toLowerCase())
                    ).map((item, idx) => (
                        <li key={idx} className="p-5 bg-white rounded-md shadow-sm">
                            <div>
                                <div className="justify-between sm:flex">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-medium text-cyan-600">
                                            {item.title}
                                        </h3>
                                        <p className="text-black mt-2 pr-2 text-lg font-bold">
                                            Initial Count: {item.initcount}
                                        </p>
                                    </div>
                                    <div className="mt-5 space-y-4 text-sm sm:mt-0 sm:space-y-2">
                                        <span className="flex items-center text-gray-500 text-2xl font-bold">
                                            {item.curentcount}
                                        </span>
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="number"
                                                className="w-16 border rounded-md text-center"
                                                value={item.adjustCount}
                                                onChange={(e) => handleAdjustChange(idx, e.target.value)}
                                            />
                                            <button
                                                className="bg-gray-300 text-black px-2 py-1 rounded-md hover:bg-gray-400"
                                                onClick={() => handleApplyAdjustment(idx, false)}
                                            >
                                                -
                                            </button>
                                            <button
                                                className="bg-gray-300 text-black px-2 py-1 rounded-md hover:bg-gray-400"
                                                onClick={() => handleApplyAdjustment(idx, true)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 items-center space-y-4 text-sm sm:flex sm:space-x-4 sm:space-y-0">
                                    <button
                                        onClick={() => handleUpdate(idx)}
                                        className="py-2 px-3 font-medium text-white bg-green-600 hover:bg-green-500 duration-150 rounded-lg flex items-center justify-center"
                                    >
                                        <FaRegEdit className="text-lg text-white" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(idx)}
                                        className="py-2 px-3 font-medium text-white bg-red-600 hover:bg-red-500 duration-150 rounded-lg flex items-center justify-center"
                                    >
                                        <FaRegTrashAlt className="text-lg text-white" />
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </section>
    );
}

export default InventoryManagement;
