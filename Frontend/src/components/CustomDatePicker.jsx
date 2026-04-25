import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion, AnimatePresence } from "framer-motion";

const CustomDatePicker = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (onDateChange) onDateChange({ start, end });
  };

  return (
    <div className="relative w-full date-picker-container">
      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        monthsShown={2} // Airbnb desktop par 2 mahine dikhata hai
        inline // Isse calendar hamesha khula rahega (Dropdown mein bhi dal sakte ho)
        minDate={new Date()} // Purani dates select nahi hongi
        calendarClassName="airbnb-calendar"
        dayClassName={(date) =>
          "hover:bg-gray-100 rounded-full transition-all duration-200"
        }
      />

      {/* Footer info for user convenience */}
      <div className="flex justify-between items-center mt-4 px-4 pb-2">
        <div className="text-xs text-gray-500 font-medium">
          {startDate && endDate 
            ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
            : "Select check-in and check-out dates"}
        </div>
        <button 
          onClick={() => { setStartDate(null); setEndDate(null); }}
          className="text-xs font-bold underline hover:text-black transition"
        >
          Clear dates
        </button>
      </div>

      {/* Custom Styling for the Library (Add in index.css) */}
      <style>{`
        .airbnb-calendar {
          border: none !important;
          font-family: inherit !important;
          display: flex !important;
          gap: 20px;
        }
        .react-datepicker__header {
          background-color: white !important;
          border-bottom: none !important;
        }
        .react-datepicker__day--selected, 
        .react-datepicker__day--in-range {
          background-color: #222222 !important;
          color: white !important;
          border-radius: 50% !important;
        }
        .react-datepicker__day--in-selecting-range {
          background-color: #f7f7f7 !important;
          color: black !important;
        }
        .react-datepicker__day-name {
          color: #717171 !important;
          font-size: 0.8rem !important;
        }
      `}</style>
    </div>
  );
};

export default CustomDatePicker;