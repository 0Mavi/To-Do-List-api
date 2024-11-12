const express = require('express');
const cors = require('cors');
const app = express();
const taskRoutes = require('./routes/tasks');

app.use(express.json());
app.use(cors());

// Porta para rodar o servidor
const PORT = 3000;

// Rota para as tarefas
app.use('/tasks', taskRoutes);

// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
