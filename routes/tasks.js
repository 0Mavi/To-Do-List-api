const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');

// Rota para obter todas as tarefas
router.get('/', tasksController.getTasks);

// Rota para adicionar uma nova tarefa
router.post('/', tasksController.addTask);

// Rota para marcar tarefa como concluída
router.put('/:id', tasksController.toggleTaskCompletion);

// Rota para deletar uma tarefa
router.delete('/:id', tasksController.deleteTask);

module.exports = router;
