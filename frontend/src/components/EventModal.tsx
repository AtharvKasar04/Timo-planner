import React from 'react';
import { useState } from 'react';
import { format } from 'date-fns';
import { useAppDispatch } from '../hooks';
import { Event, EventCategory } from '../types/index';
import { createEvent, updateEvent, deleteEvent } from '../store/slices/eventsSlice';
import './EventModal.css';

interface EventModalProps {
  event: Event | null;
  timeSlot: { date: Date; hour: number } | null;
  onClose: () => void;
}

function EventModal({ event, timeSlot, onClose }: EventModalProps) {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState(event?.title || '');
  const [category, setCategory] = useState<EventCategory>(event?.category || EventCategory.WORK);
  const [startTime, setStartTime] = useState(
    event ? format(new Date(event.startTime), "yyyy-MM-dd'T'HH:mm") :
    timeSlot ? format(new Date(timeSlot.date).setHours(timeSlot.hour), "yyyy-MM-dd'T'HH:mm") :
    format(new Date(), "yyyy-MM-dd'T'HH:mm")
  );
  const [endTime, setEndTime] = useState(
    event ? format(new Date(event.endTime), "yyyy-MM-dd'T'HH:mm") :
    timeSlot ? format(new Date(timeSlot.date).setHours(timeSlot.hour + 1), "yyyy-MM-dd'T'HH:mm") :
    format(new Date().setHours(new Date().getHours() + 1), "yyyy-MM-dd'T'HH:mm")
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent = {
      title,
      category,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      color: getCategoryColor(category),
      isExpanded: false,
    };

    if (event) {
      dispatch(updateEvent({ ...event, ...newEvent }));
    } else {
      dispatch(createEvent(newEvent));
    }
    onClose();
  };

  const handleDelete = () => {
    if (event) {
      dispatch(deleteEvent(event._id));
      onClose();
    }
  };

  const getCategoryColor = (category: EventCategory): string => {
    const colors: Record<EventCategory, string> = {
      [EventCategory.EXERCISE]: '#FF6B6B',
      [EventCategory.EATING]: '#4ECDC4',
      [EventCategory.WORK]: '#45B7D1',
      [EventCategory.RELAX]: '#96CEB4',
      [EventCategory.FAMILY]: '#FFEEAD',
      [EventCategory.SOCIAL]: '#D4A5A5',
    };
    return colors[category];
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{event ? 'Edit Event' : 'Create Event'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as EventCategory)}
            >
              {Object.values(EventCategory).map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Start Time</label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>End Time</label>
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
          <div className="modal-buttons">
            <button type="submit">{event ? 'Update' : 'Create'}</button>
            {event && (
              <button type="button" onClick={handleDelete} className="delete-button">
                Delete
              </button>
            )}
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventModal; 