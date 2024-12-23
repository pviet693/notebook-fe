import axiosInstance from "@/lib/api";
import { ApiResponse, Category, type AddCategoryPayload } from "@/types";

export const getCategories = async () => {
    const url = "/categories/get-all";

    const response = await axiosInstance.get(url);

    return response.data as ApiResponse<Category[]>;
};

export const getTopCategories = async (limit: number) => {
    const url = "/categories/top-categories";

    const params = {
        limit
    };

    const response = await axiosInstance.get(url, { params });

    return response.data as ApiResponse<Category[]>;
};

export const addCategory = async (payload: AddCategoryPayload) => {
    const url = "/categories/create";

    const response = await axiosInstance.post(url, payload);

    return response.data;
};
