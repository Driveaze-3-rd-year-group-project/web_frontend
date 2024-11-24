import React, { useState } from "react";
import { FaRegTrashAlt, FaRegEdit, FaTimes } from "react-icons/fa";

const Inventory = () => {
    const [tableItems, setTableItems] = useState([
        { name: "Break Oil Can", initcount: 100, curentcount: 56, sellingprice: 200 },
        { name: "Break Pad", initcount: 100, curentcount: 56, sellingprice: 200 },
        { name: "Radiator Grille", initcount: 100, curentcount: 56, sellingprice: 200 },
        { name: "Air Vents", initcount: 100, curentcount: 56, sellingprice: 200 },
        { name: "Parking Sensors", initcount: 100, curentcount: 56, sellingprice: 200 },
    ]);

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentDetail, setCurrentDetail] = useState({ name: '', initcount: '', curentcount: '', sellingprice: '' });
    const [refillAmount, setRefillAmount] = useState(0); // For refill
    const [editingIndex, setEditingIndex] = useState(null);
    const [popupType, setPopupType] = useState('');

    const openPopup = (type, index = null) => {
        if (type === 'update' && index !== null) {
            setCurrentDetail(tableItems[index]);
            setEditingIndex(index);
        } else if (type === 'refill' && index !== null) {
            setCurrentDetail(tableItems[index]);
            setEditingIndex(index);
            setRefillAmount(0); // Reset refill amount
        } else {
            setCurrentDetail({ name: '', initcount: '', curentcount: '', sellingprice: '' });
        }
        setPopupType(type);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setCurrentDetail({ name: '', initcount: '', curentcount: '', sellingprice: '' });
        setRefillAmount(0); // Reset refill amount
        setEditingIndex(null);
    };

    const handleSave = () => {
        const updatedItems = [...tableItems];
        if (popupType === 'update') {
            updatedItems[editingIndex] = currentDetail;
        } else if (popupType === 'refill') {
            updatedItems[editingIndex].curentcount = parseInt(updatedItems[editingIndex].curentcount) + parseInt(refillAmount);
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
                <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                    Inventory Management
                </h3>
                <button
                    onClick={() => openPopup('add')}
                    className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500"
                >
                    Add Item
                </button>
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
                                <td className="flex gap-4 px-6 py-4">
                                    <button
                                        onClick={() => openPopup('refill', idx)}
                                        className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
                                    >
                                        Refill
                                    </button>
                                    <button
                                        onClick={() => openPopup('update', idx)}
                                        className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500"
                                    >
                                        <FaRegEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(idx)}
                                        className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
                                    >
                                        <FaRegTrashAlt />
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
                        <h3 className="text-lg font-semibold mb-4">
                            {popupType === 'update' ? 'Update Item' : popupType === 'refill' ? 'Refill Item' : 'Add Item'}
                        </h3>
                        {popupType === 'refill' ? (
                            <div>
                                <label className="block font-medium">Refill Amount</label>
                                <input
                                    type="number"
                                    value={refillAmount}
                                    onChange={(e) => setRefillAmount(e.target.value)}
                                    className="w-full mt-2 px-3 py-2 border rounded-lg"
                                />
                            </div>
                        ) : (
                            <div>
                                {/* Add/Update Form */}
                            </div>
                        )}
                        <div className="mt-6 flex gap-4">
                            <button
                                onClick={closePopup}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
                            >
                                {popupType === 'refill' ? 'Refill' : popupType === 'update' ? 'Save Changes' : 'Add'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inventory;
