import React, { useState, useEffect } from 'react';
import { FaRegTrashAlt, FaEdit, FaSearch, FaEnvelope } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserService from '../../service/UserService';

const roleColors = {
    ALL: 'text-gray-600',
    CUSTOMER: 'text-blue-600',
    STAFF: 'text-brown-400',
};

const now = new Date(Date.now() + (330 * 60000));

const Announcement = () => {
    const [tableItems, setTableItems] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentDetail, setCurrentDetail] = useState({
        announcementId: null,
        title: '',
        content: '',
        date: now.toISOString().split('T')[0],
        time: now.toISOString().split('T')[1].split('.')[0],
        recivers: 'ALL'
    });
    const [errors, setErrors] = useState({});
    const [editingIndex, setEditingIndex] = useState(null);
    const [popupType, setPopupType] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchAnnouncement();
    }, []);

    const fetchAnnouncement = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await UserService.getAllAnnouncement(token);
            setTableItems(response?.announcementList || []);
        } catch (error) {
            console.error('Error fetching announcements:', error);
            setTableItems([]);
        }
    };

    const openPopup = (type, index = null) => {
        setErrors({});
        if (type === 'update' && index !== null) {
            setEditingIndex(index);
            setCurrentDetail(filteredItems[index]);
        } else {
            setCurrentDetail({
                announcementId: null,
                title: '',
                content: '',
                date: now.toISOString().split('T')[0],
                time: now.toISOString().split('T')[1].split('.')[0],
                recivers: 'ALL'
            });
        }
        setPopupType(type);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setErrors({});
        setCurrentDetail({
            announcementId: null,
            title: '',
            content: '',
            date: now.toISOString().split('T')[0],
            time: now.toISOString().split('T')[1].split('.')[0],
            recivers: 'ALL'
        });
        setEditingIndex(null);
    };

    const validateFields = () => {
        const validationErrors = {};
        if (!currentDetail.title.trim()) {
            validationErrors.title = 'Title is required.';
        }
        if (!currentDetail.content.trim()) {
            validationErrors.content = 'Content is required.';
        }
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validateFields()) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            let res;
            if (popupType === 'update') {
                res = await UserService.updateAnnouncement(currentDetail.announcementId, currentDetail, token);
                if (res.statusCode === 200) {
                    toast.success("Announcement Updated successfully!");
                } else {
                    toast.error(res.message || 'Failed to update Announcement!');
                }
            } else {
                res = await UserService.addAnnouncement(currentDetail, token);
                if (res.statusCode === 200) {
                    toast.success("Announcement Added successfully!");
                } else {
                    toast.error(res.message || 'Failed to add Announcement');
                }
            }
            setTimeout(() => {
                fetchAnnouncement();
                closePopup();
            }, 1000);
        } catch (error) {
            console.error('Error saving Announcement:', error);
            toast.error('An unexpected error occurred!');
        }
    };

    const handleDelete = async (index) => {
        try {
            const confirmDelete = window.confirm('Are you sure you want to delete this Announcement?');
            if (confirmDelete) {
                const token = localStorage.getItem('token');
                const res = await UserService.deleteAnnouncement(filteredItems[index].announcementId, token);
                if (res.statusCode === 200) {
                    toast.success("Announcement Deleted successfully!");
                    fetchAnnouncement();
                } else {
                    toast.error(res.message || 'Failed to Delete Announcement');
                }
            }
        } catch (error) {
            console.error('Error deleting Announcement:', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredItems = tableItems
        .filter(announcement => announcement.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => b.announcementId - a.announcementId);

    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
            <div className="flex items-start justify-between mb-3">
                <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">Announcement Management</h3>
            </div>

            <div className="flex justify-between items-center mb-3">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search Title"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="py-2 px-3 pr-10 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
                    <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
                </div>
                <button
                    onClick={() => openPopup('add')}
                    className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                >
                    Add Announcement
                </button>
            </div>

            <div className="mt-6 space-y-6">
                {filteredItems.map((announcement, index) => (
                    <div key={announcement.announcementId} className="bg-white shadow-lg rounded-lg p-6 flex items-start">
                        <FaEnvelope className={`${roleColors[announcement.recivers]} text-3xl mr-4`} />
                        <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-800">{announcement.title}</h4>
                            <p className="text-gray-600">{announcement.content}</p>
                            <div className="flex justify-between mt-2">
                                <p className={`text-sm ${roleColors[announcement.recivers]}`}>Recivers: {announcement.recivers}</p>
                                <p className="text-gray-500 text-sm">{new Date(announcement.date).toLocaleDateString()}</p>
                            </div>
                            <div className="flex justify-end space-x-2 mt-4">
                                <button onClick={() => openPopup('update', index)} className="text-indigo-600 hover:text-indigo-800 text-2xl">
                                    <FaEdit />
                                </button>
                                <button onClick={() => handleDelete(index)} className="text-red-500 hover:text-red-800 text-2xl">
                                    <FaRegTrashAlt />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isPopupOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-lg font-medium text-gray-700">{popupType === 'update' ? 'Update Announcement' : 'Add Announcement'}</h3>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                value={currentDetail.title}
                                onChange={(e) => setCurrentDetail({ ...currentDetail, title: e.target.value })}
                                className="mt-1 w-full px-3 py-2 border rounded-lg"
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">Content</label>
                            <textarea
                                value={currentDetail.content}
                                onChange={(e) => setCurrentDetail({ ...currentDetail, content: e.target.value })}
                                className="mt-1 w-full px-3 py-4 border rounded-lg h-32"
                            />
                            {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">Role</label>
                            <select
                                value={currentDetail.recivers}
                                onChange={(e) => setCurrentDetail({ ...currentDetail, recivers: e.target.value })}
                                className="mt-1 w-full px-3 py-2 border rounded-lg"
                            >
                                <option value="ALL">ALL</option>
                                <option value="CUSTOMER">Customer</option>
                                <option value="STAFF">Staff</option>
                            </select>
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button onClick={closePopup} className="py-2 px-4 text-gray-600 border rounded-lg">Cancel</button>
                            <button onClick={handleSave} className="py-2 px-4 text-white bg-indigo-600 rounded-lg">Save</button>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};

export default Announcement;
