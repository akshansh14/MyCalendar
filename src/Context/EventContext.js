import React, { createContext, useState, useContext } from 'react';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [eventToEdit, setEventToEdit] = useState(null);

  const handleDeleteEvent = (event) => {
    setEvents(events.filter(e => e !== event));
  };

  const handleSaveEvent = async (event) => {
    if (eventToEdit) {
     await setEvents(events.map((e) => (e === eventToEdit ? event : e)));
    } else {
     await  setEvents([...events, event]);
    }
  };

  

  return (
    <EventContext.Provider value={{ events, setEvents ,handleDeleteEvent,handleSaveEvent,eventToEdit,setEventToEdit}}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);
