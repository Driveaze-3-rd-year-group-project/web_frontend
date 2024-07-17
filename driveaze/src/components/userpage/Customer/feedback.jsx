import React, { useState, useRef, useEffect } from 'react';
import { FaCircle } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import { MdReport } from "react-icons/md";
import { VscFeedback } from "react-icons/vsc";

const Feedback = () => {

  const members = [
    {
      icon: <VscFeedback size="40" className="text-dered"/>,
      title: "Send us your thoughts",
    }, 
    {
      icon: <MdReport size="40"  className="text-dered"/>,
      title: "Report a issue",
    }
  ];

  const [isOpen, setIsOpen] = useState(false);  // State variable for popup
  const [selectedMember, setSelectedMember] = useState(null);  // Track selected member
  const popupRef = useRef(null); // Ref for the popup element

  const handleItemClick = (member) => {
    setIsOpen(true);
    setSelectedMember(member);
  };

  const handleClosePopup = () => {
    setIsOpen(false);
    setSelectedMember(null);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      handleClosePopup();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="max-w-2xl mx-auto px-4 mt-40">
      <ul className="mt-12 divide-y">
        {
          members.map((item, idx) => (
            <li key={idx} className="p-5 rounded bg-deepblue flex items-start justify-between cursor-pointer hover:bg-blue-100" onClick={() => handleItemClick(item)}>  {/* Make clickable & hover effect */}
              <div className="flex gap-3">
                {item.icon}
                <div className="ml-2">
                  <span className="text-xl text-white block text-sm text-gray-700 font-semibold"> {item.title}</span>
                </div>
              </div>
            </li>
          ))
        }
      </ul>

      {/* Popup component (conditionally rendered) */}
      {isOpen && selectedMember && (
        <div className="fixed w-full h-full top-0 left-0  bg-gray-200 bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-deepblue w-1/2 h-38 p-4 rounded-lg shadow-md" ref={popupRef}>  {/* Set minimum width & height for popup */}
            <h2 className="p-5 text-white text-xl font-semibold mb-4">{selectedMember.title}</h2>
            <textarea className="w-full h-48 border rounded p-2" placeholder="Enter your feedback"></textarea>  {/* Increased textarea height */}
            <div className="flex justify-end mt-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleClosePopup}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedback;
