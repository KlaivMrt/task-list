
class TasksApi {
    #tasksUrl;
    
    constructor() {
        this.#tasksUrl = "/api/tasks";
    }

    async getTasks() {
        try {
            const response = await fetch(this.#tasksUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json()
            return data.data;
        } catch (error) {
            console.error(error);
        }
    }

    async postTask(task) {
        try {
            const response = await fetch(this.#tasksUrl, {
                method: "POST",
                body: JSON.stringify(task),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();

            return data.data;
        } catch (error) {
            console.error(error);
        }
    }

    async deleteTask(id) {
        try {
            const url = this.#tasksUrl + `/${id}`;

            const response = await fetch(url, {
                method: "DELETE",
            });

            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }
}

export default new TasksApi();
