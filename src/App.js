import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyCalendar from "./Pages/MyCalendar";
import EventList from "./Pages/EventList";
import { EventProvider } from "./Context/EventContext";

function App() {
  return (
    <div className="App">
      <EventProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MyCalendar />} />
            <Route path="/events" element={<EventList />} />
          </Routes>
        </Router>
      </EventProvider>
    </div>
  );
}

export default App;
