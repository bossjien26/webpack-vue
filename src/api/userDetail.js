import request from "../utils/request";

export function getInfo() {
    return request({
        url: "/userDetail",
        method: "GET"
    });
}

export function created(data) {
    return request({
        url: "/userDetail",
        method: "POST",
        data: data
    });
}

export function updated(data) {
    return request({
        url: "/userDetail",
        method: "PUT",
        data: data
    });
}