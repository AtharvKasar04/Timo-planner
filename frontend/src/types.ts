export interface Event {
  _id: string;
  title: string;
  startTime: string;
  endTime: string;
  color: string;
  description?: string;
}

export interface Task {
  title: string;
  color: string;
}

export interface Goal {
  _id: string;
  title: string;
  color: string;
  tasks: Task[];
} 