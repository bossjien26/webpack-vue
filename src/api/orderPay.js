import request from "../utils/request";

export function orderPayInsert(params) {
    return request({
        url: "/orderPay",
        method: "post",
        data: params
    });
}

export function getOrderPay(orderId) {
    return request({
        method: "GET",
        url: "/orderPay/show/" + orderId
    });
}