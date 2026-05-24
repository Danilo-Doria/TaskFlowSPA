// API FETCH
const usersEndPoint = "http://localhost:3000/users";

export async function createUser(newUser) {
    try {
        const response = await fetch(usersEndPoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
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
