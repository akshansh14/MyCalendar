import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useEvents } from "../Context/EventContext"; 
import EventModal from "../components/EventModal";
import { Link } from "react-router-dom";
import CustomToolbar from "../components/CustomToolbar";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const { events, handleDeleteEvent ,handleSaveEvent,setEventToEdit,eventToEdit} = useEvents();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setEventToEdit(null);
    setIsModalOpen(true);
  };

  const handleEventClick = (event) => {
    setSelectedDate(event.start);
    setEventToEdit(event);
    setIsModalOpen(true);
  };

 

  return (
    <div>
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        components={{
          toolbar: CustomToolbar, 
        }}
        events={events}
        onSelectSlot={({ start }) => handleDateClick(start)}
        onSelectEvent={handleEventClick}
        selectable
      />

      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
        selectedDate={selectedDate}
        eventToEdit={eventToEdit}
      />

      <Link to="/events">
        <div className="text-center mt-4 py-2 px-6 bg-blue-700 mx-auto flex justify-center items-center rounded-2xl text-white font-semibold w-[150px]">
          View Events
        </div>
      </Link>
    </div>
  );
};

export default MyCalendar;
