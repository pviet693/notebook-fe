import axiosInstance from "@/lib/api";
import type {
    Blog,
    ApiResponse,
    BlogPaginationResponse,
    CreateBlogPayload,
    EditBlogPayload
} from "@/types";

export const createBlog = async (payload: CreateBlogPayload) => {
    const url = "/blogs/create";

    const response = await axiosInstance.post(url, payload);

    return response.data;
};

export const editBlog = async (payload: EditBlogPayload) => {
    const url = "/blogs/edit";

    const response = await axiosInstance.put(url, payload);

    return response.data;
};

export const getBlogsPagination = async ({
    page,
    limit,
    categories = [],
    authors = [],
    title = "",
    excludeBlogSlug = undefined
}: {
    page: number;
    limit: number;
    categories?: string[];
    authors?: string[];
    title?: string;
    excludeBlogSlug?: string;
}) => {
    const url = `/blogs/get-all`;
    const params = {
        page,
        limit,
        categories,
        authors,
        title,
        excludeBlogSlug
    };
    const response = await axiosInstance.get(url, { params });
    return response.data as ApiResponse<BlogPaginationResponse>;
};

export const getDashboardBlogs = async ({
    page,
    limit,
    categories = [],
    title = "",
    statuses = []
}: {
    page: number;
    limit: number;
    categories?: string[];
    title?: string;
    statuses?: string[];
}) => {
    const url = `/blogs/get-dashboard-blogs`;
    const params = {
        page,
        limit,
        categories,
        statuses,
        title
    };
    const response = await axiosInstance.get(url, { params });
    return response.data as ApiResponse<BlogPaginationResponse>;
};

export const getBlogsByUsername = async ({
    page,
    limit,
    username
}: {
    page: number;
    limit: number;
    username: string;
}) => {
    const url = `/blogs/blogs-by-username`;
    const params = {
        username,
        page,
        limit
    };

    const response = await axiosInstance.get(url, { params });

    return response.data as ApiResponse<BlogPaginationResponse>;
};

export const getBlogDetails = async (slug: string) => {
    const url = `/blogs/get-details/${slug}`;

    const response = await axiosInstance.get(url);

    return response.data as ApiResponse<Blog>;
};

export const getBlogDetailsById = async (id: string) => {
    const url = `/blogs/get-details-by-id/${id}`;

    const response = await axiosInstance.get(url);

    return response.data as ApiResponse<Blog>;
};