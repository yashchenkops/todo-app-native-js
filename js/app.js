const input = document.querySelector('.input')
const inputAddButton = document.querySelector('.input-add')
const tasksContainer = document.querySelector('.tasks')
let tasks = []
let taskId = 0

inputAddButton.addEventListener('click', getInputValue)

function getInputValue() {
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
  renderTask(tasks)
}

function renderTask(array) {
  const newTask = document.createElement('div')

  array.forEach((item) => {
    newTask.innerHTML = `
      <div class="task">
        <label class="task-label">
          <input class="task-checkbox-input" type="checkbox" />
          <span class="task-checkbox"></span>
          <span class="task-name">${item.text}</span>
        </label>
        <button class="task-close">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    `
  })

  tasksContainer.append(newTask)
}
