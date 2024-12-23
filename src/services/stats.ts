import axiosInstance from "@/lib/api";
import { ApiResponse } from "@/types";

export const webVisitStats = async () => {
    const url = "/stats/web-visit-stats";

    const response = await axiosInstance.get(url);

    return response.data as ApiResponse<number>;
};

export const incrWebVisit = async () => {
    const url = "/stats/increase-web-visit";

    const response = await axiosInstance.post(url);

    return response.data as ApiResponse;
};

export const blogReadStats = async () => {
    const url = "/stats/blog-read-stats";

    const response = await axiosInstance.get(url);

    return response.data as ApiResponse<number>;
};

export const incrBlogRead = async (blogId: string) => {
    const url = "/stats/increase-blog-read";

    const payload = {
        blogId
    };

    const response = await axiosInstance.post(url, payload);

    return response.data as ApiResponse;
};

export const newUserStats = async () => {
    const url = "/stats/new-user-stats";

    const response = await axiosInstance.get(url);

    return response.data as ApiResponse<number>;
};

export const newBlogStats = async () => {
    const url = "/stats/new-blog-stats";

    const response = await axiosInstance.get(url);

    return response.data as ApiResponse<number>;
};
