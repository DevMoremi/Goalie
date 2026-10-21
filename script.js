const taskInput = document.getElementById('taskInput')
const addTaskButton = document.getElementById('addTaskButton')
const taskList = document.getElementById('task-list')
const showActiveTasks = document.getElementById('showActiveTasks')
const showAllTasks = document.getElementById('showAllTasks')
const showCompletedTasks = document.getElementById('showCompletedTasks')
let tasks = []
let currentFilter = 'all' // default filter is 'all'

displayData()
addTaskButton.addEventListener('click', (e) => {
    e.preventDefault()
    const taskValues = taskInput.value;
     //validate the input first
    if (taskValues.trim() === '') {
        return;
    }
    //create the task if only the input is correct
    const newTask = {
        id: getlastTaskId(),
        title: taskValues,
        completed: false
    }

    //store the task to tasks array and the localstorage
    tasks.push(newTask)
    localStorage.setItem('task', JSON.stringify(tasks))
    console.log('tasks ', tasks)
    displayData()

     //clear the input
    taskInput.value = '' 
})

function displayData(){
    //clear existing data to avoid duplicates
    taskList.innerHTML = ''
    //get the tasks from localstorage
    tasks = JSON.parse(localStorage.getItem('task')) || []

    //filter tasks to be displayed in sections
    let taskToDisplay
    if(currentFilter === 'all'){
        taskToDisplay = tasks
    }else if(currentFilter === 'active'){
        taskToDisplay = tasks.filter(task => !task.completed)
    }else if(currentFilter === 'completed'){
        taskToDisplay = tasks.filter(task => task.completed)
    }
 
    taskToDisplay.forEach(task => {
        // display the task
       const listElement = document.createElement('li')
   
       //create a div container for the title and the checkbox
       const taskContent = document.createElement('div')
       taskContent.classList.add('task-content')
       //create a span to hold the title
       const taskTitle= document.createElement('span')
       taskTitle.textContent = task.title;
       
       //create checkbox button
       const checkbox = document.createElement('input')
       checkbox.type = 'checkbox';
       checkbox.name = 'completed';
       checkbox.value = 'completed';
       checkbox.checked = task.completed;
       taskTitle.style.textDecoration = task.completed ? 'line-through' : 'unset'
   
       taskContent.appendChild(taskTitle)
       taskContent.appendChild(checkbox)
   
       listElement.appendChild(taskContent)
       taskList.appendChild(listElement)
   
       //check if the task is completed or not and cross it out
       checkbox.addEventListener('change' , (event)=>{
         task.completed = event.target.checked 
        //  console.log('too', newTask)
         if(task.completed === true){
           taskTitle.style.textDecoration = 'line-through'
       }else {
           taskTitle.style.textDecoration = 'unset';
       }
       localStorage.setItem('task',JSON.stringify(tasks))
       console.log('check', tasks)
       })
       
       //create the delete button
       const deleteButton = document.createElement('button')
       deleteButton.textContent = '\u{1F5D1}'
       listElement.appendChild(deleteButton)
   
       //create the edit button
       const editButton = document.createElement('button')
       editButton.textContent = 'Edit';
       listElement.appendChild(editButton)
       editButton.addEventListener('click', ()=>{
           const editedTitle = prompt(task.title)
   
         if(editedTitle !== null && editedTitle.trim()!== ''){
               task.title = editedTitle.trim();
               taskTitle.textContent = editedTitle.trim();
           }
           localStorage.setItem('task', JSON.stringify(tasks))
           console.log('show', editedTitle)
       })
   
       //delete the task from the tasks array and the webpage
       deleteButton.addEventListener('click', () => {
           tasks = tasks.filter(item => item.id !== task.id)
           localStorage.setItem('task', JSON.stringify(tasks))
   
           listElement.remove()
       })
    });



}

function getlastTaskId(){
   if(tasks.length){
        const getAllIds = tasks.map(item => item.id)
        let newId = Math.max(...getAllIds)
        return newId +1 
    }else{
        return 1
    }
}
showActiveTasks.addEventListener('click', ()=>{
    currentFilter = 'active'
    displayData()
})
showAllTasks.addEventListener('click', ()=>{
    currentFilter = 'all'
    displayData()
})
showCompletedTasks.addEventListener('click', ()=>{
    currentFilter = 'completed'
    displayData()
})


