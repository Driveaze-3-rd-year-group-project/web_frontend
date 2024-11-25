import React from 'react'
import { useLocation } from 'react-router-dom';

const Footer = () => {
    const location = useLocation();
    

    const includedRoutes = ['/']; 
    if (!includedRoutes.includes(location.pathname)) {
        return null;
    }

    return (
        <footer className="pt-10">
            <div className="max-w-screen-3xl mx-auto px-4 text-white md:px-8 bg-deepblue">
                <div className="space-y-6 sm:max-w-md sm:mx-auto sm:text-center">
                    <img src="/assets/driveazeheader3.svg" className="w-32 sm:mx-auto" />
                    <p>
                        Book your next service appointment online with Samarasinghe Motors Pvt Ltd. Our certified technicians are ready to help you with all your vehicle needs.
                    </p>
                    <div className="items-center gap-x-3 space-y-3 sm:flex sm:justify-center sm:space-y-0">
                        <a href="/login" className="block py-2 px-4 text-center text-white font-medium bg-indigo-600 duration-150 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-lg hover:shadow-none">
                            Let's get started
                        </a>
                        <a href="/register" className="flex items-center justify-center gap-x-2 py-2 px-4 text-gray-500 hover:text-gray-400 font-medium duration-150 active:bg-gray-100 border rounded-lg md:inline-flex">
                            Register
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </div>
                </div>
                <div className="mt-10 py-10 border-t items-center justify-center sm:flex">
                    <p>© 2024 Samarasinghe Motors Pvt Ltd. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer



