import mongoose from 'mongoose';

export enum EventCategory {
  EXERCISE = 'exercise',
  EATING = 'eating',
  WORK = 'work',
  RELAX = 'relax',
  FAMILY = 'family',
  SOCIAL = 'social'
}

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: Object.values(EventCategory),
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  isExpanded: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model('Event', eventSchema); 