const tasksEndPoint = "http://localhost:3000/tasks";

// CONSULT ALL TASK
export async function consultAllTasks() {
    try {
        const response = await fetch(`${tasksEndPoint}?_embed=user`);
        
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
export async function editTask(editTask, id) {
    try {
        const response = await fetch(`${tasksEndPoint}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editTask),
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

// DELETE TASK BY ID
export async function deleteTaskById(userId) {
    try {
        const response = await fetch(`${tasksEndPoint}?userId=${userId}`);

        if (!response.ok) {
            throw new Error(`Error ${response.status}`);
        }

        const tasks = await response.json();
        
        for (const task of tasks) {
            await deleteTask(task.id)
        }

    } catch (error) {
        console.log(error.message);
    }
}