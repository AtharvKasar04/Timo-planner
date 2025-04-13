import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './slices/eventsSlice';
import goalsReducer from './slices/goalsSlice';

export const store = configureStore({
  reducer: {
    events: eventsReducer,
    goals: goalsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 