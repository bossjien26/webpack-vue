import request from "../utils/request";

export function authenticate(userInfo) {
    return request({
        url: "/User/authenticate",
        data: userInfo,
        method: "POST"
    });
}

export function updated(data) {
    return request({
        url: "/user",
        method: "PUT",
        data: data
    });
}

export function getInfo() {
    return request({
        url: "/User/info",
        method: "GET"
    });
}

export function logout() {
    return request({
        url: "/User/logout",
        method: "GET"
    });
}