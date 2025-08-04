const fs = require('fs');
const path = require('path');

// define path , load and save data
const dataPath = path.join(__dirname,'tasks.json');

function loadTask() {
 if(!fs.existsSync(dataPath)) return []; // if file doesn't exists return an empty array 
 const data = fs.readFileSync(dataPath,'utf-8');// read data as a string
 if(!data) return [];
 return JSON.parse(data); // convert it into object/array
}

function saveTask(tasks){
  fs.writeFileSync(dataPath,JSON.stringify(tasks,null,2)); // write that object/array in tasks.json
}

// add task
function addTask(title){
  const tasks = loadTask();// Load array from tasks.json
  const newTasks = { // define object with title , id and status
    id:Date.now(),
    title:title,
    status:"not done"
  };
  tasks.push(newTasks); // push object in array
  saveTask(tasks); // save the data in tasks.json file
  console.log("Task Added Succesfully!");
}

// update task
function updateTask(id,newTitle) {
  const tasks = loadTask();
  const task = tasks.find(t => t.id === parseInt(id));
  if(task) {
    task.title = newTitle;
    saveTask(tasks)
    console.log(`Task updated! : ${newTitle}`);
  }
  else {
    console.log('Task not found!');
  }
}

// delete task
function deleteTask(id) {
  const tasks = loadTask();
  const filteredTasks = tasks.filter(t => t.id != id);
  if(filteredTasks.length === tasks.length){
    console.log("Tasks not found!");
  }
  else {
    console.log(`Tasks deleted! : ${id}`);
  }
  saveTask(filteredTasks);
}

// status update
function taskDone(id){
  const tasks = loadTask();
  const task = tasks.find(t => t.id === parseInt(id));
  
  if(task) {
    task.status = "Completed ✅" 
    saveTask(tasks);
    console.log("Task Completed! - Congrats! Keep moving forward");
  }
  else {
    console.log("Task not found!");
  }
}

function showAllTasks() {
  const tasks = loadTask();
  tasks.map((task) => console.log(task))
}


// handling command line input 

// const [,,command ,...args] = process.argv;
const args = process.argv;

const command = args[2];
const commandArgs = args.slice(3);
switch (command){
  case 'add':
    const title = commandArgs.join(' ');
    addTask(title);
    break;
  case 'update':
    const id = commandArgs[0];
    const newTitle = commandArgs.slice(1).join(' ');
    updateTask(id,newTitle);
    break;
  case 'delete':
    const deleteId = commandArgs[0];
    deleteTask(deleteId);
    break;
  case 'completed':
    const taskId =commandArgs[0];
    taskDone(taskId);
    break;
  case 'tasks': 
   showAllTasks();
   break;
  default:
    console.log('invalid command. after node ./file-name');
    
    console.log('try : add "Task title"');
    console.log('try : update "id" "Task title"');
    console.log('try : delete "id"');
    console.log('try : tasks - to view task list');
}

