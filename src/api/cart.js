import request from "../utils/request";

export function addCart(inventoryId, quantity, token) {
    return request({
        url: "/Cart",
        method: "post",
        params: {
            InventoryId: inventoryId,
            Quantity: quantity,
            Attribute: 1,
        }
    });
}

export function getCart(perPage, token) {
    return request({
        url: "/Cart/many/1",
        method: "get"
    });
}

export function deleteCart(inventoryId, token) {
    return request({
        url: "/Cart/1/" + inventoryId,
        method: "delete"
    });
}