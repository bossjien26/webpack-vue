import axios from "axios";

export function identity(token) {
    return axios.get(process.env.VUE_APP_BASE_API + "/api/User/identity/verification",
        {
            headers: {
                'Authorization': `Basic ${token}`
            }
        });
}

export function authenticate(userInfo) {
    return axios.post(process.env.VUE_APP_BASE_API + "/api/User/authenticate", userInfo);
}

export function getInfo(token) {
    return axios.get(process.env.VUE_APP_BASE_API + "/api/User/info", {
        headers: {
            'Authorization': `Basic ${token}`
        }
    });
}

export function logout(token) {
    return axios.get(process.env.VUE_APP_BASE_API + "/api/User/logout", {
        headers: {
            'Authorization': `Basic ${token}`
        }
    });
}