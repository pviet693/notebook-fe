import axiosInstance from "@/lib/api";
import { ApiResponse, User } from "@/types";
import type { EditProfilePayload } from "@/types/user";

export const getTopAuthors = async () => {
    const url = "/users/top-authors";

    const response = await axiosInstance.get(url);

    return response.data as ApiResponse<User[]>;
};

export const getAllAuthors = async () => {
    const url = "/users/get-all";

    const response = await axiosInstance.get(url);

    return response.data as ApiResponse<User[]>;
};

export const editProfile = async (payload: EditProfilePayload) => {
    const url = "/users/edit-profile";

    const response = await axiosInstance.put(url, payload);

    return response.data as ApiResponse;
};

export const getAuthorByUsername = async (username: string) => {
    const url = `/users/get-by-username/${username}`;

    const response = await axiosInstance.get(url);

    return response.data as ApiResponse<User>;
};
