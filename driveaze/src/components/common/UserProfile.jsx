import React, { useState, useEffect } from "react";
import { FaCloudUploadAlt, FaRegTrashAlt, FaEdit, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import UserService from "../service/UserService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';

function UserProfile() {
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [user, setUser] = useState({
        name: "",
        email: "",
        address: "",
        contactNumber: "",
        // profilePicture: "", // Default profile picture will be updated
    });

    const [formData, setFormData] = useState({});
    const [isPasswordHidden, setPasswordHidden] = useState(true);
    const [contactError, setContactError] = useState('');

    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const token = localStorage.getItem("token"); // Token for API calls

    // Fetch user profile data from the backend
    useEffect(() => {
        fetchUserProfile();
    }, []); // Re-fetch if the token changes

    const fetchUserProfile = async () => {
        try {
            const userProfile = await UserService.getYourProfile(token);
            console.log("user profile", userProfile.ourUsers);
            setUser({
                name: userProfile.ourUsers.name,
                email: userProfile.ourUsers.email,
                role: userProfile.ourUsers.role,
                contactNumber: userProfile.ourUsers.contactNumber,
                id: userProfile.ourUsers.id,
                // profilePicture: userProfile.ourUsers.profilePicture || "https://via.placeholder.com/150", // Default placeholder if no picture
            });

            setFormData({
                name: userProfile.ourUsers.name,
                email: userProfile.ourUsers.email,
                contactNumber: userProfile.ourUsers.contactNumber,
            });
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };

    const deleteUser = async (userId) => {
        try {
            // Show the confirmation dialog
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'Do you want to delete Your Account?',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Delete',
                cancelButtonText: 'Cancel',
            });

            // If confirmed, delete the job and fetch the updated list of jobs
            if (result.isConfirmed) {
                await UserService.deleteCustomerAccount(userId, token);
                toast.success("Account Deleted successfully!");
                setTimeout(() => {
                    localStorage.removeItem('token');
                    window.location.href = '/login'; 
                }, 1000);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error(error.message || 'Failed to Delete Account');
        }
    };

    // Handler to open modal
    const openModal = () => setIsModalOpen(true);

    const closeModal = () => {
        setIsModalOpen(false);
        fetchUserProfile(); // Re-fetch user data
    };

    const openPasswordModal = () => setIsPasswordModalOpen(true);
    const closePasswordModal = () => setIsPasswordModalOpen(false);

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const updatePassword = async (e) => {
        e.preventDefault();
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            const res = await UserService.updatePassword(user.id, {
                currentPassword: passwordForm.currentPassword,
                newPassword: passwordForm.newPassword,
            }, token);

            if (res.statusCode === 200) {
                toast.success("Password updated successfully!");
                setTimeout(() => {
                    closePasswordModal();
                    window.location.reload();
                }, 1000);
                
            } else {
                toast.error(res.message || "Failed to update password!");
            }
        } catch (error) {
            console.error("Error updating password:", error);
            toast.error("Error updating password!");
        }
    };

    // Handler to handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));

        if (name === 'contactNumber') {
            const phonePattern = /^\d{10}$/;
            setContactError(!phonePattern.test(value) ? 'Invalid contact number' : '');
        }
    };

    // Handler to handle profile picture change
    const handlePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUser((prevUser) => ({ ...prevUser, profilePicture: URL.createObjectURL(file) }));
        }
    };

    // Handler to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("submitting user", user);
    
            let res;
            if (user.role === 'CUSTOMER') {
                res = await UserService.updateCustomerAccount(user.id, user, token); // Use customer-specific method
            } else {
                res = await UserService.updateEmployees(user.id, user, token); // Use general method
            }
    
            console.log('API Response:', res);
    
            if (res.statusCode === 200) {
                toast.success("Profile updated successfully!");
                setTimeout(() => {
                    closeModal();
                    window.location.reload();
                }, 1000);
            } else {
                toast.error(res.message || 'Failed to Update user');
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Error updating profile!");
        }
    };
    

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-[60%] max-w-2xl bg-white shadow-lg rounded-lg p-6 border border-gray-300">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Profile Settings
                </h2>
                <div className="flex items-center gap-6">
                    {/* Profile Picture */}
                    <div className="flex-shrink-0">
                        <img
                            className="w-36 h-36 rounded-full object-cover border-4 border-gray-300"
                            // src={user.profilePicture}
                            src="https://via.placeholder.com/150"
                            alt={`${user.name}'s profile`}
                        />
                    </div>
                    {/* Profile Details */}
                    <div className="flex flex-col gap-4 flex-grow">
                        <div className="flex justify-between text-lg">
                            <span className="text-gray-600 font-medium">Name:</span>
                            <span className="text-gray-900">{user.name}</span>
                        </div>
                        <div className="flex justify-between text-lg">
                            <span className="text-gray-600 font-medium">Account Type:</span>
                            <span className="text-gray-900">
                                {user.role === "ADMIN" && "Admin Account"}
                                {user.role === "RECEPTIONIST" && "Receptionist Account"}
                                {user.role === "MANAGER" && "Manager Account"}
                                {user.role === "CUSTOMER" && "Customer Account"}
                                {user.role === "TECHNICIAN" && "Technician Account"}
                                {user.role === "WAREHOUSE_KEEPER" && "Warehouse Keeper Account"}
                                {user.role === "SUPERVISOR" && "Supervisor Account"}
                            </span>
                        </div>
                        <div className="flex justify-between text-lg">
                            <span className="text-gray-600 font-medium">Email Address:</span>
                            <span className="text-gray-900">{user.email}</span>
                        </div>
                        
                        {user.role === "CUSTOMER" && (
                            <div className="flex justify-between text-lg">
                                <span className="text-gray-600 font-medium">Contact Number:</span>
                                <span className="text-gray-900">
                                    {user.contactNumber ? user.contactNumber : "Please enter your contact details"}
                                </span>
                            </div>
                        )}
                            
                    </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                    <button
                        type="button"
                        onClick={openPasswordModal}
                        className="w-40 h-12 flex items-center justify-center text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 mt-6 rounded-lg duration-150"
                    >
                        Update Password
                        <FaLock className="ml-2" />
                    </button>
                    <button
                        type="button"
                        onClick={openModal}
                        className="w-40 h-12 flex items-center justify-center text-white font-medium bg-green-600 hover:bg-green-500 active:bg-green-700 mt-6 rounded-lg duration-150"
                    >
                        Update Details
                        <FaEdit className="ml-2" />
                    </button>
                    {user.role === "CUSTOMER" && (
                        <button
                            onClick={() => deleteUser(user.id)}
                            type="button"
                            className="w-40 h-12 flex items-center justify-center text-white font-medium bg-red-500 hover:bg-red-400 active:bg-red-600 mt-6 rounded-lg duration-150"
                        >
                            Delete Account
                            <FaRegTrashAlt className="ml-2" />
                        </button>
                    )}
                </div>
                <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
            </div>

            {/* Modal (Popup Form) */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 w-130">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Update Profile</h3>
                        <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="font-medium">Profile Picture</label>
                            <div className="max-w-md h-40 rounded-lg border-2 border-dashed flex items-center justify-center mb-4">
                                <label htmlFor="file" className="cursor-pointer text-center p-4 md:p-8">
                                    <div className="w-16 h-16 mx-auto text-indigo-600 -mb-6">
                                        <FaCloudUploadAlt className="text-4xl" />
                                    </div>
                                    <p className="mt-3 text-gray-700 max-w-xs mx-auto">Click to <span className="font-medium text-indigo-600">Upload your  picture</span> or drag and drop your file here</p>
                                </label>
                                <input id="file" type="file" className="hidden" />
                            </div>
                        </div>
                        <div>
                            <label className="font-medium">User Name</label>
                            <input
                                type="text"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-700 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                        </div>
                        {user.role === "CUSTOMER" && (
                            <div>
                                <label className="font-medium">Contact Number</label>
                                <input
                                    type="text"
                                    name="contactNumber"
                                    value={user.contactNumber}
                                    onChange={handleChange}
                                    required
                                    className="w-full mt-2 px-3 py-2 text-gray-700 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                                {contactError && <p className="text-red-500 text-sm mt-1">{contactError}</p>}
                            </div>
                        )}
                        
                        {/* <div>
                            <label className="font-medium">Password</label>
                            <input
                                type="password"
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-700 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                        </div> */}
                        <div className="flex items-center justify-between mt-6">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="w-40 h-12 flex items-center justify-center text-white font-medium bg-red-500 hover:bg-red-400 active:bg-red-600 mt-6 rounded-lg duration-150"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="w-40 h-12 flex items-center justify-center text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 mt-6 rounded-lg duration-150"
                            >
                                Update
                            </button>    
                        </div>
                    </form>
                    </div>
                </div>
            )}

            {isPasswordModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 w-110">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Update Password</h3>
                        <form onSubmit={updatePassword} className="space-y-5">
                            <div>
                                <label className="font-medium">Current Password</label>
                                <div className="relative">
                                    <a className="text-gray-700 absolute right-3 mt-5 inset-y-0 my-auto hover:text-gray-600"
                                        onClick={() => setPasswordHidden(!isPasswordHidden)}
                                    >
                                        {isPasswordHidden ? <FaEye /> : <FaEyeSlash />}
                                    </a>
                                    <input
                                        type={isPasswordHidden ? "password" : "text"}
                                        name="currentPassword"
                                        value={passwordForm.currentPassword}
                                        placeholder='Enter Current Password'
                                        onChange={handlePasswordChange}
                                        required
                                        className="w-full mt-2 px-3 py-2 text-gray-700 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="font-medium">New Password</label>
                                <div className="relative">
                                    <a className="text-gray-700 absolute right-3 mt-5 inset-y-0 my-auto hover:text-gray-600"
                                        onClick={() => setPasswordHidden(!isPasswordHidden)}
                                    >
                                        {isPasswordHidden ? <FaEye /> : <FaEyeSlash />}
                                    </a>
                                    <input
                                        type={isPasswordHidden ? "password" : "text"}
                                        name="newPassword"
                                        value={passwordForm.newPassword}
                                        placeholder='Enter new Password'
                                        onChange={handlePasswordChange}
                                        required
                                        className="w-full mt-2 px-3 py-2 text-gray-700 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="font-medium">Confirm New Password</label>
                                <div className="relative">
                                    <a className="text-gray-700 absolute right-3 mt-5 inset-y-0 my-auto hover:text-gray-600"
                                        onClick={() => setPasswordHidden(!isPasswordHidden)}
                                    >
                                        {isPasswordHidden ? <FaEye /> : <FaEyeSlash />}
                                    </a>
                                    <input
                                        type={isPasswordHidden ? "password" : "text"}
                                        name="confirmPassword"
                                        value={passwordForm.confirmPassword}
                                        placeholder='Confirm new Password'
                                        onChange={handlePasswordChange}
                                        required
                                        className="w-full mt-2 px-3 py-2 text-gray-700 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-6">
                                <button
                                    type="button"
                                    onClick={closePasswordModal}
                                    className="w-40 h-12 flex items-center justify-center text-white font-medium bg-red-500 hover:bg-red-400 active:bg-red-600 mt-6 rounded-lg duration-150"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="w-40 h-12 flex items-center justify-center text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 mt-6 rounded-lg duration-150"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserProfile;
