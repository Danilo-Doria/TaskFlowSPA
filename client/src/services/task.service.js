import { renderTasks } from "./uiTasks.service";

const tasksEndPoint = "http://localhost:3000/tasks";

// CONSULT TASK
export async function consultTasks() {
    try {
        const response = await fetch(`${tasksEndPoint}`)
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}`);
        }

        const data = await response.json();
        renderTasks(data)
        return data;

    } catch (error) {
        console.log(error.message);
    }
}

// CREATE TASK
export async function createTask(task) {
    try {
        const response = await fetch(`${tasksEndPoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        });
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}`);
        }

        const data = await response.json();

        return data;

    } catch (error) {
        console.log(error.message);
    }
}

// DELETE TASK

// EDIT TASK