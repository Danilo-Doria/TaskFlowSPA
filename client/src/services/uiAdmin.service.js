// RENDER ALL USERS IN ADMIN VIEW
export function renderUsersAdmin(users) {
    const usersContainer = document.getElementById("users-container");
    let html = "";

    for (const user of users) {
        html += `
        <div class="rounded-2xl bg-blue-50 p-3">
            <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                    <p class="font-bold text-slate-900">${user.name} ${user.lastName}</p>
                    <p class="text-sm text-slate-500">${user.email}</p>
                    <p class="text-sm text-slate-500">ID: ${user.id}</p>
                    </div>
                    <div class="flex gap-2">
                    <span class="rounded-full bg-white px-3 py-1 text-xs font-bold text-blue-700">${user.role}</span>
                    <button type="button" class="rounded-full border border-blue-200 px-3 py-1 text-xs font-semibold text-blue-700 hover:bg-white cursor-pointer edit-user-btn"
                    
                    data-id="${user.id}"
                    data-name="${user.name}"
                    data-lastName="${user.lastName}"
                    data-email="${user.email}"
                    data-password="${user.password}"
                    data-role="${user.role}"

                    >Editar</button>

                    <button type="button" class="rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-100 cursor-pointer delete-user-btn"
                    
                    data-id="${user.id}"

                    >Eliminar</button>
                </div>
            </div>
        </div>`
    }

    usersContainer.innerHTML = html;

}

// RENDER ALL TASKS IN ADMIN VIEW
export function renderTasksAdmin(tasks) {
    const tasksContainer = document.getElementById("task-container");
    let html = "";

    for (const task of tasks) {
        html += `
        <div class="rounded-2xl bg-blue-50 p-3">
            <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                    <p class="task-state text-xs font-bold uppercase tracking-[0.25em] text-blue-600">${task.status} - ${new Date(task.date).toLocaleDateString("es-CO")}</p>
                    <h2 class="task-title text-md font-bold text-slate-900">${task.title}</h2>
                    <p class="task-description text-sm max-w-2xl text-slate-600">${task.description}</p>
                    <p class="text-sm max-w-2xl text-slate-600">Creado por: ${task.user.name} ${task.user.lastName}</p>
                </div>

                <div class="flex gap-2">
                    <button type="button" class="rounded-full border border-blue-200 px-3 py-1 text-xs font-semibold text-blue-700 hover:bg-white cursor-pointer edit-task-btn"
                    
                    data-id="${task.id}"
                    data-title="${task.title}"
                    data-description="${task.description}"
                    data-status="${task.status}"
                    data-date="${task.date}"

                    >Editar</button>

                    <button type="button" class="rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-100 cursor-pointer delete-task-btn"
                    
                    data-id="${task.id}"

                    >Eliminar</button>
                </div>
            </div>
         </div>`
    }

    tasksContainer.innerHTML = html;

}

