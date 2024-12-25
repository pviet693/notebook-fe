import axiosInstance from "@/lib/api";
import { ApiResponse, SignInFormData, SignUpFormData, User } from "@/types";

export const signUp = async (payload: SignUpFormData) => {
    const url = `/users/sign-up`;

    const response = await axiosInstance.post(url, payload);

    return response.data;
};

export const signIn = async (payload: SignInFormData) => {
    const url = `/users/sign-in`;

    const response = await axiosInstance.post(url, payload);

    return response.data;
};

export const googleSignUp = async (payload: { token: string }) => {
    const url = `/users/google-sign-up`;

    const response = await axiosInstance.post(url, payload);

    return response.data;
};

export const googleSignIn = async (payload: { token: string }) => {
    const url = `/users/google-sign-in`;

    const response = await axiosInstance.post(url, payload);

    return response.data;
};

export const getMe = async (userId: string) => {
    const url = `/users/me/${userId}`;

    const response = await axiosInstance.get(url);

    return response.data as ApiResponse<User>;
};
