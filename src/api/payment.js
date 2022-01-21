import request from "../utils/request";

export function getPaymentInfo() {
    return request({
        url: "/payment",
        method: "get"
    });
}