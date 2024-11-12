// Lista de tarefas em memória
let tasks = [];

// Obter todas as tarefas
exports.getTasks = (req, res) => {
    res.json(tasks);
};

// Adicionar uma nova tarefa
exports.addTask = (req, res) => {
    const { title } = req.body;
    const newTask = { id: tasks.length + 1, title, completed: false };
    tasks.push(newTask);
    res.status(201).json(newTask);
};

// Marcar tarefa como concluída
exports.toggleTaskCompletion = (req, res) => {
    const { id } = req.params;
    const task = tasks.find(t => t.id == id);
    if (task) {
        task.completed = !task.completed;
        res.json(task);
    } else {
        res.status(404).json({ error: 'Tarefa não encontrada' });
    }
};

// Deletar uma tarefa
exports.deleteTask = (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(t => t.id != id);
    res.status(204).end();
};
