import { PAGINATION_LIMIT, QUERY_KEY } from "@/constants";
import { getNotificationsPagination } from "@/services/notification";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useNotificationPaginationQuery({
    enabled = true,
    queries
}: {
    enabled?: boolean;
    queries?: { limit?: number; categories?: string[] };
}) {
    return useInfiniteQuery({
        queryKey: [QUERY_KEY.NOTIFICATIONS, queries?.limit],
        queryFn: ({ pageParam }) =>
            getNotificationsPagination({
                ...queries,
                page: pageParam || 1,
                limit: queries?.limit || PAGINATION_LIMIT
            }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, _, lastPageParam) => {
            if (lastPageParam >= (lastPage.data?.totalPages as number)) {
                return undefined;
            }
            return lastPageParam + 1;
        },
        enabled
    });
}
