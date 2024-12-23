import { PAGINATION_LIMIT, QUERY_KEY } from "@/constants";
import { getDashboardBlogs } from "@/services/blog";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useDashboardBlogQuery({
    queries
}: {
    queries?: {
        limit?: number;
        categories?: string[];
        title?: string;
        statuses?: string[];
    };
}) {
    return useInfiniteQuery({
        queryKey: [
            QUERY_KEY.BLOGS,
            queries?.limit,
            queries?.categories,
            queries?.title,
            queries?.statuses
        ],
        queryFn: ({ pageParam }) =>
            getDashboardBlogs({
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
        }
    });
}
