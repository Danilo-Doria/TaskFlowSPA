// API FETCH
const usersEndPoint = "http://localhost:3000/users";

// SEARCH USER BY EMAIL AND PASSWORD
export async function loginUser(email, password) {
    try {
        const response = await fetch(`${usersEndPoint}?email=${(email)}&password=${(password)}`);

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

// SEARCH USER BY EMAIL
export async function searchUser(email) {
    try {
        const response = await fetch(`${usersEndPoint}?email=${(email)}`);

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

