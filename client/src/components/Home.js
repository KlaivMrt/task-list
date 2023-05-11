import "../scss/home.scss";
import Tasks from "./Tasks";

class Home {
    constructor() {
        this.tasksHandler = new Tasks()
    }

}

const home = new Home();
home.tasksHandler.render();
