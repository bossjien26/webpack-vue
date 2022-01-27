import request from "../utils/request";

export function getOrder(page) {
    return request({
        url: "/order/" + page,
        method: "get"
    })
}

export function getOrderDetail(orderId) {
    var url = "/order/show/" + orderId;
    return request({
        url,
        method: "Get",
    });
}

export function orderInsert(params) {
    var url = "/order";
    return request({
        url,
        method: "POST",
        data: params
    });
}