import axiosInstance from "@/lib/api";
import { type ApiResponse } from "@/types";
import type { CommentEdit, CommentAdd, Comment } from "@/types/comment";

export const addComment = async (payload: CommentAdd) => {
    const url = "/comments/add-comment";

    const response = await axiosInstance.post(url, payload);

    return response.data as ApiResponse;
};

export const editComment = async (payload: CommentEdit) => {
    const url = "/comments/edit-comment";

    const response = await axiosInstance.post(url, payload);

    return response.data as ApiResponse;
};

export const getParentComments = async (blogId: string) => {
    const url = `/comments/get-parent-comments/${blogId}`;

    const response = await axiosInstance.get(url);

    return response.data as ApiResponse<Comment[]>;
};

export const getChildComments = async (commentId: string) => {
    const url = `/comments/get-child-comments/${commentId}`;

    const response = await axiosInstance.get(url);

    return response.data as ApiResponse<Comment[]>;
};

export const countComments = async (blogId: string) => {
    const url = `/comments/count-comments/${blogId}`;

    const response = await axiosInstance.get(url);

    return response.data as ApiResponse<number>;
};

export const deleteComment = async (commentId: string) => {
    const url = `/comments/delete-comment/${commentId}`;

    const response = await axiosInstance.post(url);

    return response.data as ApiResponse<Comment>;
};
