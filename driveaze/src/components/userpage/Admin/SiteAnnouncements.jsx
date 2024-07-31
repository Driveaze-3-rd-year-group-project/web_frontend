// import React, { useState } from 'react';

// function SiteAnnouncements() {
//   const [showForm, setShowForm] = useState(false);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to today's date

//   const handleButtonClick = () => {
//     setShowForm(!showForm);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'title') setTitle(value);
//     if (name === 'description') setDescription(value);
//     if (name === 'date') setDate(value);
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     // Handle the submission logic here, like updating state or making an API call
//     console.log("New Announcement:", { title, description, date });
//     setTitle('');
//     setDescription('');
//     setDate(new Date().toISOString().split('T')[0]); // Reset to today's date
//     setShowForm(false);
//   };

//   const handleCancel = () => {
//     setTitle('');
//     setDescription('');
//     setDate(new Date().toISOString().split('T')[0]); // Reset to today's date
//     setShowForm(false);
//   };

//   return (
//     <div className="mt-8 flex justify-center">
//       <div className="w-full max-w-lg">
//         <div className="flex justify-end">
//           <button 
//             onClick={handleButtonClick} 
//             className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-md"
//           >
//             Create new announcement
//           </button>
//         </div>
//         {showForm && (
//           <form onSubmit={handleFormSubmit} className="mt-4 p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
//             <div className="space-y-4">
//               <div className="flex flex-col">
//                 <label htmlFor="title" className="text-gray-700 font-medium mb-1">Title</label>
//                 <input 
//                   type="text" 
//                   id="title"
//                   name="title"
//                   value={title} 
//                   onChange={handleInputChange} 
//                   className="border border-gray-300 p-2 rounded-md"
//                   placeholder="Enter the title here"
//                   required
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label htmlFor="description" className="text-gray-700 font-medium mb-1">Description</label>
//                 <textarea 
//                   id="description"
//                   name="description"
//                   value={description} 
//                   onChange={handleInputChange} 
//                   className="border border-gray-300 p-2 rounded-md"
//                   placeholder="Enter the description here"
//                   rows="4"
//                   required
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label htmlFor="date" className="text-gray-700 font-medium mb-1">Date</label>
//                 <input 
//                   type="date" 
//                   id="date"
//                   name="date"
//                   value={date} 
//                   onChange={handleInputChange} 
//                   className="border border-gray-300 p-2 rounded-md"
//                   required
//                 />
//               </div>
//               <div className="flex justify-end space-x-2 mt-4">
//                 <button 
//                   type="submit" 
//                   className="px-4 py-2 bg-blue-500 text-white rounded-md"
//                 >
//                   Submit
//                 </button>
//                 <button 
//                   type="button" 
//                   onClick={handleCancel} 
//                   className="px-4 py-2 bg-gray-500 text-white rounded-md"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }

// const JobListings = () => {
  // const jobs = [
  //   {
  //     title: "Holiday Tomorrow",
  //     desc: "Please note that tomorrow has been declared a holiday for all employees",
  //     date: "May 17, 2022",
  //   },
  //   {
  //     title: "Work hours extended till 6.00pm",
  //     desc: "Please note that due to ongoing jobs work hours have been extended",
  //     date: "Nov 11, 2022",
  //   },
  //   {
  //     title: "Job opportunity for a mechanic",
  //     desc: "Please share this around. Your recommendations are welcome",
  //     date: "Jan 2, 2022",
  //   },
  // ];

//   return (
//     <section className="mt-12 max-w-screen-lg mx-auto px-4 md:px-8">
//       <div>
//         <h2 className="text-gray-800 text-3xl font-semibold">
//           Announcement History
//         </h2>
//       </div>

//       <ul className="mt-12 space-y-6">
//         {
//           jobs.map((item, idx) => (
//             <li key={idx} className="p-5 bg-white rounded-md shadow-sm">
//               <div>
//                 <div className="justify-between sm:flex">
//                   <div className="flex-1">
//                     <h3 className="text-xl font-medium text-cyan-600">
//                       {item.title}
//                     </h3>
//                     <p className="text-gray-500 mt-2 pr-2">
//                       {item.desc}
//                     </p>
//                   </div>
//                   <div className="mt-5 space-y-4 text-sm sm:mt-0 sm:space-y-2">
//                     <span className="flex items-center text-gray-500">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
//                       </svg>
//                       {item.date}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </li>
//           ))
//         }
//       </ul>
//     </section>
//   );
// }

// const App = () => {
//   return (
//     <div>
//       <SiteAnnouncements />
//       <JobListings />
//     </div>
//   );
// }

// export default App;
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import Calendar from '../Calender';
import { FaTimes, FaEnvelope } from "react-icons/fa";

const SiteAnnouncements = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  // const members = [
  //   {
  //       icon: "https://i.pinimg.com/736x/7b/51/cc/7b51cc879d02e11f06c34858f850424c.jpg",
  //       brand: "Honda",
  //       model: "Civic",
  //       vehi_no: "CBH-1312",
  //       status: "Completed",
  //       date: "3/16/2023",
  //       time: "10:00AM"
  //   }, {
  //       icon: "https://i.pinimg.com/736x/7b/51/cc/7b51cc879d02e11f06c34858f850424c.jpg",
  //       brand: "Toyota",
  //       model: "Axio",
  //       vehi_no: "CBH-1312",
  //       status: "Upcoming",
  //       date: "4/16/2023",
  //       time: "10:00AM"
  //   }, {
  //       icon: "https://i.pinimg.com/736x/7b/51/cc/7b51cc879d02e11f06c34858f850424c.jpg",
  //       brand: "Nissan",
  //       model: "Caravan",
  //       vehi_no: "CBH-1312",
  //       status: "Completed",
  //       date: "5/16/2023",
  //       time: "10:00AM"
  //   }, {
  //       icon: "https://i.pinimg.com/736x/7b/51/cc/7b51cc879d02e11f06c34858f850424c.jpg",
  //       brand: "Toyota",
  //       model: "Premio",
  //       vehi_no: "CBH-1312",
  //       status: "Completed",
  //       date: "6/16/2023",
  //       time: "10:00AM"
  //   },
  // ]

  const jobs = [
    {
      title: "Holiday Tomorrow",
      desc: "Please note that tomorrow has been declared a holiday for all employees",
      date: "May 17, 2022",
      status: "Employees",
      time: "10:00AM"
    },
    {
      title: "Work hours extended till 6.00pm",
      desc: "Please note that due to ongoing jobs work hours have been extended",
      date: "Nov 11, 2022",
      status: "All",
      time: "10:00AM"
    },
    {
      title: "Job opportunity for a mechanic",
      desc: "Please share this around. Your recommendations are welcome",
      date: "Jan 2, 2022",
      status: "Customers",
      time: "10:00AM"
    },
  ];
 

  const labelColors = {
    "Customers": {
        color: "text-green-600 bg-green-50",
    },
    "Employees": {
        color: "text-red-600 bg-red-50",
    },
    "All": {
        color: "text-blue-600 bg-blue-50",
    },
  }

  return (
        <div className="max-w-screen-lg mt-14 mx-auto px-4">
          <div className="items-start justify-between sm:flex">
            <div>
              <h4 className="text-gray-800 text-3xl font-semibold">Site Announcements</h4>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <select
              className="py-2 px-6 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <option value="all">All</option>
              <option value="completed">Customers</option>
              <option value="upcoming">Employees</option>
            </select>
            <a onClick={handleClick} className="inline-flex items-center justify-center gap-1 py-2 px-3 mt-2 font-medium text-sm text-center text-white bg-green-600 hover:bg-green-500 active:bg-green-700 rounded-lg sm:mt-0">
                New Announcement
            </a>
          </div>
          <ul className="mt-12 divide-y">
            {
              jobs.map((item, idx) => (
                <li key={idx} className="py-5 flex items-start justify-between">
                    <div className="flex gap-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 mr-3">
                          <FaEnvelope />
                        </div>
                        <div className='relative flex flex-row'>
                        <div>
                            <span className="block text-md text-gray-700 font-semibold">{item.title}</span>
                        </div> 
                        <div className="absolute items-center ml-[28rem]">
                          <span className="inline-flex items-center space-x-1 text-sm text-gray-600 whitespace-nowrap">
                            <span>{item.date}</span>
                          </span>
                        </div>
                        <div className="absolute items-center ml-[35rem]">
                          <span className="inline-flex items-center space-x-1 text-sm text-gray-600 whitespace-nowrap">
                            <span>{item.time}</span>
                          </span>
                        </div>
                        <div className='absolute ml-[45rem]'>
                            <span className={`py-2 px-3 rounded-full font-semibold text-xs ${labelColors[item?.status]?.color || ""}`}>{item.status}</span>
                        </div>   
                        </div>
                    </div>
                </li>
              ))
            }
          </ul>

      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full">
                <div className="flex justify-between items-center pb-3 relative">
                    <button 
                        onClick={closePopup} 
                        className="absolute top-0 right-0 text-gray-600 hover:text-gray-900"
                    >
                        <FaTimes />
                    </button>
                </div>
                <ServiceBookingDetails closePopup={closePopup} />
            </div>
        </div>
      )}
    </div>
  );
};

const ServiceBookingDetails = ({ closePopup }) => {
  return (
    <main className="py-14">
      <div className="max-w-screen-xl mx-auto my-auto px-4 text-gray-600 md:px-8">
        <div className="max-w-lg mx-auto space-y-3 sm:text-center">
          <h3 className="text-indigo-600 text-xl font-semibold">
            Create Site Announcement
          </h3>
        </div>
        <div className="mt-12 max-w-lg mx-auto">
          <form onSubmit={(e) => {
            e.preventDefault();
            closePopup();
          }} className="space-y-5">
            <div>
              <label className="font-medium">Title</label>
              <input
                type="text"
                placeholder='Enter the title here'
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
              <div>
                <label className="font-medium">Content</label>
                <textarea 
                  class="w-full h-20 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter the announcement here..."
                >
                </textarea>
              </div>
            </div>   
            <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
                <div>
                    <label className="font-medium">Sheduled Time</label>
                    <input
                        type="datetime-local"
                        required
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
                </div>
            </div>  
            <div className="flex items-center justify-between mt-6">
              <button
                type="button"
                onClick={closePopup}
                className="w-40 h-12 flex items-center justify-center text-white font-medium bg-red-500 hover:bg-red-400 active:bg-red-600 mt-6 rounded-lg duration-150"
              >
                Back
              </button>
              <button
                type="submit"
                className="w-40 h-12 flex items-center justify-center text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 mt-6 rounded-lg duration-150"
              >
                Send
              </button>    
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SiteAnnouncements;