import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserService from '../../service/UserService';

function EmployeeRegister() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        city: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call the register method from UserService

            const token = localStorage.getItem('token');
            await UserService.register(formData, token);

            // Clear the form fields after successful registration
            setFormData({
                name: '',
                email: '',
                password: '',
                role: ''
            });
            alert('User registered successfully');
            navigate('/admin/user-management');

        } catch (error) {
            console.error('Error registering user:', error);
            alert('An error occurred while registering user');
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
                    <div className="form-group">
                        <label className="font-medium">Email:</label>
                        <input 
                            type="password" 
                            name="password" 
                            value={userData.password} 
                            onChange={handleInputChange} 
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
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

export default EmployeeRegister;
