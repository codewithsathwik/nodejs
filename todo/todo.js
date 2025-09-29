const { log } = require("console");
const fs = require("fs");
const { json } = require("stream/consumers");
const filePath = "./task.json";


let command = process.argv[2];
let task = process.argv[3];
// let password = process.argv[4];

const loadTasks = ()=>{
    try {
        let dataBuffer = fs.readFileSync(filePath);
        let dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    } catch (error) {
        return [];
    }
}

const saveTasks = (task)=>{
    const tasks = JSON.stringify(task);
    fs.writeFileSync(filePath, tasks);
}

const addNewTask = (task) =>{
    const tasks = loadTasks();
    tasks.push({task});
    saveTasks(tasks);
}

const listTask = () =>{
    const tasks = loadTasks();
    tasks.forEach((t,index) => {
        console.log(`${index + 1}. ${t.task}`);
    });
    
}

const removeTask = (task) =>{
    const tasks = loadTasks();
    tasks.forEach((t,index) => {
        if(t.task === task){
            tasks.splice(index,1);
        }
    });
    saveTasks(tasks);
}

if(command === "register"){
    addNewTask(task);
}else if(command === "display"){
    listTask();
}else if(command === "delete"){
    removeTask(task);
}

