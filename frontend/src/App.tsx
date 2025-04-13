// import React from 'react';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { fetchEvents } from './store/slices/eventsSlice';
import { fetchGoals } from './store/slices/goalsSlice';
import { useAppDispatch } from './hooks';
import Calendar from './components/Calendar';
import GoalsList from './components/GoalsList';
import './App.css';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchGoals());
  }, [dispatch]);

  return (
    <div className="app">
      <div className="sidebar">
        <GoalsList />
      </div>
      <div className="main-content">
        <Calendar />
      </div>
    </div>
  );
}

function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default AppWrapper; 