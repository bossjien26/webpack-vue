import axios from "axios";

export function getProductList(perPage) {
    return axios.get(process.env.VUE_APP_BASE_API + "/api/Product/" + perPage);
}

export function getProductDetail(productId) {
    return axios.get(process.env.VUE_APP_BASE_API + "/api/Product/detail/" + productId);
}

export function getProductCategory(categoryId, perPage) {
    return axios.get(process.env.VUE_APP_BASE_API + "/api/Product/category/" + categoryId + "/" + perPage);
}