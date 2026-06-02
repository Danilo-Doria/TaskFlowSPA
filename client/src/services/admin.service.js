// API FETCH
const usersEndPoint = "http://localhost:3000/users";

export async function consultUsers() {
    try {
        const response = await fetch(`${usersEndPoint}`);
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}`);
        }

        const data = await response.json();

        if (data.length === 0) {
            return null;
        }
        
        return data;

    } catch (error) {
        console.log(error.message);
    }
}

// EDIT USER
export async function editUser(editedUser, id) {
    try {
        const response = await fetch(`${usersEndPoint}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editedUser),
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