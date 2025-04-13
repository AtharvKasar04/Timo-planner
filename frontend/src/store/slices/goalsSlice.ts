import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { Goal, Task } from '../../types/index';

interface GoalsState {
  goals: Goal[];
  selectedGoal: Goal | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: GoalsState = {
  goals: [],
  selectedGoal: null,
  status: 'idle',
  error: null,
};

export const fetchGoals = createAsyncThunk('goals/fetchGoals', async () => {
  const response = await axios.get(`${API_BASE_URL}/goals`);
  return response.data;
});

export const fetchTasks = createAsyncThunk('goals/fetchTasks', async (goalId: string) => {
  const response = await axios.get(`/api/goals/${goalId}/tasks`);
  return { goalId, tasks: response.data };
});

export const createGoal = createAsyncThunk('goals/createGoal', async (goal: Omit<Goal, '_id'>) => {
  const response = await axios.post(`${API_BASE_URL}/goals`, goal);
  return response.data;
});

export const updateGoal = createAsyncThunk('goals/updateGoal', async (goal: Goal) => {
  const response = await axios.put(`${API_BASE_URL}/goals/${goal._id}`, goal);
  return response.data;
});

export const deleteGoal = createAsyncThunk('goals/deleteGoal', async (goalId: string) => {
  await axios.delete(`${API_BASE_URL}/goals/${goalId}`);
  return goalId;
});

export const addTask = createAsyncThunk('goals/addTask', async ({ goalId, task }: { goalId: string; task: Task }) => {
  const response = await axios.post(`/api/goals/${goalId}/tasks`, task);
  return response.data;
});

const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    setSelectedGoal: (state, action) => {
      state.selectedGoal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoals.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.goals = action.payload;
      })
      .addCase(fetchGoals.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch goals';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        const goal = state.goals.find(g => g._id === action.payload.goalId);
        if (goal) {
          goal.tasks = action.payload.tasks;
        }
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.goals.push(action.payload);
      })
      .addCase(updateGoal.fulfilled, (state, action) => {
        const index = state.goals.findIndex(goal => goal._id === action.payload._id);
        if (index !== -1) {
          state.goals[index] = action.payload;
        }
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.goals = state.goals.filter(goal => goal._id !== action.payload);
        if (state.selectedGoal?._id === action.payload) {
          state.selectedGoal = null;
        }
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const goal = state.goals.find(g => g._id === action.payload._id);
        if (goal) {
          goal.tasks = action.payload.tasks;
        }
      });
  },
});

export const { setSelectedGoal } = goalsSlice.actions;
export default goalsSlice.reducer; 