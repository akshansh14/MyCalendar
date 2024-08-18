import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useEvents } from '../Context/EventContext'; // Import useEvents
import EventModal from '../components/EventModal';
import { Link } from 'react-router-dom';
import CustomToolbar from '../components/CustomToolbar';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const { events, setEvents } = useEvents(); // Get events from context
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

  const handleSaveEvent = (event) => {
    if (eventToEdit) {
      setEvents(events.map(e => e === eventToEdit ? event : e));
    } else {
      setEvents([...events, event]);
    }
  };

  const handleDeleteEvent = (event) => {
    setEvents(events.filter(e => e !== event));
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        components={{
          toolbar: CustomToolbar, // Use the custom toolbar
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

      <Link to="/events">View List </Link>
    </div>
  );
};

export default MyCalendar;
