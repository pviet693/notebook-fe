import axiosInstance from "@/lib/api";
import { ApiResponse } from "@/types";

export const uploadFile = async (formData: FormData) => {
    const url = "/upload";

    const response = await axiosInstance.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });

    return response.data as ApiResponse<{ fileUrl: string }>;
};
