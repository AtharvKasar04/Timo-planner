import express from 'express';
import Goal from '../models/Goal';

const router = express.Router();

// Get all goals with their tasks
router.get('/', async (req, res) => {
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching goals' });
  }
});

// Get tasks for a specific goal
router.get('/:goalId/tasks', async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.goalId);
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    res.json(goal.tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

// Create new goal
router.post('/', async (req, res) => {
  try {
    const goal = new Goal(req.body);
    const savedGoal = await goal.save();
    res.status(201).json(savedGoal);
  } catch (error) {
    res.status(400).json({ message: 'Error creating goal' });
  }
});

// Add task to goal
router.post('/:goalId/tasks', async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.goalId);
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    goal.tasks.push(req.body);
    const updatedGoal = await goal.save();
    res.status(201).json(updatedGoal);
  } catch (error) {
    res.status(400).json({ message: 'Error adding task' });
  }
});

export default router; 