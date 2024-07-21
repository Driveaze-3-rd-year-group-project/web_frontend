import React from "react";

const JobCreate = () => {
  return (
    <main className="py-14">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="max-w-lg mx-auto space-y-3 sm:text-center">
          <h3 className="text-indigo-600 font-semibold">Create New Job</h3>
        </div>
        <div className="mt-12 max-w-lg mx-auto">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            <div>
              <label className="font-medium">Vehicle Number</label>
              <input
                type="text"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Job Started Date</label>
              <input
                type="date"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Assigned Supervisor</label>
              <input
                type="text"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">
                Service Request(Details given by Customer)
              </label>
              <textarea
                required
                className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              ></textarea>
            </div>
            <div className="flex justify-between items-center mt-6">
              <a
                href="/jobmanagement"
                className="px-4 py-2 text-white font-medium bg-red-500 hover:bg-red-400 active:bg-red-600 rounded-lg duration-150"
              >
                Back
              </a>
              <button
                type="submit"
                className="px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg duration-150"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default JobCreate;
