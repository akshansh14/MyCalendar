import moment from 'moment';
import { useState } from 'react';


const CustomToolbar = ({ label, date, onNavigate, onView }) => {
  const [showDecadePicker, setShowDecadePicker] = useState(false);
  const [currentCentury, setCurrentCentury] = useState(Math.floor(date.getFullYear() / 100) * 100);

  const toggleDecadePicker = () => {
    setShowDecadePicker(!showDecadePicker);
  };

  const navigateToDecade = (year) => {
    setShowDecadePicker(false);
    onNavigate('DATE', moment(date).year(year).startOf('decade').toDate());
  };

  const changeCentury = (direction) => {
    setCurrentCentury(currentCentury + (direction === 'NEXT' ? 100 : -100));
  };

  const goToToday = () => {
    onNavigate('DATE', new Date());
  };

  return (
    <div className="relative flex items-center justify-between p-2 py-3 bg-blue-700 text-white">
      <div className='bg-white text-black px-2 rounded-full grig grid-cols-3'>
      <button onClick={() => onNavigate('PREV')} className="px-4 py-2">Back</button>
      <button onClick={() => onNavigate('NEXT')} className="px-4 py-2">Next</button>
      <button onClick={goToToday} className="px-4 py-2 ">Today</button>
      </div>
      <span className=" font-bold cursor-pointer text-xl" onClick={toggleDecadePicker}>
        {showDecadePicker ? `${currentCentury} - ${currentCentury + 99}` : label}
      </span>
      <div className='bg-gray-200 text-black font-semibold px-2 rounded-full grig grid-cols-3'>
        <button onClick={() => onView('month')} className="px-2 py-2 border-r-2">Month</button>
        <button onClick={() => onView('week')} className="px-2 py-2">Week</button>
        <button onClick={() => onView('day')} className="px-2 py-2 border-l-2">Day</button>
      </div>

      {/* Decade Picker Dropdown */}
      {showDecadePicker && (
        <div className="absolute top-full mt-2 w-60 z-40 bg-white text-black p-2 rounded shadow-lg">
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
