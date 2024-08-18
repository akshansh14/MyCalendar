import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyCalendar from './Pages/MyCalendar';
import EventList from './Pages/EventList';



function App() {
  return (
    <div className="App">
       <Routes>
        <Route path="/" element={<MyCalendar />} />
        <Route path="/events" element={<EventList/>} />
      </Routes>
    </div>
  );
}

export default App;
