import React, { useState, useEffect } from 'react';
import { useEvents } from '../Context/EventContext';

const categories = ['Meeting', 'Workshop', 'Social', 'Deadline', 'Other'];

const EventModal = ({ isOpen, onClose, onDelete, selectedDate, eventToEdit }) => {
  const [title, setTitle] = useState('');
  const { handleSaveEvent} = useEvents();
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Meeting');

  useEffect(() => {
    if (eventToEdit) {
      setTitle(eventToEdit.title);
      setDescription(eventToEdit.description);
      setCategory(eventToEdit.category || 'Meeting');
    } else {
      setTitle('');
      setDescription('');
      setCategory('Meeting');
    }
  }, [eventToEdit]);

  const handleSave = () => {
      const event = {
          title,
          description,
          start: selectedDate,
          end: selectedDate,
          category
        };
        
        handleSaveEvent(event).then(()=>{

            setTitle('');
            setDescription('');
            setCategory('Meeting');
            onClose();
        });
   
  };

  const handleDelete = () => {
    if (eventToEdit) {
      onDelete(eventToEdit);
      setTitle('');
      setDescription('');
      setCategory('Meeting');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold">{eventToEdit ? 'Edit Event' : 'Add Event'}</h2>
        <div className="mt-4">
          <label className="block mb-2">
            Title
            <input
              type="text"
              className="block w-full mt-1 p-2 border border-gray-300 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label className="block mb-2">
            Description
            <textarea
              className="block w-full mt-1 p-2 border border-gray-300 rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label className="block mb-2">
            Category
            <select
              className="block w-full mt-1 p-2 border border-gray-300 rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </label>
          <div className="mt-4 flex justify-end gap-2">
            {eventToEdit && (
              <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
            )}
            <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
