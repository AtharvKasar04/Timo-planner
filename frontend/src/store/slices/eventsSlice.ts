import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Event } from '../../types/index';
import { API_BASE_URL } from '../../config';

interface EventsState {
  events: Event[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: EventsState = {
  events: [],
  status: 'idle',
  error: null,
};

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/events`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
});

export const createEvent = createAsyncThunk('events/createEvent', async (event: Omit<Event, '_id'>) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/events`, event);
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
});

export const updateEvent = createAsyncThunk('events/updateEvent', async (event: Event) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/events/${event._id}`, event);
    return response.data;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
});

export const deleteEvent = createAsyncThunk('events/deleteEvent', async (eventId: string) => {
  try {
    await axios.delete(`${API_BASE_URL}/events/${eventId}`);
    return eventId;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
});

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch events';
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const index = state.events.findIndex(event => event._id === action.payload._id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter(event => event._id !== action.payload);
      });
  },
});

export default eventsSlice.reducer; 