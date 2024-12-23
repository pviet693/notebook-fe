import { QUERY_KEY } from "@/constants";
import { unreadNotificationCount } from "@/services/notification";
import { useQuery } from "@tanstack/react-query";

export function useUnreadNotifiCountQuery() {
    return useQuery({
        queryKey: [QUERY_KEY.UNREAD_NOTIFICATION_COUNT],
        queryFn: unreadNotificationCount
    });
}
