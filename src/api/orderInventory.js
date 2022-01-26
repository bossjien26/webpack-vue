import request from "../utils/request";

export function orderInventoryInsert(params) {
    return request({
        method: "POST",
        url: "/orderInventory",
        data:params
    })
}