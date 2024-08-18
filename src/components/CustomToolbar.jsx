import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useState } from 'react';

// Localizer setup
const localizer = momentLocalizer(moment);

// Custom Toolbar Component
const CustomToolbar = ({ label, date, onNavigate, onView }) => {
  const [showDecadePicker, setShowDecadePicker] = useState(false);
  const [currentCentury, setCurrentCentury] = useState(Math.floor(date.getFullYear() / 100) * 100);

  // Function to toggle decade picker visibility
  const toggleDecadePicker = () => {
    setShowDecadePicker(!showDecadePicker);
  };

  // Function to navigate to a specific decade (start of the decade)
  const navigateToDecade = (year) => {
    setShowDecadePicker(false);
    onNavigate('DATE', moment(date).year(year).startOf('decade').toDate());
  };

  // Function to navigate between centuries
  const changeCentury = (direction) => {
    setCurrentCentury(currentCentury + (direction === 'NEXT' ? 100 : -100));
  };

  // Function to navigate to today's date
  const goToToday = () => {
    onNavigate('DATE', new Date());
  };

  return (
    <div className="relative flex items-center justify-between p-4 bg-blue-500 text-white">
      <button onClick={() => onNavigate('PREV')} className="px-4 py-2">Back</button>
      <span className="text-lg font-bold cursor-pointer" onClick={toggleDecadePicker}>
        {showDecadePicker ? `${currentCentury} - ${currentCentury + 99}` : label}
      </span>
      <button onClick={() => onNavigate('NEXT')} className="px-4 py-2">Next</button>
      <button onClick={goToToday} className="px-4 py-2 bg-green-500 hover:bg-green-600">Today</button>
      <div>
        <button onClick={() => onView('month')} className="px-2 py-1">Month</button>
        <button onClick={() => onView('week')} className="px-2 py-1">Week</button>
        <button onClick={() => onView('day')} className="px-2 py-1">Day</button>
      </div>

      {/* Decade Picker Dropdown */}
      {showDecadePicker && (
        <div className="absolute top-full mt-2 w-60 bg-white text-black p-2 rounded shadow-lg">
          <div className="flex justify-between mb-2">
            <button onClick={() => changeCentury('PREV')} className="px-2 py-1 text-blue-500">Previous Century</button>
            <button onClick={() => changeCentury('NEXT')} className="px-2 py-1 text-blue-500">Next Century</button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 10 }, (_, i) => currentCentury + i * 10).map((decadeStart) => (
              <button
                key={decadeStart}
                onClick={() => navigateToDecade(decadeStart)}
                className="p-2 hover:bg-gray-200"
              >
                {`${decadeStart} - ${decadeStart + 9}`}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomToolbar;
