import request from "../utils/request";

export function orderDeliveryInsert(params) {
    return request({
        method: "POST",
        url: "/orderDelivery",
        data: params
    })
}

export function getOrderDelivery(orderId) {
    return request({
        method: "GET",
        url: "/orderDelivery/show/" + orderId
    });
}