import React from 'react';

function CustomerReports() {
  const stats = [
    {
      data: "35K",
      title: "Customers"
    },
    {
      data: "10K+",
      title: "Likes"
    },
    {
      data: "30M+",
      title: "Total revenue"
    },
  ];

  return (
    <section className="py-14 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        {/* Existing Content */}
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
            Our customers are always happy
          </h3>
          <p className="mt-3 text-gray-600">
            “Efficiently manage customer data and improve response handling by generating comprehensive reports.”
          </p>
        </div>
        <div className="mt-12">
          <ul className="flex flex-col items-center justify-center gap-y-14 sm:flex-row sm:flex-wrap sm:gap-x-14 lg:gap-x-20 lg:divide-x lg:divide-gray-300">
            {
              stats.map((item, idx) => (
                <li key={idx} className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center text-center">
                  <h4 className="text-4xl text-indigo-600 font-semibold mb-3">{item.data}</h4>
                  <p className="text-gray-700 font-medium">{item.title}</p>
                </li>
              ))
            }
          </ul>
        </div>

        {/* Input Form */}
        <div className="mt-12 bg-white p-8 rounded-lg shadow-lg">
          <h4 className="text-gray-800 text-xl font-bold mb-4">Select Data to Create a Report</h4>
          <form className="space-y-6">
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex-1">
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="flex-1 mt-4 md:mt-0">
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  id="endDate"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="formType" className="block text-sm font-medium text-gray-700">Form Type</label>
              <div className="flex flex-col mt-2 space-y-2">
                <label className="inline-flex items-center">
                  <input type="radio" className="form-radio text-indigo-600" name="formType" value="Customers" />
                  <span className="ml-2">Customers</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" className="form-radio text-indigo-600" name="formType" value="Likes" />
                  <span className="ml-2">Likes</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" className="form-radio text-indigo-600" name="formType" value="Revenue" />
                  <span className="ml-2">Revenue</span>
                </label>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 text-white bg-indigo-600 rounded-md shadow-lg hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default CustomerReports;


