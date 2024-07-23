import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserService from '../../service/UserService';
import { NULL } from 'sass';

function AddEditEmployee() {
    const navigate = useNavigate();
    const { userId } = useParams();
  
  
    const [userData, setUserData] = useState({
      name: '',
      email: '',
      role: '',
      city: ''
    });
  
    useEffect(() => {
      fetchUserDataById(userId); // Pass the userId to fetchUserDataById
    }, [userId]); //wheen ever there is a chane in userId, run this
  
    const fetchUserDataById = async (userId) => {
      try {
        const token = localStorage.getItem('token');
        const response = await UserService.getUserById(userId, token); // Pass userId to getUserById
        const { name, email, role, city } = response.ourUsers;
        setUserData({ name, email, role, city });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUserData((prevUserData) => ({
        ...prevUserData,
        [name]: value
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const confirmDelete = window.confirm('Are you sure you want to delete this user?');
        if (confirmDelete) {
          const token = localStorage.getItem('token');
          const res = await UserService.updateUser(userId, userData, token);
          console.log(res)
          // Redirect to profile page or display a success message
          navigate("/admin/user-management")
        }
  
      } catch (error) {
        console.error('Error updating user profile:', error);
        alert(error)
      }
    };
  
    return (
    <main className="py-14">
        <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
            <div className="max-w-lg mx-auto space-y-3 sm:text-center">
            <h3 className="text-indigo-600 font-semibold">
                Update User Details
            </h3>
            </div>
            <div className="mt-12 max-w-lg mx-auto">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="form-group">
                        <label className="font-medium">Name:</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={userData.name} 
                            onChange={handleInputChange} 
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                    </div>
                    <div className="form-group">
                        <label className="font-medium">Email:</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={userData.email} 
                            onChange={handleInputChange} 
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                    </div>
                    <div className="form-group">
                        <label className="font-medium">Role:</label>
                        <select 
                            name="role"
                            value={userData.role}
                            onChange={handleInputChange}
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            required
                            defaultValue={""}
                        >
                            <option value="" disabled hidden>Select a role</option>
                            <option value="ADMIN">ADMIN</option>
                            <option value="SUPERVISOR">SUPERVISOR</option>
                            <option value="RECEPTIONIST">RECEPTIONIST</option>
                        </select>
                    </div>
                    <button 
                        type="submit"
                        className="px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg duration-150">
                            Update
                    </button>
                </form>
            </div>
        </div>
    </main>
      
    );
  }

export default AddEditEmployee;
