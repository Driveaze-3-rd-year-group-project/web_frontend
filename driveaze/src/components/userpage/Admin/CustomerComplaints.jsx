import React, { useState } from 'react';

const CustomerComplaints = () => {
  const [filterDate, setFilterDate] = useState('');
  const [feedbackItems, setFeedbackItems] = useState([
    {
      name: 'Liam James',
      phone: '+1 (555) 000-000',
      comment: 'On-time delivery',
      date: '2024-07-23',
      status: '',
    },
    {
      name: 'Olivia Emma',
      phone: '+1 (555) 000-000',
      comment: 'Needs improvement',
      date: '2024-07-22',
      status: '',
    },
    {
      name: 'William Benjamin',
      phone: '+1 (555) 000-000',
      comment: 'Excellent service',
      date: '2024-07-21',
      status: '',
    },
    {
      name: 'Henry Theodore',
      phone: '+1 (555) 000-000',
      comment: 'Prompt response',
      date: '2024-07-20',
      status: '',
    },
    {
      name: 'Amelia Elijah',
      phone: '+1 (555) 000-000',
      comment: 'Issue resolved quickly',
      date: '2024-07-19',
      status: '',
    },
  ]);

  const handleStatusChange = (index, newStatus) => {
    const updatedItems = [...feedbackItems];
    updatedItems[index].status = newStatus;
    setFeedbackItems(updatedItems);
  };

  const handleCreateReport = () => {
    const positiveItems = feedbackItems.filter(item => item.status === 'positive');
    const negativeItems = feedbackItems.filter(item => item.status === 'negative');
    console.log(`Creating report for Positive feedback items: `, positiveItems);
    console.log(`Creating report for Negative feedback items: `, negativeItems);
    // Implement logic to create report based on positiveItems and negativeItems
  };

  const filterRecords = () => {
    if (!filterDate) {
      return feedbackItems;
    }
    return feedbackItems.filter((item) => item.date.startsWith(filterDate));
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">Customer Complaints</h3>
          <p className="text-gray-600 mt-2">Manage customer complaints and feedback.</p>
        </div>
        <div className="mt-3 md:mt-0 flex items-center">
          <div className="flex items-center border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-indigo-600">
            <span className="text-sm text-gray-700 mr-2">Filter by Month:</span>
            <input
              type="month"
              className="border-none outline-none text-sm"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
          </div>
          <button
            onClick={handleCreateReport}
            className="ml-2 px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
          >
          View Analytics
          </button>
          <button
            onClick={() => setFilterDate('')}
            className="ml-2 px-4 py-2 text-gray-600 duration-150 font-medium bg-gray-200 rounded-lg hover:bg-gray-300 active:bg-gray-400 md:text-sm"
          >
            Clear Filter
          </button>
        </div>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Username</th>
              <th className="py-3 px-6">Phone</th>
              <th className="py-3 px-6">Comment</th>
              <th className="py-3 px-6">Date</th>
              <th className="py-3 px-6">Mark as</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {filterRecords().map((item, idx) => (
              <tr key={idx}>
                <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                  <div>
                    <span className="block text-gray-700 text-sm font-medium">{item.name}</span>
                    <span className="block text-gray-700 text-xs">{item.phone}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.comment}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                <td className="text-right px-6 whitespace-nowrap">
                  <div className="flex gap-2">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-4 w-4 text-indigo-600"
                        name={`status-${idx}`}
                        value="positive"
                        checked={item.status === 'positive'}
                        onChange={() => handleStatusChange(idx, 'positive')}
                      />
                      <span className={`ml-2 text-sm ${item.status === 'positive' ? 'text-green-600' : 'text-gray-700'}`}>Positive</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-4 w-4 text-red-600"
                        name={`status-${idx}`}
                        value="negative"
                        checked={item.status === 'negative'}
                        onChange={() => handleStatusChange(idx, 'negative')}
                      />
                      <span className={`ml-2 text-sm ${item.status === 'negative' ? 'text-red-600' : 'text-gray-700'}`}>Negative</span>
                    </label>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerComplaints;



