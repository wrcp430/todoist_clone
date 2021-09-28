const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router
  .route('/')
  .get(taskController.getAllTasks)
  .post(taskController.createTask);

module.exports = router;
