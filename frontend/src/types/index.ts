export enum EventCategory {
  EXERCISE = 'exercise',
  EATING = 'eating',
  WORK = 'work',
  RELAX = 'relax',
  FAMILY = 'family',
  SOCIAL = 'social'
}

export interface Event {
  _id: string;
  title: string;
  category: EventCategory;
  startTime: string;
  endTime: string;
  color: string;
  isExpanded: boolean;
}

export interface Task {
  _id: string;
  title: string;
  color: string;
}

export interface Goal {
  _id: string;
  title: string;
  color: string;
  tasks: Task[];
}

export interface CalendarEvent extends Event {
  top: number;
  height: number;
  left: number;
  width: number;
} 