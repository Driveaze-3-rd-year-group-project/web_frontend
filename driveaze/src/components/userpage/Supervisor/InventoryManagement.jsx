import React, { useState } from 'react';
import { FaRegTrashAlt, FaRegEdit, FaTimes } from "react-icons/fa";

const InventoryManagement = () => {
    const [jobs, setJobs] = useState([
        {
            title: "Break Oil Can",
            initcount: 100,
            curentcount: 56,
            adjustCount: 0,
        },
        {
            title: "Break Pad",
            initcount: 10,
            curentcount: 5,
            adjustCount: 0,
        },
        {
            title: "Radiator Grille",
            initcount: 30,
            curentcount: 16,
            adjustCount: 0,
        },
        {
            title: "Air Vents",
            initcount: 200,
            curentcount: 80,
            adjustCount: 0,
        },
        {
            title: "Parking Sensors",
            initcount: 30,
            curentcount: 16,
            adjustCount: 0,
        },
        {
            title: "Air Filter",
            initcount: 200,
            curentcount: 80,
            adjustCount: 0,
        },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [currentJob, setCurrentJob] = useState(null);
    const [currentJobIndex, setCurrentJobIndex] = useState(null);
    const [showAddPopup, setShowAddPopup] = useState(false);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleUpdate = (idx) => {
        setCurrentJob(jobs[idx]);
        setCurrentJobIndex(idx);
        setShowPopup(true);
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

    const closePopup = () => {
        setShowPopup(false);
        setCurrentJob(null);
        setCurrentJobIndex(null);
    };

    const handleSaveUpdate = (updatedJob) => {
        const updatedJobs = [...jobs];
        updatedJobs[currentJobIndex] = updatedJob;
        setJobs(updatedJobs);
        closePopup();
    };

    const handleAddNewItem = (newItem) => {
        setJobs([...jobs, newItem]);
        closeAddPopup();
    };

    const closeAddPopup = () => {
        setShowAddPopup(false);
    };

    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
            <div className="flex justify-between items-center mb-1">
                <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                    Inventory Management
                </h3>
                <div className="mt-3 md:mt-0 flex items-center space-x-4">
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="flex max-w-md mx-auto"
                    >
                        <div className="relative w-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                            />
                        </div>
                    </form>
                    {/* <button
                        onClick={() => setShowAddPopup(true)}
                        className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
                    >
                        Add Item
                    </button> */}

                    <button
                        onClick={() => setShowAddPopup(true)}
                        className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150 mb-2"
                    >
                        Add Item
                    </button>


                </div>
            </div>
            <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                {
                    jobs.filter((job) => 
                        job.title.toLowerCase().includes(searchTerm.toLowerCase())
                    ).map((item, idx) => (
                        <li key={idx} className="p-5 bg-white rounded-md shadow-md">
                            <div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-xl font-medium text-cyan-600">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-700 mt-2 text-lg font-bold">
                                            Current Count: {item.curentcount}
                                        </p>
                                        <p className="text-gray-700 mt-2 text-lg font-bold">
                                            Initial Count: {item.initcount}
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <input
                                            type="number"
                                            className="w-16 border rounded-md text-center px-2 py-1"
                                            value={item.adjustCount}
                                            onChange={(e) => handleAdjustChange(idx, e.target.value)}
                                        />
                                        <button
                                            className="bg-gray-300 text-black px-3.5 py-1.5 text-lg rounded-md hover:bg-gray-400"
                                            onClick={() => handleApplyAdjustment(idx, false)}
                                        >
                                            -
                                        </button>

                                        <button
                                            className="bg-gray-300 text-black px-3 py-2 rounded-md hover:bg-gray-400"
                                            onClick={() => handleApplyAdjustment(idx, true)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-4 flex space-x-4">
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
            {showPopup && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                        <div className="flex justify-between items-center pb-3 relative">
                            <button 
                                onClick={closePopup} 
                                className="absolute top-0 right-0 text-gray-600 hover:text-gray-900"
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <ServiceBookingDetails job={currentJob} onSave={handleSaveUpdate} closePopup={closePopup} />
                    </div>
                </div>
            )}
            {showAddPopup && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                        <div className="flex justify-between items-center pb-3 relative">
                            <button 
                                onClick={closeAddPopup} 
                                className="absolute top-0 right-0 text-gray-600 hover:text-gray-900"
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <AddNewItemForm onSave={handleAddNewItem} closePopup={closeAddPopup} />
                    </div>
                </div>
            )}
        </div>
    );
}

const ServiceBookingDetails = ({ job, onSave, closePopup }) => {
    const [title, setTitle] = useState(job.title);
    const [initcount, setInitcount] = useState(job.initcount);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...job, title, initcount });
    };

    return (
        <main className="py-14">
            <div className="max-w-screen-xl mx-auto my-auto px-4 text-gray-600 md:px-8">
                <div className="max-w-lg mx-auto space-y-3 sm:text-center">
                    <h3 className="text-indigo-600 text-xl font-semibold">
                        Update Inventory Item
                    </h3>
                </div>
                <div className="mt-12 max-w-lg mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="font-medium">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="font-medium">Initial Count</label>
                            <input
                                type="number"
                                value={initcount}
                                onChange={(e) => setInitcount(parseInt(e.target.value, 10) || 0)}
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                        </div>
                        
                        <div className="flex items-center justify-between mt-6">
                            <button
                                type="button"
                                onClick={closePopup}
                                className="w-40 h-12 flex items-center justify-center text-white font-medium bg-red-500 hover:bg-red-400 active:bg-red-600 mt-6 rounded-lg duration-150"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                className="w-40 h-12 flex items-center justify-center text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 mt-6 rounded-lg duration-150"
                            >
                                Save
                            </button>    
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};

const AddNewItemForm = ({ onSave, closePopup }) => {
    const [title, setTitle] = useState("");
    const [initcount, setInitcount] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ title, initcount, curentcount: initcount, adjustCount: 0 });
    };

    return (
        <main className="py-14">
            <div className="max-w-screen-xl mx-auto my-auto px-4 text-gray-600 md:px-8">
                <div className="max-w-lg mx-auto space-y-3 sm:text-center">
                    <h3 className="text-indigo-600 text-xl font-semibold">
                        Add New Inventory Item
                    </h3>
                </div>
                <div className="mt-12 max-w-lg mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="font-medium">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="font-medium">Initial Count</label>
                            <input
                                type="number"
                                value={initcount}
                                onChange={(e) => setInitcount(parseInt(e.target.value, 10) || 0)}
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                        </div>
                        <div className="flex items-center justify-between mt-6">
                            <button
                                type="button"
                                onClick={closePopup}
                                className="w-40 h-12 flex items-center justify-center text-white font-medium bg-red-500 hover:bg-red-400 active:bg-red-600 mt-6 rounded-lg duration-150"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                className="w-40 h-12 flex items-center justify-center text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 mt-6 rounded-lg duration-150"
                            >
                                Save
                            </button>    
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default InventoryManagement;
