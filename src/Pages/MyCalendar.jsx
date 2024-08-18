import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Link } from 'react-router-dom';
import CustomToolbar from '../components/CustomToolbar';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventToEdit, setEventToEdit] = useState(null);

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
        onSelectSlot={({ start }) => handleDateClick(start)}
        onSelectEvent={handleEventClick}
        selectable
      />

    
      <Link to="/events">View List </Link>
    </div>
  );
};

export default MyCalendar;
