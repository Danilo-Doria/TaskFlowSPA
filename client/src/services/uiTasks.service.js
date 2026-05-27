export function renderTasks(tasks) {
    const taskContainer = document.getElementById("task-container");
    let html = "";

    for (const task of tasks) {
        html += `<article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
                    <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                            <p class="task-state text-xs font-bold uppercase tracking-[0.25em] text-blue-600">${task.status}</p>
                            <h2 class="task-title mt-2 text-2xl font-bold text-slate-900">${task.title}</h2>
                            <p class="task-description mt-3 max-w-2xl text-slate-600">${task.description}</p>
                        </div>
                        <div class="flex gap-3">
                            <a class="edit-task-btn cursor-pointer rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
                            
                            data-id="${task.title}"
                            data-title="${task.title}"
                            data-description="${task.description}"
                            data-status="${task.status}"
                            data-date="${task.date}"

                            >Editar</a>

                            <a class="delete-task-btn cursor-pointer rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"

                            data-id="${task.title}"
                            data-title="${task.title}"
                            data-description="${task.description}"
                            data-status="${task.status}"
                            data-date="${task.date}"
                            
                            >Eliminar</a>
                        </div>
                    </div>
                </article>`
    }
    taskContainer.innerHTML = html;
}