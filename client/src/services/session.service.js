// SAVE USER IN LOCAL STORAGE
export function saveSession(currentUser) {
    localStorage.setItem("user", JSON.stringify(currentUser));
}

// GET USER DATA FROM LOCAL STORAGE
export function getSession() {
    return JSON.parse(localStorage.getItem("user"));
}

// REMOVE USER FROM LOCAL STORAGE
export function removeSession() {
    localStorage.removeItem("user");
}