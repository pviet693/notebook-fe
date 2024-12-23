import axiosInstance from "@/lib/api";
import type { ApiResponse } from "@/types";
import { NotificationPaginationResponse } from "@/types/notification";

export const getNotificationsPagination = async ({
    page,
    limit
}: {
    page: number;
    limit: number;
}) => {
    const url = `/notifications/get-all`;
    const params = {
        page,
        limit
    };
    const response = await axiosInstance.get(url, { params });
    return response.data as ApiResponse<NotificationPaginationResponse>;
};

export const unreadNotificationCount = async () => {
    const url = `/notifications/unread-count`;

    const response = await axiosInstance.get(url);

    return response.data as ApiResponse<number>;
};

export const markNotificationAsRead = async (notificationId: string) => {
    const url = `/notifications/mark-as-read`;

    const payload = {
        notificationId
    };

    const response = await axiosInstance.post(url, payload);

    return response.data as ApiResponse;
};

export const markAllNotificationsAsRead = async () => {
    const url = `/notifications/mark-all-as-read`;

    const response = await axiosInstance.post(url);

    return response.data as ApiResponse;
};
