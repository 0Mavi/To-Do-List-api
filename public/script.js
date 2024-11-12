const apiUrl = 'http://localhost:3000/tasks';

document.addEventListener("DOMContentLoaded", () => {
    loadTasks();

    document.getElementById("search").addEventListener("input", searchTasks);
});

// Função para carregar todas as tarefas
async function loadTasks() {
    const response = await fetch(apiUrl);
    const tasks = await response.json();
    displayTasks(tasks);
}

// Função para exibir as tarefas separadas em "A fazer" e "Completas"
function displayTasks(tasks) {
    const taskList = document.getElementById("task-list");
    const completedList = document.getElementById("completed-list");
    taskList.innerHTML = '';
    completedList.innerHTML = '';

    tasks.forEach(task => {
        const taskElement = document.createElement("li");
        taskElement.className = `task ${task.completed ? 'completed' : ''}`;
   

        taskElement.innerHTML = `
            <div class="task-info">
                <span class="checkbox ${task.completed ? 'checked' : ''}" onclick="toggleComplete(${task.id})"></span>
                <span>${task.title}</span>
            </div>
            <div class="task-meta">
                <button onclick="deleteTask(${task.id})" class="delete-button"><i class="fas fa-trash"></i></button>
            </div>
        `;

        // Adiciona a tarefa na lista correspondente
        if (task.completed) {
            completedList.appendChild(taskElement);
        } else {
            taskList.appendChild(taskElement);
        }
    });
}

// Adiciona uma nova tarefa
async function addTask() {
    const newTaskInput = document.getElementById("new-task");
    const title = newTaskInput.value.trim();
    if (title) {
        await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title })
        });
        newTaskInput.value = '';
        loadTasks();
    }
}

// Exclui uma tarefa
async function deleteTask(id) {
    await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });
    loadTasks();
}

// Marca ou desmarca uma tarefa como concluída
async function toggleComplete(id) {
    await fetch(`${apiUrl}/${id}`, {
        method: 'PUT'
    });
    loadTasks();
}

// Pesquisa tarefas
function searchTasks() {
    const query = document.getElementById("search").value.toLowerCase();
    const tasks = document.querySelectorAll("#task-list li, #completed-list li");
    tasks.forEach(task => {
        const taskTitle = task.querySelector(".task-info span:nth-child(2)").textContent.toLowerCase();
        task.style.display = taskTitle.includes(query) ? "" : "none";
    });
}
