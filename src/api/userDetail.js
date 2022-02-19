import request from "../utils/request";

export function getInfo() {
    return request({
        url: "/userDetail",
        method: "GET"
    });
}