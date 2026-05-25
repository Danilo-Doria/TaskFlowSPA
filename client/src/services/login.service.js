// API FETCH
const usersEndPoint = "http://localhost:3000/users";

export async function loginUser(email, password) {
    try {
        const response = await fetch(`${usersEndPoint}?_email=${email}&_password=${encodeURIComponent(password)}`);
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}`);
        }

        const data = await response.json();
        console.log("DATA:", data);

        if (data.length === 0) {
            return null;
        }

        return data[0];

    } catch (error) {
        console.log(error.message);
    }
}
