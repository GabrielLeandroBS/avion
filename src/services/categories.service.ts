import { Api } from "./api.service";

export const getCategories = async () => {
    const data  = await Api.get(`/categories`);

    return data
}