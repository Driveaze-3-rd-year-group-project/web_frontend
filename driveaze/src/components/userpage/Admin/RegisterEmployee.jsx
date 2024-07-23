import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserService from '../../service/UserService';

function RegisterEmployee() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
  
  
    const [userData, setUserData] = useState({
      name: '',
      email: '',
      role: '',
      password: '',
    });
  
   
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUserData((prevUserData) => ({
        ...prevUserData,
        [name]: value
      }));
    };
  
    // const handleSubmit = async (e) => {
    //   e.preventDefault();
    //   try {
    //     const confirmUpdate = window.confirm('Are you sure you want to Update this user?');
    //     if (confirmUpdate) {
    //       const token = localStorage.getItem('token');
    //       const res = await UserService.updateUser(userId, userData, token);
    //       console.log(res)
    //       // Redirect to profile page or display a success message
    //       navigate("/staffaccounts");
    //     }
  
    //   } catch (error) {
    //     console.error('Error updating user profile:', error);
    //     alert(error)
    //   }
    // };

    const handleSubmit = async (e) => {
      e.preventDefault();
     
      try {
        const token = localStorage.getItem('token');
        const res = await UserService.employeeRegister(userData, token);
        console.log(res);
        
        if (res.statusCode === 200) {
            alert('Staff Account created successfully');
            navigate("/staffaccounts");
        } else {
            setError(res.message);
        }
    } catch (error) {
        setError(error.message);
        setTimeout(() => {
            setError('');
        }, 5000);
    }
  }
  
    return (
    <main className="py-14">
        <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
            <div className="max-w-lg mx-auto space-y-3 sm:text-center">
            <h3 className="text-indigo-600 font-semibold text-xl">
                Create Staff Account
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
                            placeholder='Enter staff member Name'
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
                            placeholder='Enter staff member Email'
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
                        <label className="font-medium">Password:</label>
                        <input 
                            type="password" 
                            name="password" 
                            value={userData.password} 
                            onChange={handleInputChange} 
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            placeholder='Enter a password'
                        />
                    </div>
                    <div className="flex items-center justify-between mt-6">
                        <a
                            href="/staffaccounts"
                            className="px-20 py-2 text-white font-medium bg-red-500 hover:bg-red-400 active:bg-red-600 mt-6 rounded-lg duration-150"
                        >
                            Back
                        </a>
                        <button
                            type="submit"
                            className="px-20 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 mt-6 rounded-lg duration-150"
                        >
                            Save
                        </button>    
                    </div>
                    {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                    
                </form>
            </div>
        </div>
    </main>
      
    );
  }

export default RegisterEmployee;
