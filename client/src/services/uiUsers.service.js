export function renderUsers(users) {
    const usersContainer = document.getElementById("users-container");
    let html = "";

    for (const user of users) {
        html += `
        <div class="rounded-2xl bg-blue-50 p-4">
            <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                    <p class="font-bold text-slate-900">${user.name}</p>
                    <p class="text-sm text-slate-500">${user.email}</p>
                    </div>
                    <div class="flex gap-2">
                    <span class="rounded-full bg-white px-3 py-1 text-xs font-bold text-blue-700">USER</span>
                    <button type="button" class="rounded-full border border-blue-200 px-3 py-1 text-xs font-semibold text-blue-700 hover:bg-white cursor-pointer edit-user-btn"
                    
                    data-id="${user.id}"
                    data-name="${user.name}"
                    data-lastName="${user.lastName}"
                    data-email="${user.email}"
                    data-password="${user.password}"
                    data-role="${user.role}"

                    >Editar</button>
                </div>
            </div>
        </div>`
    }

    usersContainer.innerHTML = html;

}