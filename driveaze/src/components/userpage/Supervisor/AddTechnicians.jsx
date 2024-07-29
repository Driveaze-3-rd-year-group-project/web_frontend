import React, { useState } from 'react';
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";

const AddTechnicians = () => {
    const [tableItems, setTableItems] = useState([
        {
            id: "E001",
            avatar: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
            name: "Liam James",
            contact: "+1 (555) 000-000",
            gender: "Male"
        },
        {
            id: "E002",
            avatar: "https://randomuser.me/api/portraits/men/86.jpg",
            name: "Olivia Emma",
            contact: "+1 (555) 000-000",
            gender: "Female"
        },
        {
            id: "E003",
            avatar: "https://randomuser.me/api/portraits/women/79.jpg",
            name: "William Benjamin",
            contact: "+1 (555) 000-000",
            gender: "Male"
        },
        {
            id: "E004",
            avatar: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
            name: "Henry Theodore",
            contact: "+1 (555) 000-000",
            gender: "Male"
        },
        {
            id: "E005",
            avatar: "https://images.unsplash.com/photo-1439911767590-c724b615299d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
            name: "Amelia Elijah",
            contact: "+1 (555) 000-000",
            gender: "Female"
        },
    ]);

    const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
    const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
    const [currentDetail, setCurrentDetail] = useState({ id: '', avatar: '', name: '', contact: '', gender: '' });
    const [editingIndex, setEditingIndex] = useState(null);

    const handleUpdate = (index) => {
        setCurrentDetail(tableItems[index]);
        setEditingIndex(index);
        setIsUpdatePopupOpen(true);
    };

    const handleDelete = (index) => {
        const updatedItems = [...tableItems];
        updatedItems.splice(index, 1);
        setTableItems(updatedItems);
    };

    const handleSave = () => {
        const updatedItems = [...tableItems];
        updatedItems[editingIndex] = currentDetail;
        setTableItems(updatedItems);
        setIsUpdatePopupOpen(false);
    };

    const handleAddMember = () => {
        setCurrentDetail({ id: '', avatar: '', name: '', contact: '', gender: '' });
        setIsAddPopupOpen(true);
    };

    const handleSaveNewMember = () => {
        setTableItems([...tableItems, currentDetail]);
        setIsAddPopupOpen(false);
    };

    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 pt-12">
            <div className="items-start justify-between md:flex">
                <div className="max-w-lg">
                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                        Team members
                    </h3>
                </div>
                <div className="mt-3 md:mt-0">
                    <button
                        onClick={handleAddMember}
                        className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
                    >
                        Add member
                    </button>
                </div>
            </div>
            <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 px-6">Employee ID</th>
                            <th className="py-3 px-6">Name</th>
                            <th className="py-3 px-6">Contact Number</th>
                            <th className="py-3 px-6">Gender</th>
                            <th className="py-3 px-6"></th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {
                            tableItems.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="py-3 px-6 whitespace-nowrap">{item.id}</td>
                                    <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                                        <img src={item.avatar} className="w-10 h-10 rounded-full" alt={`${item.name} avatar`} />
                                        <div>
                                            <span className="block text-gray-700 text-sm font-medium">{item.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.contact}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.gender}</td>
                                    <td className="text-right whitespace-nowrap flex gap-8 py-4 px-6">
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
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

                        {isUpdatePopupOpen && (
                            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                                <div className="bg-white p-6 rounded-lg w-200 max-w-md">
                                    <h3 className="text-gray-800 text-lg font-bold mb-4">Update Job Detail</h3>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Employee ID</label>
                                        <input
                                            type="text"
                                            value={currentDetail.id}
                                            onChange={(e) =>
                                                setCurrentDetail({ ...currentDetail, id: e.target.value })
                                            }
                                            className="w-full mt-1 p-2 border rounded-lg"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Name</label>
                                        <input
                                            type="text"
                                            value={currentDetail.name}
                                            onChange={(e) =>
                                                setCurrentDetail({ ...currentDetail, name: e.target.value })
                                            }
                                            className="w-full mt-1 p-2 border rounded-lg"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Contact</label>
                                        <input
                                            type="text"
                                            value={currentDetail.contact}
                                            onChange={(e) =>
                                                setCurrentDetail({ ...currentDetail, contact: e.target.value })
                                            }
                                            className="w-full mt-1 p-2 border rounded-lg"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Gender</label>
                                        <input
                                            type="text"
                                            value={currentDetail.gender}
                                            onChange={(e) =>
                                                setCurrentDetail({ ...currentDetail, gender: e.target.value })
                                            }
                                            className="w-full mt-1 p-2 border rounded-lg"
                                        />
                                    </div>
                                    <div className="flex justify-end gap-4">
                                        <button
                                            onClick={() => setIsUpdatePopupOpen(false)}
                                            className="py-2 px-4 bg-gray-500 hover:bg-gray-400 text-white rounded-lg"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            className="py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        
            {isAddPopupOpen && (
                            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                                <div className="bg-white p-6 rounded-lg w-full max-w-lg">
                                    <h3 className="text-gray-800 text-lg font-bold mb-4">Add New Member</h3>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Employee ID</label>
                                        <input
                                            type="text"
                                            value={currentDetail.id}
                                            onChange={(e) =>
                                                setCurrentDetail({ ...currentDetail, id: e.target.value })
                                            }
                                            className="w-full mt-1 p-2 border rounded-lg"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Name</label>
                                        <input
                                            type="text"
                                            value={currentDetail.name}
                                            onChange={(e) =>
                                                setCurrentDetail({ ...currentDetail, name: e.target.value })
                                            }
                                            className="w-full mt-1 p-2 border rounded-lg"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Contact</label>
                                        <input
                                            type="text"
                                            value={currentDetail.contact}
                                            onChange={(e) =>
                                                setCurrentDetail({ ...currentDetail, contact: e.target.value })
                                            }
                                            className="w-full mt-1 p-2 border rounded-lg"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Gender</label>
                                        <input
                                            type="text"
                                            value={currentDetail.gender}
                                            onChange={(e) =>
                                                setCurrentDetail({ ...currentDetail, gender: e.target.value })
                                            }
                                            className="w-full mt-1 p-2 border rounded-lg"
                                        />
                                    </div>
                                    <div className="flex justify-end gap-4">
                                        <button
                                            onClick={() => setIsAddPopupOpen(false)}
                                            className="py-2 px-4 bg-gray-500 hover:bg-gray-400 text-white rounded-lg"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSaveNewMember}
                                            className="py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg"
                                        >
                                            Add Member
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

        </div>
    );
};

export default AddTechnicians;
