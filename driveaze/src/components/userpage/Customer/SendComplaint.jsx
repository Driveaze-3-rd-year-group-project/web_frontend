import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerComplaintService from '../../service/CustomerComplaintService';
import { FaTimes } from 'react-icons/fa';

const SendComplaint = () => {
    const navigate = useNavigate();
    const [complaint, setComplaint] = useState({ description: '' });
    const [showPopup, setShowPopup] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleClick = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const handleChange = (e) => {
        setComplaint({ ...complaint, description: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            console.log(complaint);
            const res = await CustomerComplaintService.sendComplaintData(complaint, token);

            if (res.statusCode === 200) {
                setMessage('Complaint successfully sent!');
                closePopup();
                navigate('/dashboard');
            } else {
                setError(res.message || 'Failed to send complaint.');
            }
        } catch (error) {
            setError(error.message || 'An error occurred.');
        }
    };

    return (
        <div className="max-w-screen-lg mt-14 mx-auto px-4">
            <div className="items-start justify-between sm:flex">
                <h4 className="text-gray-800 text-3xl font-semibold">Site Announcements</h4>
            </div>
            <div className="flex items-center justify-between mt-4">
                <select className="py-2 px-6 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-600">
                    <option value="all">All</option>
                    <option value="customers">Customers</option>
                    <option value="employees">Employees</option>
                </select>
                <button
                    onClick={handleClick}
                    className="inline-flex items-center justify-center gap-1 py-2 px-3 mt-2 font-medium text-sm text-white bg-green-600 hover:bg-green-500 active:bg-green-700 rounded-lg sm:mt-0"
                >
                    Send a complaint
                </button>
            </div>

            {showPopup && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full">
                        <div className="flex justify-between items-center pb-3">
                            <h4 className="text-xl font-semibold">Send Feedback</h4>
                            <button
                                onClick={closePopup}
                                className="text-gray-600 hover:text-gray-900"
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <ServiceBookingDetails
                            handleChange={handleChange}
                            complaint={complaint}
                            handleSubmit={handleSubmit}
                        />
                    </div>
                </div>
            )}

            {error && <p className="text-red-600 mt-4">{error}</p>}
            {message && <p className="text-green-600 mt-4">{message}</p>}
        </div>
    );
};

const ServiceBookingDetails = ({ handleChange, complaint, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="font-medium">Please share your thoughts</label>
                <textarea
                    value={complaint.description}
                    onChange={handleChange}
                    className="w-full h-20 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type your message here..."
                    required
                />
            </div>
            <div className="flex justify-center">
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                >
                    Submit Complaint
                </button>
            </div>
        </form>
    );
};

export default SendComplaint;
