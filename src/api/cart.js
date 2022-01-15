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