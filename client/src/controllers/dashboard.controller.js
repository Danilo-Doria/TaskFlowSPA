import { consultTasksById } from "../services/task.service";

export async function showUserInfo() {

    const currentUser = JSON.parse(localStorage.getItem("user"));

    const tasks = await consultTasksById(currentUser.id);
    
    let activeTasks = 0;
    let completedTasks = 0;
    let pendingTasks = 0;
    

    for (let task of tasks) {
        if (task.status === "En progreso") {
            activeTasks++
        } else if (task.status === "Pendiente") {
            pendingTasks++
        } else if (task.status === "Completado") {
            completedTasks++
        }
    }

   
    const active = document.getElementById('active');
    const pending = document.getElementById('pending')
    const completed = document.getElementById('completed')

    active.textContent = activeTasks
    pending.textContent = pendingTasks
    completed.textContent = completedTasks

    const userName = document.getElementById("userName")
    userName.textContent = currentUser.name
    
}