import React, { useState } from 'react';

function SiteAnnouncements() {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to today's date

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') setTitle(value);
    if (name === 'description') setDescription(value);
    if (name === 'date') setDate(value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle the submission logic here, like updating state or making an API call
    console.log("New Announcement:", { title, description, date });
    setTitle('');
    setDescription('');
    setDate(new Date().toISOString().split('T')[0]); // Reset to today's date
    setShowForm(false);
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setDate(new Date().toISOString().split('T')[0]); // Reset to today's date
    setShowForm(false);
  };

  return (
    <div className="mt-8 flex justify-center">
      <div className="w-full max-w-lg">
        <div className="flex justify-end">
          <button 
            onClick={handleButtonClick} 
            className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-md"
          >
            Create new announcement
          </button>
        </div>
        {showForm && (
          <form onSubmit={handleFormSubmit} className="mt-4 p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
            <div className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="title" className="text-gray-700 font-medium mb-1">Title</label>
                <input 
                  type="text" 
                  id="title"
                  name="title"
                  value={title} 
                  onChange={handleInputChange} 
                  className="border border-gray-300 p-2 rounded-md"
                  placeholder="Enter the title here"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="description" className="text-gray-700 font-medium mb-1">Description</label>
                <textarea 
                  id="description"
                  name="description"
                  value={description} 
                  onChange={handleInputChange} 
                  className="border border-gray-300 p-2 rounded-md"
                  placeholder="Enter the description here"
                  rows="4"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="date" className="text-gray-700 font-medium mb-1">Date</label>
                <input 
                  type="date" 
                  id="date"
                  name="date"
                  value={date} 
                  onChange={handleInputChange} 
                  className="border border-gray-300 p-2 rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Submit
                </button>
                <button 
                  type="button" 
                  onClick={handleCancel} 
                  className="px-4 py-2 bg-gray-500 text-white rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

const JobListings = () => {
  const jobs = [
    {
      title: "Holiday Tomorrow",
      desc: "Please note that tomorrow has been declared a holiday for all employees",
      date: "May 17, 2022",
    },
    {
      title: "Work hours extended till 6.00pm",
      desc: "Please note that due to ongoing jobs work hours have been extended",
      date: "Nov 11, 2022",
    },
    {
      title: "Job opportunity for a mechanic",
      desc: "Please share this around. Your recommendations are welcome",
      date: "Jan 2, 2022",
    },
  ];

  return (
    <section className="mt-12 max-w-screen-lg mx-auto px-4 md:px-8">
      <div>
        <h2 className="text-gray-800 text-3xl font-semibold">
          Announcement History
        </h2>
      </div>

      <ul className="mt-12 space-y-6">
        {
          jobs.map((item, idx) => (
            <li key={idx} className="p-5 bg-white rounded-md shadow-sm">
              <div>
                <div className="justify-between sm:flex">
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-cyan-600">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 mt-2 pr-2">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-5 space-y-4 text-sm sm:mt-0 sm:space-y-2">
                    <span className="flex items-center text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      {item.date}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))
        }
      </ul>
    </section>
  );
}

const App = () => {
  return (
    <div>
      <SiteAnnouncements />
      <JobListings />
    </div>
  );
}

export default App;
