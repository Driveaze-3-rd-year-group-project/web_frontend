import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const NewService = () => {
const location = useLocation();


return (
    <div className="max-w-screen-xl mx-auto p-10 shadow-lg ml-5 mt-10 ">
        <div className="max-w-lg">
            <h1 className="text-2xl font-bold mt-2">New Service</h1>
        </div>
        <div className="h-px bg-gray-200 border-t border-gray-400 my-4"></div> 
            <div className="flex flex-col items-center justify-center  shadow-sm border rounded-lg  p-4">
                <div className="max-w-screen-xl h-100 ">
                   
                    <label htmlFor="serviceDate" className="text-gray-700 font-medium block mb-2">
                        Select Date:
                    </label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker label="Basic date time picker" />
                        </DemoContainer>
                    </LocalizationProvider>
                    <div className="flex items-center justify-center m-5">
                        <button className="bg-dered hover:bg-red-900 text-white font-bold py-2 px-2 rounded w-4/5 h-10">
                            Book
                        </button>
                    </div>
            
                </div>

        
            </div>
    </div>
);
};

export default NewService;
