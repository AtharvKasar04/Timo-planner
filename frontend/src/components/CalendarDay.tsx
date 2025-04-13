// import React from 'react';
import { useDrop } from 'react-dnd';
import { format } from 'date-fns';
import { Event } from '../types/index';
import CalendarEvent from './CalendarEvent';
import './Calendar.css';

interface CalendarDayProps {
  date: Date;
  events: Event[];
  onEventClick: (event: Event) => void;
  onEventDrop: (event: Event, dropDate: Date, dropHour: number) => void;
  onTimeSlotClick: (date: Date, hour: number) => void;
  hourHeight: number;
}

const ItemTypes = {
  EVENT: 'event'
};

function CalendarDay({ date, events, onEventClick, onEventDrop, onTimeSlotClick, hourHeight }: CalendarDayProps) {
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.EVENT,
    drop: (item: Event, monitor) => {
      const clientOffset = monitor.getClientOffset();
      const initialClientOffset = monitor.getInitialClientOffset();
      
      if (!clientOffset || !initialClientOffset) return;

      const dropY = clientOffset.y;
      const containerTop = initialClientOffset.y - (monitor.getInitialSourceClientOffset()?.y || 0);
      const relativeY = dropY - containerTop - 60; // Subtract header height
      const dropHour = Math.floor(relativeY / hourHeight);
      
      if (dropHour < 0 || dropHour >= 24) return; // Prevent invalid drops
      
      onEventDrop(item, date, dropHour);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const timeSlots = Array.from({ length: 24 }, (_, i) => (
    <div
      key={i}
      className="time-slot"
      style={{ height: `${hourHeight}px` }}
      onClick={() => onTimeSlotClick(date, i)}
    />
  ));

  const dayEvents = events.map((event) => (
    <CalendarEvent
      key={event._id}
      event={event}
      onClick={onEventClick}
      hourHeight={hourHeight}
      onDrop={onEventDrop}
    />
  ));

  return (
    <div className="calendar-day" ref={drop}>
      <div className="day-header">
        <div className="day-name">{format(date, 'EEE')}</div>
        <div className="date">{format(date, 'd')}</div>
      </div>
      <div className="time-slots">
        {timeSlots}
      </div>
      <div className="events-container" style={{ position: 'absolute', top: '60px', left: 0, right: 0, bottom: 0 }}>
        {dayEvents}
      </div>
    </div>
  );
}

export default CalendarDay; 