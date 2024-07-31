import React from 'react';

function ReportsAnalytics() {
  return (
    <main className="py-14">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="max-w-lg mx-auto space-y-3 sm:text-center">
          <h3 className="text-indigo-600 font-semibold text-xl sm:text-2xl">Generate Reports</h3>
        </div>
        <div className="mt-12 max-w-lg mx-auto border border-gray-300 p-6 rounded-lg shadow-md">
          <form action="#" method="POST" id="reportForm" className="space-y-5">
            <div className="border border-gray-300 p-4 rounded-lg">
              <label htmlFor="report_type" className="font-medium">Select Report Type:</label>
              <select
                name="report_type"
                id="report_type"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-gray-300 focus:border-indigo-600 rounded-lg"
              >
                <option hidden value="">Select One</option>
                <option value="Vehicle Summary Report">Vehicle Summary Report</option>
                <option value="Service Summary Report">Service Summary Report</option>
                <option value="Income Summary Report">Income Summary Report</option>
                <option value="Income Summary Report">Customer Complaints Report</option>
              </select>
              <span id="report_type_error" className="text-red-500 text-sm block mt-2"></span>
            </div>

            <div id="income_report" className="border border-gray-300 p-4 rounded-lg hidden">
              <label htmlFor="income_report_type" className="font-medium">Income Report Type:</label>
              <select
                name="income_report_type"
                id="income_report_type"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-gray-300 focus:border-indigo-600 rounded-lg"
              >
                <option hidden value="">Select One</option>
                <option value="Service Income">Service Income</option>
                <option value="Parts Income">Parts Income</option>
              </select>
              <span id="income_report_type_error" className="text-red-500 text-sm block mt-2"></span>
            </div>

            <div className="border border-gray-300 p-4 rounded-lg">
              <div>
                <label htmlFor="start_date" className="font-medium">From Date:</label>
                <input
                  type="date"
                  name="start_date"
                  id="start_date"
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-gray-300 focus:border-indigo-600 rounded-lg"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="end_date" className="font-medium">To Date:</label>
                <input
                  type="date"
                  name="end_date"
                  id="end_date"
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-gray-300 focus:border-indigo-600 rounded-lg"
                />
              </div>
              <span id="date_error" className="text-red-500 text-sm block mt-2"></span>
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg duration-150"
              >
                Generate Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default ReportsAnalytics;
