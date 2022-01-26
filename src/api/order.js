import request from "../utils/request";

export function getOrder() {
    return request({
        url: "/order",
        method: "get"
    })
}

/**
 * 
 */
export function orderInsert(params) {
    var url = "/order";
    return request({
        url,
        method: "POST",
        data: params
    });
}