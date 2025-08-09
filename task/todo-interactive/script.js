// this are my dom elements
const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');
const filterButtons = document.querySelectorAll('.filter');
const clearCompletedButton = document.getElementById('clear-completed');
const tasksCount = document.getElementById('tasks-count');


let tasks = [];
let currentFilter = 'all';

addButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

clearCompletedButton.addEventListener('click', clearCompleted);

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        setFilter(filter);
    });
});


function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') return;
    
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    
    tasks.push(newTask);
    taskInput.value = '';
    
    renderTasks();
    updateTasksCount();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
    updateTasksCount();
}

function toggleTaskStatus(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    
    renderTasks();
    updateTasksCount();
}

function clearCompleted() {
    tasks = tasks.filter(task => !task.completed);
    renderTasks();
    updateTasksCount();
}

function setFilter(filter) {
    currentFilter = filter;
    
    filterButtons.forEach(button => {
        if (button.getAttribute('data-filter') === filter) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
    
    renderTasks();
}

function renderTasks() {
    todoList.innerHTML = '';
    
    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'active') return !task.completed;
        if (currentFilter === 'completed') return task.completed;
        return true; // 'all' filter
    });
    
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `todo-item ${task.completed ? 'completed' : ''}`;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTaskStatus(task.id));
        
        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = task.text;
        
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.addEventListener('click', () => deleteTask(task.id));
        
        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(deleteButton);
        
        todoList.appendChild(li);
    });
}

function updateTasksCount() {
    const activeTasks = tasks.filter(task => !task.completed).length;
    tasksCount.textContent = `${activeTasks} task${activeTasks !== 1 ? 's' : ''} left`;
}


renderTasks();
updateTasksCount();