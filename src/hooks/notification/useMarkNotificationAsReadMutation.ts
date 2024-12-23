import {
    markAllNotificationsAsRead,
    markNotificationAsRead
} from "@/services/notification";
import { useMutation } from "@tanstack/react-query";

export function useMarkNotificationAsReadMutation() {
    const { mutate: markAsRead } = useMutation({
        mutationFn: markNotificationAsRead
    });

    const { mutate: markAllAsRead } = useMutation({
        mutationFn: markAllNotificationsAsRead
    });

    return {
        markAsRead,
        markAllAsRead
    };
}
