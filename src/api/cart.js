import request from "../utils/request";

export function addCart(inventoryId, quantity) {
    var url = "/Cart";

    return request({
        url,
        method: "POST",
        data: {
            InventoryId: inventoryId,
            Quantity: quantity,
            Attribute: 1,
        }
    });
}

export function changeQuantity(inventoryId, quantity)
{
    var url = "/Cart/change/quantity";

    return request({
        url,
        method: "POST",
        data: {
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