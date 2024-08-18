import React, { useState } from "react";
import { useEvents } from "../Context/EventContext"; 
import EventModal from "../components/EventModal"; 
import { Link } from "react-router-dom";

const categories = [
  "All",
  "Meeting",
  "Workshop",
  "Social",
  "Deadline",
  "Other",
];

const EventList = () => {
  const { events,handleDeleteEvent,handleSaveEvent } = useEvents(); 
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  // eslint-disable-next-line
  const [eventToEdit, setEventToEdit] = useState(null);

  const filteredEvents =
    selectedCategory === "All"
      ? events
      : events.filter((event) => event.category === selectedCategory);

 

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
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <ul>
        {filteredEvents.map((event, index) => (
          <li
            key={index}
            className="mb-2 p-2 border border-gray-300 rounded flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold">{event.title}</h2>
              <p>Category: {event.category}</p>
              <p>Date: {event.start.toDateString()}</p>
            </div>
            <div className="ml-4 flex gap-2">
            
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
          onDelete={handleDeleteEvent}

        />
      )}
       <Link to="/">
      <div className="text-center mt-4 py-2 px-6 bg-blue-700 mx-auto flex justify-center items-center rounded-2xl text-white font-semibold w-[150px]">
      Back
      </div>
      </Link>
    </div>
  );
};

export default EventList;
