import React, { useState } from 'react';
import { useEvents } from '../Context/EventContext'; // Import useEvents
import EventModal from '../components/EventModal'; // Import the same modal component used in MyCalendar
import { Link } from 'react-router-dom';

const categories = ['All', 'Meeting', 'Workshop', 'Social', 'Deadline', 'Other'];

const EventList = () => {
  const { events, setEvents } = useEvents(); // Get events and setEvents from context
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);

  // Filter events by category
  const filteredEvents = selectedCategory === 'All'
    ? events
    : events.filter(event => event.category === selectedCategory);

  const handleEditEvent = (event) => {
    setEventToEdit(event);
    setIsModalOpen(true);
  };

  const handleDeleteEvent = (event) => {
    // Confirm deletion
    if (window.confirm(`Are you sure you want to delete the event "${event.title}"?`)) {
      setEvents(events.filter(e => e !== event));
    }
  };

  const handleSaveEvent = (updatedEvent) => {
    setEvents(events.map(e => e === eventToEdit ? updatedEvent : e));
    setIsModalOpen(false);
    setEventToEdit(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Event List</h1>
      <div className="mb-4">
        <label className="block mb-2">Filter by Category</label>
        <select
          className="p-2 border border-gray-300 rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <ul>
        {filteredEvents.map((event, index) => (
          <li key={index} className="mb-2 p-2 border border-gray-300 rounded flex justify-between items-center">
            <div>
              <h2 className="font-bold">{event.title}</h2>
              <p>Category: {event.category}</p>
              <p>Date: {event.start.toDateString()}</p>
            </div>
            <div className="ml-4 flex gap-2">
              <button
                onClick={() => handleEditEvent(event)}
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteEvent(event)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <EventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveEvent}
          eventToEdit={eventToEdit}
        />
      )}
      <Link to="/">Back</Link>
    </div>
  );
};

export default EventList;
