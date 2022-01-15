import axios from "axios";

export function identity(token) {
    return axios.get("http://localhost:5002/api/User/identity/verification",
        {
            headers: {
                'Authorization': `Basic ${token}`
            }
        });
};