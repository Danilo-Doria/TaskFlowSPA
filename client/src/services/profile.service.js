const usersEndPoint = "http://localhost:3000/users";

// EDIT USER
export async function editUser(editUser, id) {
    try {
        const response = await fetch(`${usersEndPoint}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editUser),
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

// DELETE USER
export async function deleteUser(id) {
    try {
        const response = await fetch(`${usersEndPoint}/${id}`, {
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