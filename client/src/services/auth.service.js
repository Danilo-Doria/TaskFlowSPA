export function saveSession(currentUser) {
    localStorage.setItem("user", JSON.stringify(currentUser));
}

export function getSession() {
    return JSON.parse(localStorage.getItem("user"));
}

export function removeSession() {
    localStorage.removeItem("user");
}