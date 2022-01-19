import axios from "axios";

export function addCart(inventoryId, quantity, token) {
    return axios.post(process.env.VUE_APP_BASE_API + "/api/Cart", {
        InventoryId: inventoryId,
        Quantity: quantity,
        Attribute: 1,
    }, {
        headers: {
            Authorization: `Basic ${token}`,
        },
    }
    );
}

export function getCart(perPage, token) {
    return axios.get(process.env.VUE_APP_BASE_API + "/api/Cart/many/1", {
        headers: {
            Authorization: `Basic ${token}`,
        },
    })
}

export function deleteCart(inventoryId, token) {
    return axios.delete(process.env.VUE_APP_BASE_API + "/api/Cart/1/" + inventoryId, {
        headers: {
            Authorization: `Basic ${token}`,
        },
    })
}