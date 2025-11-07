const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  const li = document.createElement('li');

  const span = document.createElement('span');
  span.textContent = taskText;
  li.appendChild(span);

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.style.backgroundColor = '#ffc107';
  editBtn.onclick = () => editTask(span);
  li.appendChild(editBtn);

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.onclick = () => li.remove();
  li.appendChild(deleteBtn);

  taskList.appendChild(li);
  taskInput.value = '';
}


function editTask(span) {
  const newTask = prompt('Edit your task:', span.textContent);
  if (newTask !== null && newTask.trim() !== '') {
    span.textContent = newTask.trim();
  }
}
