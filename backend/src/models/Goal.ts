import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  tasks: [{
    title: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  }]
});

export default mongoose.model('Goal', goalSchema); 