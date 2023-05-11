import TasksApi from "../services/tasksApi";

class Tasks {
    #data;
    
    constructor() {
        this.#data;

        this.#loadEventListeners();
    }

    #getTasks = async () => {
        this.#data = await TasksApi.getTasks();
        this.#displayTasks();
    }

    #postTask = async () => {
        const task = document.querySelector("#add-tasks input").value;

        if(!task) {
            return;
        }

        const newTask = await TasksApi.postTask({text: task});

        this.#displayTask(newTask);
    }

    #postHandler = (event) => {
        const btn = document.querySelector("#add-tasks button");
        if(event.target === btn) {
            this.#postTask();
        }
    }

    #deleteTask = async (id) => {
        const response = await TasksApi.deleteTask(id);
        console.log(response);
    }

    #deleteHandler = (event) => {
        if(event.target.classList.contains("btn-delete")) {
            this.#deleteTask(event.target.parentElement.id);
            event.target.parentElement.remove();
        }
    }

    #displayTasks = () => {
        this.#data.forEach((task) =>
        document.querySelector("#view-tasks .card-view").innerHTML += `
        <div id="${task._id}" class="task-element">
            <span>${task.text}</span>
            <span class="btn-delete">X</span>
        </div>
    `);
    }

    #displayTask(task) {
        document.querySelector("#view-tasks .card-view").innerHTML += `
            <div id="${task._id}" class="task-element">
                <span>${task.text}</span>
                <span class="btn-delete">X</span>
            </div>
        `
    }

    #loadEventListeners = () => {
        window.addEventListener("click", this.#deleteHandler);
        window.addEventListener("click", this.#postHandler);
    }

    render() {
        document.body.innerHTML += `
                <section id="home" class="py-1">
                <div id="add-tasks">
                    <div class="container">
                        <div class="card-add p-1">
                            <h2>Add task</h2>
                            <input type="text" class="block-input" placeholder="Type your task...">
                            <div class="line"></div>
                            <button class="btn">Create Task</button>
                        </div>
                    </div>
                </div>
                
                <div id="view-tasks">
                    <div class="container">
                        <div class="card-view p-1">
                            <h2>Your Tasks</h2>
                            <!-- <input type="text" class="block-input"> -->
                            <div class="line"></div>
                            <button class="btn-rounded" id="btn-clear">Clear</button>
                        </div>
                    </div>

                </div>
            </section>
        `;

        this.#getTasks();
    }
}

export default Tasks;
