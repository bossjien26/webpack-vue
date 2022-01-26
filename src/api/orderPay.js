import request from "../utils/request";

export function orderPayInsert(params)
{
    return request({
        url:"/orderPay",
        method:"post",
        data:params
    });
}