const input = document.querySelector('.input')
const inputAddButton = document.querySelector('.input-add')
const tasksContainer = document.querySelector('.tasks')
let tasks = []
let taskId = 0

inputAddButton.addEventListener('click', addTask)
tasksContainer.addEventListener('click', deteleTask)
tasksContainer.addEventListener('change', isCheckedTask)

function renderTask() {
  tasksContainer.innerHTML = ''

  tasks.forEach((item) => {
    const newTask = document.createElement('div')
    newTask.classList.add('task')
    newTask.dataset.id = item.id

    newTask.innerHTML = `
      <label class="task-label">
        <input class="task-checkbox-input" type="checkbox" ${item.checked ? 'checked' : ''} />
        <span class="task-checkbox"></span>
        <span class="task-name">${item.text}</span>
      </label>
      <button class="task-close">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    `
    tasksContainer.append(newTask)
  })
}

function addTask() {
  const inputValue = input.value.trim()

  if (inputValue === '') {
    alert('Empty field!')
    return
  }

  tasks.push({
    id: taskId++,
    text: inputValue,
    checked: false,
  })

  input.value = ''

  setLocalStorage()
  renderTask()
}

function deteleTask(e) {
  const deleteButton = e.target.closest('.task-close')
  if (!deleteButton) return

  const taskElement = deleteButton.closest('.task')
  const elementId = Number(taskElement.dataset.id)

  tasks = tasks.filter((item) => item.id !== elementId)

  setLocalStorage()
  renderTask()
}

function isCheckedTask(e) {
  const checkboxTask = e.target.closest('.task-checkbox-input')
  if (!checkboxTask) return

  const taskElement = checkboxTask.closest('.task')
  const elementId = Number(taskElement.dataset.id)
  const task = tasks.find((item) => item.id === elementId)

  task.checked = checkboxTask.checked

  setLocalStorage()
  renderTask()
}

function setLocalStorage() {
  const jsonString = JSON.stringify(tasks)
  localStorage.setItem('tasks', jsonString)
}

function getLocalStorage() {
  const data = localStorage.getItem('tasks')
  if (!data) return

  tasks = JSON.parse(data)

  // fix id after reload
  const itemId = tasks.map(item => item.id)
  const biggestId = Math.max(...itemId)
  
  taskId = biggestId + 1;
   
  renderTask()
}

getLocalStorage()
