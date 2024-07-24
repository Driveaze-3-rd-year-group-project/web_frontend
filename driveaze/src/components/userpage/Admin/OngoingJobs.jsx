import React from 'react';

const OngoingJobs = () => {
    const members = [
        {
            avatar: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
            name: "John Lorin",
            vehicleType: "Tesla",
            date: "2024/07/23"
        },
        {
            avatar: "https://randomuser.me/api/portraits/men/86.jpg",
            name: "Chris Bondi",
            vehicleType: "Toyota",
            date: "2024/08/23"
        },
        {
            avatar: "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
            name: "Yasmine",
            vehicleType: "Honda",
            date: "2024/09/23"
        },
        {
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f",
            name: "Joseph",
            vehicleType: "BMW",
            date: "2024/10/23"
        },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="bg-white text-white p-4">
                <div className="max-w-2xl mx-auto">
                    {/* Add any other header content here */}
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow">
                <div className="max-w-2xl mx-auto px-4">
                    <div className="items-start justify-between sm:flex">
                        <div>
                            <h2 className="text-gray-800 text-xl font-semibold">Ongoing Jobs</h2>
                            <p className="mt-2 text-gray-600 text-base sm:text-sm">Manage current jobs.</p>
                        </div>

                        {/* Search Form */}
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="relative mt-4 sm:mt-0"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                            />
                        </form>
                    </div>

                    <div className="mt-8">
                        <ul className="divide-y">
                            {members.map(({ avatar, name, vehicleType, date }, idx) => (
                                <li key={idx} className="py-5 flex items-start justify-between">
                                    <div className="flex gap-3">
                                        <img src={avatar} alt={name} className="flex-none w-12 h-12 rounded-full" />
                                        <div>
                                            <span className="block text-sm text-gray-700 font-semibold">{name}</span>
                                            <span className="block text-sm text-gray-600">{vehicleType}</span>
                                            <span className="block text-sm text-gray-600">{date}</span>
                                        </div>
                                    </div>
                                    <a href="/manageog" className="text-gray-700 text-sm border rounded-lg px-3 py-2 duration-150 bg-white hover:bg-gray-100">Manage</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white p-4 mt-8">
                <div className="max-w-2xl mx-auto">
                    <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
                    {/* Add any other footer content here */}
                </div>
            </footer>
        </div>
    );
};

export default OngoingJobs;

