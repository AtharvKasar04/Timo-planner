// import React from 'react';
import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { format, addDays, parseISO, setHours, startOfDay } from 'date-fns';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateEvent } from '../store/slices/eventsSlice';
import { Event } from '../types/index';
import { useAppDispatch } from '../hooks';
import CalendarHeader from './CalendarHeader';
import CalendarDay from './CalendarDay';
import EventModal from './EventModal';
import './Calendar.css';

const HOUR_HEIGHT = 60;
// const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function Calendar() {
  const dispatch = useAppDispatch();
  const events = useSelector((state: RootState) => state.events.events);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{ date: Date; hour: number } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setSelectedTimeSlot(null);
    setIsModalOpen(true);
  };

  const handleTimeSlotClick = (date: Date, hour: number) => {
    setSelectedEvent(null);
    setSelectedTimeSlot({ date, hour });
    setIsModalOpen(true);
  };

  const handleEventDrop = (event: Event, dropDate: Date, dropHour: number) => {
    const startTime = parseISO(event.startTime);
    const endTime = parseISO(event.endTime);
    const duration = endTime.getTime() - startTime.getTime();

    const newStartTime = setHours(startOfDay(dropDate), dropHour);
    const newEndTime = new Date(newStartTime.getTime() + duration);

    const updatedEvent = {
      ...event,
      startTime: newStartTime.toISOString(),
      endTime: newEndTime.toISOString(),
    };

    dispatch(updateEvent(updatedEvent));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setSelectedTimeSlot(null);
  };

  const days = Array.from({ length: 7 }, (_, i) => addDays(currentDate, i));

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="calendar">
        <CalendarHeader
          currentDate={currentDate}
          onDateChange={setCurrentDate}
        />
        <div className="calendar-grid">
          <div className="time-column">
            <div className="time-header"></div>
            {Array.from({ length: 24 }, (_, i) => (
              <div key={i} className="time-slot" style={{ height: HOUR_HEIGHT }}>
                {format(setHours(new Date(), i), 'h a')}
              </div>
            ))}
          </div>
          <div className="days-container">
            {days.map((date) => (
              <CalendarDay
                key={date.toISOString()}
                date={date}
                events={events.filter(event => {
                  const eventDate = parseISO(event.startTime);
                  return format(eventDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
                })}
                onEventClick={handleEventClick}
                onEventDrop={handleEventDrop}
                hourHeight={HOUR_HEIGHT}
                onTimeSlotClick={handleTimeSlotClick}
              />
            ))}
          </div>
        </div>
        {isModalOpen && (
          <EventModal
            event={selectedEvent}
            timeSlot={selectedTimeSlot}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </DndProvider>
  );
}

export default Calendar; 