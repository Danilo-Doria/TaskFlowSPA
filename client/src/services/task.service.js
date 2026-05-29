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
        renderTasks(data);
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
export async function deleteTask(id) {
    try {
        const response = await fetch(`${tasksEndPoint}/${id}`, {
            method: "DELETE"
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

// EDIT TASK
export async function editTask(editUser, id) {
    try {
        const response = await fetch(`${tasksEndPoint}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editUser),
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

// CONSULT TASK BY ID
export async function consultTasksById(userId) {
    try {
        const response = await fetch(`${tasksEndPoint}?userId=${userId}`)
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}`);
        }

        const data = await response.json();
        
        return data;

    } catch (error) {
        console.log(error.message);
    }
}