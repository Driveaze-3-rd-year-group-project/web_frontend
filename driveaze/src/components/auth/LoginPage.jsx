import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../service/UserService';
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [isPasswordHidden, setPasswordHidden] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = await UserService.login(email, password);
            if (userData.token) {
                localStorage.setItem('token', userData.token);
                localStorage.setItem('role', userData.role);

                toast.success("Login successful!");
                setTimeout(() => {
                    location.href = '/dashboard';
                }, 1000);
            } else {
                toast.error(userData.message || "Login failed!");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message || "An unexpected error occurred!");
        }
    };

    return (
        <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-100 sm:px-4">
            <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
                <div className="bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg">
                    <div className="flex justify-end">
                        <button className="text-gray-500 hover:text-gray-800" onClick={() => location.href='/'}>
                            <FaArrowLeft />
                        </button>
                    </div>
                    <div className="text-center">
                        <img src="./src/assets/driveazeheader.svg" width={150} className="mx-auto" />
                        <div className="mt-5 space-y-2">
                            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Log in to your account</h3>
                            <p>Don't have an account? <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</a></p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                        <div>
                            <label className="font-medium">Email</label>
                            <input
                                type="email"
                                value={email}
                                placeholder='Enter Your Email'
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="font-medium">Password</label>
                            <div className="relative">
                                <a className="text-gray-400 absolute right-3 mt-5 inset-y-0 my-auto hover:text-gray-600"
                                    onClick={() => setPasswordHidden(!isPasswordHidden)}
                                >
                                    {isPasswordHidden ? <FaEye /> : <FaEyeSlash />}
                                </a>
                                <input
                                    type={isPasswordHidden ? "password" : "text"}
                                    value={password}
                                    placeholder='Enter Your Password'
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>
                        </div>
                        <button
                            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                        >
                            Sign in
                        </button>
                    </form>
                </div>
                <div className="text-center">
                    <a href="/forgetpassword" className="hover:text-indigo-600">Forgot password?</a>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
        </main>
    );
}

export default LoginPage;
