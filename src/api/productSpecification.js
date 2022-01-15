import axios from "axios";

export function getProductSpecification(productId, specificationId, specificationContents) {
    return axios.post(process.env.VUE_APP_BASE_API + "/api/ProductSpecification/nextSpecification", {
        ProductId: productId,
        specifications: specificationId,
        SpecificationContents: specificationContents,
    });
}