import React, { useState, useEffect } from 'react';
import { FaRegTrashAlt, FaEdit, FaSearch, FaEnvelope } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserService from '../../service/UserService';

// Define role colors
const roleColors = {
    ALL: 'text-blue-600',
    CUSTOMER: 'text-blue-600',
    STAFF: 'text-blue-600',
};

const now = new Date(Date.now() + (330 * 60000));

const AllAnnouncement = () => {
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
    const [editingIndex, setEditingIndex] = useState(null);
    const [popupType, setPopupType] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchAnnouncement();
    }, []);

    const fetchAnnouncement = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await UserService.getCustomerAnnouncement(token);
            console.log("response", response);
            setTableItems(response?.announcementList || []);
        } catch (error) {
            console.error('Error fetching announcements:', error);
            setTableItems([]);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredItems = tableItems
        .filter(announcement => announcement.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => b.announcementId - a.announcementId); // Sort by announcement ID descending

    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
            <div className="flex items-start justify-between mb-3">
                <h3 className="text-gray-800 text-xl font-bold sm:text- 2xl">Announcement Management</h3>
            </div>

            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-4">
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
                </div>
            </div>

            <div className="mt-6 space-y-6">
                {filteredItems.map((announcement, index) => (
                    <div key={announcement.announcementId} className="bg-white shadow-lg rounded-lg p-6 flex items-start">
                        <FaEnvelope className={`${roleColors[announcement.recivers]} text-3xl mr-4`} />
                        <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-800">{announcement.title}</h4>
                            <p className="text-gray-600">{announcement.content}</p>
                            <div className="flex justify-between mt-2">
                                {/* <p className={`text-sm ${roleColors[announcement.recivers]}`}>Recivers: {announcement.recivers}</p> */}
                                <p className="text-gray-500 text-sm">{new Date(announcement.date).toLocaleDateString()}</p>
                            </div>
                            
                        </div>
                    </div>
                ))}
            </div>

            
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
        </div>
    );
};

export default AllAnnouncement;