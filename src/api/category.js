import axios from "axios";

export function getCategoryList(perPage) {
    return axios.get(process.env.VUE_APP_BASE_API + "/api/Category/" + perPage);
}

export function getCategoryDetail(categoryId) {
    return axios.get(process.env.VUE_APP_BASE_API + "/api/Category/show/" + categoryId);
}