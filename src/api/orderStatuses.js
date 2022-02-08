import request from "../utils/request";

export function getOrderStatuses(orderId) {
    return request({
        method: "GET",
        url: "/orderStatuses/show/" + orderId
    });
}