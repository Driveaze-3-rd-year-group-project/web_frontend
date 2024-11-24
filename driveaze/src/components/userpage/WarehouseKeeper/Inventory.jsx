import React, { useState } from 'react';
import { FaRegTrashAlt, FaRegEdit, FaTimes } from "react-icons/fa";

const Inventory = () => {
    const [tableItems, setTableItems] = useState([
        {
            name: "Break Oil Can",
            initcount: 100,
            curentcount: 56,
            sellingprice: 200,
        },
        {
            name: "Break Pad",
            initcount: 100,
            curentcount: 56,
            sellingprice: 200,
        },
        {
            name: "Radiator Grille",
            initcount: 100,
            curentcount: 56,
            sellingprice: 200,
        },
        {
            name: "Air Vents",
            initcount: 100,
            curentcount: 56,
            sellingprice: 200,
        },
        {
            name: "Parking Sensors",
            initcount: 100,
            curentcount: 56,
            sellingprice: 200,
        },
    ]);

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentDetail, setCurrentDetail] = useState({ name: '', initcount: '', curentcount: '' , sellingprice: '' });

    const [editingIndex, setEditingIndex] = useState(null);
    const [popupType, setPopupType] = useState('');

    const openPopup = (type, index = null) => {
        if (type === 'update' && index !== null) {
            setCurrentDetail(tableItems[index]);
            setEditingIndex(index);
        } else {
            setCurrentDetail({ name: '', initcount: '', curentcount: '' , sellingprice: '' });

        }
        setPopupType(type);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setCurrentDetail({ name: '', initcount: '', curentcount: '' , sellingprice: ''});
        setEditingIndex(null);
    };

    const handleSave = () => {
        const updatedItems = [...tableItems];
        if (popupType === 'update') {
            updatedItems[editingIndex] = currentDetail;
        } else {
            updatedItems.push(currentDetail);
        }
        setTableItems(updatedItems);
        closePopup();
    };

    const handleDelete = (index) => {
        const updatedItems = [...tableItems];
        updatedItems.splice(index, 1);
        setTableItems(updatedItems);
    };

    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
            <div className="items-start justify-between md:flex">
                <div className="max-w-lg">
                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                        Inventory Management
                    </h3>
                </div>
                
                <div className="mt-3 md:mt-0">
                    <button
                        onClick={() => openPopup('add')}
                        className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
                    >
                        Add Item
                    </button>
                </div>
            </div>
            <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 px-6">Item Name</th>
                            <th className="py-3 px-6">Initial Count</th>
                            <th className="py-3 px-6">Current Count</th>
                            <th className="py-3 px-6">Selling Price</th>
                            <th className="py-3 px-6"></th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {tableItems.map((item, idx) => (
                            <tr key={idx}>

                                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.initcount}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.curentcount}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.sellingprice}</td>
                                <td className="text-right whitespace-nowrap flex gap-8 py-4 px-6">

                                    <button
                                        onClick={() => openPopup('add')}
                                        className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
                                    >
                                        Refill
                                    </button>
                                    <button
                                        onClick={() => openPopup('update', idx)}
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
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isPopupOpen && (
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
                        <main className="py-14">
                            <div className="max-w-screen-xl mx-auto my-auto px-4 text-gray-600 md:px-8">
                                <div className="max-w-lg mx-auto space-y-3 sm:text-center">
                                    <h3 className="text-indigo-600 text-xl font-semibold">
                                        {popupType === 'update' ? 'Update Item Detail' : 'Add New Item'}
                                    </h3>
                                </div>
                                <div className="mt-12 max-w-lg mx-auto">
                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                        handleSave();
                                    }} className="space-y-5">

                                        <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
                                            <div>
                                                <label className="font-medium">Item Name</label>
                                                <input
                                                    type="text"
                                                    value={currentDetail.name}
                                                    onChange={(e) => setCurrentDetail({ ...currentDetail, name: e.target.value })}
                                                    disabled={popupType === 'update'}  // Disable when updating
                                                    required
                                                    className={`w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border ${
                                                        popupType === 'update' ? 'bg-gray-200 cursor-not-allowed' : 'focus:border-indigo-600'
                                                    } shadow-sm rounded-lg`}
                                                />
                                            </div>

                                            <div>
                                                <label className="font-medium">Initial Count</label>
                                                <input
                                                    type="text"
                                                    value={currentDetail.contact}
                                                    onChange={(e) => setCurrentDetail({ ...currentDetail, contact: e.target.value })}
                                                    required
                                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
                                            <div>
                                                <label className="font-medium">Current Count</label>
                                                <input
                                                    type="text"
                                                    value={currentDetail.gender}
                                                    onChange={(e) => setCurrentDetail({ ...currentDetail, gender: e.target.value })}
                                                    required
                                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                                />
                                            </div>
                                            <div>
                                                <label className="font-medium">Selling Price</label>
                                                <input
                                                    type="text"
                                                    value={currentDetail.gender}
                                                    onChange={(e) => setCurrentDetail({ ...currentDetail, gender: e.target.value })}
                                                    required
                                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between mt-6">
                                            <button
                                                type="button"
                                                onClick={closePopup}
                                                className="w-40 h-12 flex items-center justify-center text-white font-medium bg-red-500 hover:bg-red-400 active:bg-red-600 mt-6 rounded-lg duration-150"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="w-40 h-12 flex items-center justify-center text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 mt-6 rounded-lg duration-150"
                                            >
                                                {popupType === 'update' ? 'Save Changes' : 'Add Item'}
                                            </button>    
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inventory;