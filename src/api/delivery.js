import request from "../utils/request";

export function getDeliveryInfo() {
    return request({
        url: "/delivery",
        method: "get"
    });
}