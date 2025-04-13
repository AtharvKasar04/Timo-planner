// import React from 'react';
import { useDrag } from 'react-dnd';
import { format, parseISO } from 'date-fns';
import { Event } from '../types/index';
import './CalendarEvent.css';

interface CalendarEventProps {
  event: Event;
  onClick: (event: Event) => void;
  hourHeight: number;
  onDrop: (event: Event, dropDate: Date, dropHour: number) => void;
}

const ItemTypes = {
  EVENT: 'event'
};

function CalendarEvent({ event, onClick, hourHeight, onDrop }: CalendarEventProps) {
  if (!event._id) {
    console.warn('Event is missing _id:', event);
    return null;
  }

  const startTime = parseISO(event.startTime);
  const endTime = parseISO(event.endTime);
  const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60); // in hours
  const height = duration * hourHeight;
  const top = startTime.getHours() * hourHeight + (startTime.getMinutes() / 60) * hourHeight + 60; // Add header height

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.EVENT,
    item: event,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const style: React.CSSProperties = {
    height: `${height}px`,
    top: `${top}px`,
    left: '0',
    right: '0',
    position: 'absolute',
    backgroundColor: event.color || '#4a90e2',
    opacity: isDragging ? 0.5 : 1,
    cursor: 'move',
  };

  return (
    <div
      ref={drag}
      className="calendar-event"
      style={style}
      onClick={() => onClick(event)}
    >
      <div className="event-title">{event.title}</div>
      <div className="event-time">
        {format(startTime, 'h:mm a')} - {format(endTime, 'h:mm a')}
      </div>
    </div>
  );
}

export default CalendarEvent; 