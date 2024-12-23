import axiosInstance from "@/lib/api";
import { ApiResponse } from "@/types";

export const likeBlog = async (blogId: string) => {
    const url = "/likes/like-blog";

    const payload = {
        blogId
    };

    const response = await axiosInstance.post(url, payload);

    return response.data as ApiResponse;
};

export const hasLikedPost = async (blogId: string) => {
    const url = "/likes/has-liked-blog";

    const params = {
        blogId
    };

    const response = await axiosInstance.get(url, { params });

    return response.data as ApiResponse<boolean>;
};

export const countLikes = async (blogId: string) => {
    const url = `/likes/count-likes`;

    const params = {
        blogId
    };

    const response = await axiosInstance.get(url, { params });

    return response.data as ApiResponse<number>;
};
