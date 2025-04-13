// import React from 'react';
import { format, addWeeks, subWeeks } from 'date-fns';
import './CalendarHeader.css';

interface CalendarHeaderProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

function CalendarHeader({ currentDate, onDateChange }: CalendarHeaderProps) {
  const weekStart = format(currentDate, 'MMM d');
  const weekEnd = format(addWeeks(currentDate, 1), 'MMM d, yyyy');

  return (
    <div className="calendar-header">
      <div className="date-range">
        {weekStart} - {weekEnd}
      </div>
      <div className="navigation-buttons">
        <button onClick={() => onDateChange(subWeeks(currentDate, 1))}>
          Previous Week
        </button>
        <button onClick={() => onDateChange(new Date())}>
          Today
        </button>
        <button onClick={() => onDateChange(addWeeks(currentDate, 1))}>
          Next Week
        </button>
      </div>
    </div>
  );
}

export default CalendarHeader; 