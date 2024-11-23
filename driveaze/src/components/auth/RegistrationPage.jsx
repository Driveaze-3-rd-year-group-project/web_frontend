import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../service/UserService';
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegistrationPage() {
    const navigate = useNavigate();
    const [isPasswordHidden, setPasswordHidden] = useState(true)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        contactNumber: ''
    });

    // const [userData, setUserData] = useState({
    //     name: '',
    //     email: '',
    //     password: '',
    //     contactNumber: ''
    //   });
    

    const [error, setError] = useState('');
    const [contactError, setContactError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'contactNumber') {
            const phonePattern = /^\d{10}$/;
            setContactError(!phonePattern.test(value) ? 'Invalid contact number' : '');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await UserService.customerRegister(formData);
            console.log(res);
            
            if (res.statusCode === 200) {
                toast.success("User registered successfully");
                setTimeout(() => {
                    location.href = '/login';
                }, 1000);
            } else {
                toast.error(res.message || "Registration failed!");
            }
        } catch (error) {
            setError(error.message);
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    }

    return (
        <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-100 sm:px-4">
            <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
                <div className="bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg min-w-full">
                    <div className="flex justify-end">
                        <button className="text-gray-500 hover:text-gray-800" onClick={() => location.href='/'}>
                            <FaArrowLeft />
                        </button>
                    </div>
                    <div className="text-center">
                        <img src="./src/assets/driveazeheader.svg" width={150} className="mx-auto" />
                        <div className="mt-5 space-y-2">
                            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Create an account</h3>
                            <p className="">Already have an account?<a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500"> Login</a></p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                        <div>
                            <label className="font-medium">Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder='Enter Your Name'
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder='Enter Your Email'
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="font-medium">Contact Number</label>
                            <input
                                type="text"
                                name="contactNumber"
                                value={formData.contactNumber}
                                placeholder='Enter Your Contact Number(only 10 numbers)'
                                onChange={handleChange}
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                            {contactError && <p className="text-red-500 text-sm mt-1">{contactError}</p>}
                        </div>
                        <div>
                            <label className="font-medium">
                                Password
                            </label>
                            <div className="relative">
                                <a className="text-gray-400 absolute right-3 mt-5 inset-y-0 my-auto hover:text-gray-600"
                                    onClick={() => setPasswordHidden(!isPasswordHidden)}
                                >
                                    {
                                        isPasswordHidden ? (
                                            <FaEye />
                                        ) : (
                                            <FaEyeSlash />
                                        )
                                    }
                                </a>
                                <input
                                    type={isPasswordHidden ? "password" : "text"}
                                    name="password"
                                    value={formData.password}
                                    placeholder='Enter Your Password'
                                    onChange={handleChange}
                                    required
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>
                        </div >

                        <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150" type='submit'>
                            Sign Up
                        </button>
                        {/* {error && <p className="text-red-500 text-center mt-2">{error}</p>} */}
                    </form>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
        </main>
    );
}

export default RegistrationPage;
