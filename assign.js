// JavaScript code for the todo list
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Load saved todos from local storage
const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];

// Render todos from local storage
function renderTodos() {
  todoList.innerHTML = '';
  savedTodos.forEach(todo => {
    const todoItem = document.createElement('li');
    todoItem.className = 'todo-item';
    
    todoItem.innerHTML = `
      <input type="checkbox" ${todo.completed ? 'checked' : ''}>
      <span class="todo-text">${todo.text}</span>
      <button class="delete-button">Delete</button>
    `;
    if (todo.completed){
      todoItem.classList.add('completed')
    }
    todoList.appendChild(todoItem);
  });
}

// Add a new todo
function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText !== '') {
    const newTodo = {
      text: todoText,
      completed: false
    };
    savedTodos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(savedTodos));
    renderTodos();
    todoInput.value = '';
  }
}

// Delete a todo
function deleteTodo(index) {
  savedTodos.splice(index, 1);
  localStorage.setItem('todos', JSON.stringify(savedTodos));
  renderTodos();
}

// Toggle todo completion
function toggleTodoCompletion(index) {
  savedTodos[index].completed = !savedTodos[index].completed;
  localStorage.setItem('todos', JSON.stringify(savedTodos));
  
  
  renderTodos();
}



// Event listeners
todoForm.addEventListener('submit', e => {
  e.preventDefault();
  addTodo();
});

todoList.addEventListener('click', e => {
  if (e.target.matches('.delete-button')) {
    const todoItem = e.target.closest('.todo-item');
    const index = Array.from(todoList.children).indexOf(todoItem);
    deleteTodo(index);
  } else if (e.target.matches('input[type="checkbox"]')) {
    const todoItem = e.target.closest('.todo-item');
    const index = Array.from(todoList.children).indexOf(todoItem);
    toggleTodoCompletion(index);
  }
});

var dt = new Date();
document.getElementById("datetime").innerText = dt;
// Initial render
renderTodos();