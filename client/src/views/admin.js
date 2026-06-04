export function admin() {
    return `
    <div class="min-h-screen bg-sky-50 text-slate-800">
        <header class="border-b border-blue-100 bg-white/90 backdrop-blur">
            <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <a class="text-xl font-black text-blue-900" href="/" data-link>TaskFlowSPA</a>
                <nav class="hidden gap-3 md:flex">
                    <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/dashboard" data-link>Dashboard</a>
                    <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/tasks" data-link>Tareas</a>
                    <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/profile" data-link>Perfil</a>
                    <a class="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white" href="/admin" data-link>Admin</a>
                </nav>
            </div>
        </header>

        <main class="mx-auto max-w-7xl px-6 py-10">
            <section class="rounded-[2rem] bg-blue-600 px-8 py-10 text-white shadow-xl shadow-blue-100">
                <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Rol administrador</p>
                <h1 class="mt-3 text-4xl font-black tracking-tight">Panel administrativo</h1>
                <p class="mt-4 max-w-2xl text-blue-50">Vista reservada para gestionar usuarios, roles, permisos y monitoreo general del sistema.</p>
            </section>

        <section class="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50 self-start overflow-auto h-72">
                <h2 class="text-xl font-bold text-slate-900">Tareas</h2>
                <div id="task-container" class="mt-5 grid gap-4">
                    
                </div>
            </article>

            <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50 overflow-auto h-72">
                <div class="flex items-center justify-between">
                    <h2 class="text-xl font-bold text-slate-900">Usuarios</h2>
                    <span class="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-blue-700">Mockup</span>
                </div>
                <div id="users-container" class="mt-5 space-y-4">
                    
                </div>
            </article>
        </section>

        <div id="edit-modal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 hidden">

            <div class="bg-white p-8 rounded-2xl w-[400px]">

                <h2 class="text-2xl font-bold mb-6">Editar usuario</h2>

                <form id="edit-form" class="flex flex-col gap-3">

                    <label class="block font-bold text-sm">Nombre</label>
                    <input type="text" id="edit-name" class="border p-3 rounded-xl" required>

                    <label class="block font-bold text-sm">Apellido</label>
                    <input type="text" id="edit-lastname" class="border p-3 rounded-xl" required>

                    <label class="block font-bold text-sm">Correo</label>
                    <input type="email" id="edit-email" class="border p-3 rounded-xl" required>

                    <label class="block font-bold text-sm">Contraseña</label>
                    <input type="password" id="edit-password" class="border p-3 rounded-xl" required>
                   
                    <label class="block font-bold text-sm" for="register-role">Rol</label>
                    <select id="edit-role" class="w-full rounded-2xl border border-blue-100 bg-blue-100 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none">
                        <option>USER</option>
                        <option>ADMIN</option>
                    </select>
                            
                    <div class="flex gap-3 mt-4">

                        <button type="submit" id="save-user"
                        class="bg-indigo-600 text-white px-4 py-3 rounded-xl cursor-pointer">
                        Guardar
                        </button>

                        <button type="button" id="close-modal" class="bg-slate-200 px-4 py-3 rounded-xl cursor-pointer">
                        Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <div id="edit-task-modal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 hidden">

            <div class="bg-white p-8 rounded-2xl w-[400px]">

                <h2 class="text-2xl font-bold mb-6">Editar tarea</h2>

                <form id="edit-task-form" class="mt-8 grid gap-5">
                    <div>
                        <label class="mb-2 block text-sm font-medium text-slate-700" for="edit-task-title">Titulo</label>
                        <input id="edit-task-title" type="text" required placeholder="Ej. Preparar proyecto final" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none" />
                    </div>

                    <div>
                        <label class="mb-2 block text-sm font-medium text-slate-700" for="edit-task-description">Descripcion</label>
                        <textarea id="edit-task-description" rows="5" placeholder="Describe la tarea..." class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none"></textarea>
                    </div>

                    <div class="grid gap-5 md:grid-cols-2">
                        <div>
                            <label class="mb-2 block text-sm font-medium text-slate-700" for="edit-task-status">Estado</label>
                            <select id="edit-task-status" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none">
                                <option>Pendiente</option>
                                <option>En progreso</option>
                                <option>Completada</option>
                            </select>
                        </div>
                        <div>
                            <label class="mb-2 block text-sm font-medium text-slate-700" for="edit-task-date">Fecha limite</label>
                            <input id="edit-task-date" required type="date" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none" />
                        </div>
                    </div>

                    <div class="flex flex-col gap-3 pt-2 sm:flex-row">
                        <button type="submit" class="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500 cursor-pointer">Guardar tarea</button>
                        <button id="cancel-edit-btn" type="reset" class="inline-flex items-center justify-center rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50 cursor-pointer">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
        </main>
    </div>`;
}

