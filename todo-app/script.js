const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskButton = document.getElementById("task-button");
const taskContainer = document.getElementById("task-container");

let tasks = [];


function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks(){
    const savedTasks = localStorage.getItem("tasks");
    if(savedTasks){
        tasks = JSON.parse(savedTasks);
    }

}

function renderTasks() {
    taskContainer.innerHTML = "";

    tasks.forEach((taskObject) => {

        let task = document.createElement("div");
        task.textContent = taskObject.text;

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        let checkBox = document.createElement("input");
        checkBox.type = "checkbox";

        task.appendChild(checkBox);
        task.appendChild(deleteButton);

        taskContainer.appendChild(task);

        deleteButton.addEventListener("click", (event) => {
            event.stopPropagation();

            tasks = tasks.filter((task) => {
                return task.id !== taskObject.id;
            });

            saveTasks();
            renderTasks();
        });

        checkBox.addEventListener("change", () => {
            taskObject.completed = checkBox.checked;

            task.classList.toggle("completed");

            saveTasks();
        });

        if (taskObject.completed) {
            checkBox.checked = true;
            task.classList.add("completed");
        }
    });
}

taskForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    let taskValue = taskInput.value.trim();
    
    if(taskValue === ""){
        return;
    }

    let taskObject = {
        id: Date.now(),
        text: taskValue,
        completed: false
    };
    tasks.push(taskObject);
    saveTasks();
    renderTasks();
    taskInput.value = "";
});
loadTasks();
renderTasks();
