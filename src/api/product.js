import request from "../utils/request";

export function getProductList(perPage) {
    return request({
        url: "/Product/" + perPage,
        method: "GET"
    });
}

export function getProductDetail(productId) {
    return request({
        url: "/Product/detail/" + productId,
        method: "GET",
    });
}

export function getProductCategory(categoryId, perPage) {
    return request({
        url: "/Product/category/" + categoryId + "/" + perPage,
        method: "GET"
    });
}