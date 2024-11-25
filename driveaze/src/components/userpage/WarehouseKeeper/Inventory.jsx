import React, { useState, useEffect } from 'react';
import { FaRegTrashAlt, FaEdit, FaSearch, FaPlusCircle } from "react-icons/fa";
import InventoryService from "../../service/InventoryService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Inventory = () => {
    const [tableItems, setTableItems] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentDetail, setCurrentDetail] = useState({
        name: '',
        initialCount: '',
        count: '',
        sellingPrice: ''
    });
    const [editingIndex, setEditingIndex] = useState(null);
    const [popupType, setPopupType] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [refillQuantity, setRefillQuantity] = useState('');

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await InventoryService.getAllItems(token);
            setTableItems(response?.inventoryItemList || []);
        } catch (error) {
            console.error('Error fetching inventory:', error);
            setTableItems([]);
        }
    };

    const openPopup = (type, index = null) => {
        if (type === 'update' && index !== null) {
            setCurrentDetail(filteredItems[index]);
            setEditingIndex(index);
        } else if (type === 'refill' && index !== null) {
            setCurrentDetail(filteredItems[index]);
            setEditingIndex(index);
            setRefillQuantity('');
        } else {
            setCurrentDetail({
                name: '',
                initialCount: '',
                count: '',
                sellingPrice: ''
            });
        }
        setPopupType(type);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setCurrentDetail({
            name: '',
            initialCount: '',
            count: '',
            sellingPrice: ''
        });
        setRefillQuantity('');
        setEditingIndex(null);
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            if (popupType === 'update') {
                const res = await InventoryService.updateItem(currentDetail, token);
                console.log("response", res);
                if (res.statusCode === 200) {
                    toast.success("Job Created successfully!");
                    setTimeout(() => {
                        fetchInventory();
                        closePopup();
                    }, 1000);
                  } else {
                    setError(res.message);
                    toast.error(res.message || 'Failed to create job');
                  }
            } else if (popupType === 'refill') {
                await InventoryService.refillItem(currentDetail.itemId, parseInt(refillQuantity), token);
            } else {
                const res = await InventoryService.addItem(currentDetail, token);
                console.log("response", res);
                if (res.statusCode === 200) {
                    toast.success("Job Created successfully!");
                    setTimeout(() => {
                        fetchInventory();
                        closePopup();
                    }, 1000);
                  } else {
                    setError(res.message);
                    toast.error(res.message || 'Failed to create job');
                  }
            }
            // fetchInventory();
            // closePopup();
        } catch (error) {
            console.error('Error saving inventory item:', error);
            toast.error('An unexpected error occurred!');
        }
    };

    const handleDelete = async (index) => {
        try {
            const confirmDelete = window.confirm('Are you sure you want to delete this item?');
            if (confirmDelete) {
                const token = localStorage.getItem('token');
                await InventoryService.deleteItem(tableItems[index].itemId, token);
                fetchInventory();
            }
        } catch (error) {
            console.error('Error deleting inventory item:', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredItems = tableItems
        .sort((a, b) => a.itemId - b.itemId)
        .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const renderPopupContent = () => {
        if (popupType === 'refill') {
            return (
                <>
                    <h3 className="text-lg font-medium text-gray-700">Refill Item: {currentDetail.name}</h3>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Current Count: {currentDetail.count}</label>
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Refill Quantity</label>
                        <input
                            type="number"
                            value={refillQuantity}
                            onChange={(e) => setRefillQuantity(e.target.value)}
                            className="mt-1 w-full px-3 py-2 border rounded-lg"
                            min="1"
                        />
                    </div>
                </>
            );
        }

        // Common fields for both add and update
        const commonFields = (
            <>
                <h3 className="text-lg font-medium text-gray-700">
                    {popupType === 'update' ? 'Update Item' : 'Add New Item'}
                </h3>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        value={currentDetail.name}
                        onChange={(e) => setCurrentDetail({ ...currentDetail, name: e.target.value })}
                        className="mt-1 w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Initial Count</label>
                    <input
                        type="number"
                        value={currentDetail.initialCount}
                        onChange={(e) => setCurrentDetail({ ...currentDetail, initialCount: e.target.value })}
                        className="mt-1 w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Selling Price</label>
                    <input
                        type="number"
                        value={currentDetail.sellingPrice}
                        onChange={(e) => setCurrentDetail({ ...currentDetail, sellingPrice: e.target.value })}
                        className="mt-1 w-full px-3 py-2 border rounded-lg"
                    />
                </div>
            </>
        );

        // Add current count field only for new items
        if (popupType === 'add') {
            return (
                <>
                    {commonFields}
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Current Count</label>
                        <input
                            type="number"
                            value={currentDetail.count}
                            onChange={(e) => setCurrentDetail({ ...currentDetail, count: e.target.value })}
                            className="mt-1 w-full px-3 py-2 border rounded-lg"
                        />
                    </div>
                </>
            );
        }

        return commonFields;
    };

    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
            <div className="flex items-start justify-between mb-3">
                <div className="max-w-lg">
                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                        Inventory Management
                    </h3>
                </div>
            </div>

            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search Inventory"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="py-2 px-3 pr-10 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                        <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>
                <div className="mt-3 md:mt-0">
                    <button
                        onClick={() => openPopup('add')}
                        className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                    >
                        Add Item
                    </button>
                </div>
            </div>

            <div className="mt-6 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 px-6">Name</th>
                            <th className="py-3 px-6">Initial Count</th>
                            <th className="py-3 px-6">Current Count</th>
                            <th className="py-3 px-6">Selling Price (Rs)</th>
                            <th className="py-3 px-6">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {filteredItems.map((item, index) => (
                            <tr key={item.itemId}>
                                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.initialCount}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.count}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.sellingPrice}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center space-x-4">
                                    <button onClick={() => openPopup('refill', index)} className="text-green-600 hover:text-green-800 text-xl">
                                            <FaPlusCircle />
                                        </button>
                                        <button onClick={() => openPopup('update', index)} className="text-indigo-600 hover:text-indigo-800 text-xl">
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => handleDelete(index)} className="text-red-500 hover:text-red-800 text-xl">
                                            <FaRegTrashAlt />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isPopupOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                        {renderPopupContent()}
                        <div className="mt-6 flex justify-end space-x-3">
                            <button onClick={closePopup} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg">
                                Cancel
                            </button>
                            <button onClick={handleSave} className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
        </div>
    );
};

export default Inventory;