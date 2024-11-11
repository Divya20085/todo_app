const express = require('express');
const Task = require('../models/task');

const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(400).send('Error retrieving tasks');
  }
});

router.post('/', async (req, res) => {
  const { title, description, priority, category, reminder, completed } = req.body;
  const newTask = new Task({
    title,
    description,
    priority,
    category,
    reminder,
    completed,
  });

  try {
    const task = await newTask.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).send('Error adding task');
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
  } catch (err) {
    res.status(400).send('Error updating task');
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(400).send('Error deleting task');
  }
});

module.exports = router;
