import { navigate } from "../router/router";
import { getSession, removeSession } from "../services/session.service";
import { consultTasksById } from "../services/task.service";

export async function showUserInfo() {

    const currentUser = getSession()

    const tasks = await consultTasksById(currentUser.id);
    
    let activeTasks = 0;
    let completedTasks = 0;
    let pendingTasks = 0;
    
    for (let task of tasks) {
        if (task.status === "En progreso") {
            activeTasks++
        } else if (task.status === "Pendiente") {
            pendingTasks++
        } else if (task.status === "Completada") {
            completedTasks++
        }
    }
   
    const active = document.getElementById('active');
    const pending = document.getElementById('pending');
    const completed = document.getElementById('completed');

    active.textContent = activeTasks;
    pending.textContent = pendingTasks;
    completed.textContent = completedTasks;

    const userName = document.getElementById("userName");
    const name = currentUser.name[0].toUpperCase()+ currentUser.name.slice(1);
    const lastName = currentUser.lastName[0].toUpperCase()+ currentUser.lastName.slice(1)
    
    userName.textContent = `${name} ${lastName}`;

    const logoutBtn = document.getElementById("logout-btn");

    logoutBtn.addEventListener("click", () => {
        removeSession();
        navigate("/")
    });
    
}