import { PAGINATION_LIMIT, QUERY_KEY } from "@/constants";
import { getBlogsPagination } from "@/services/blog";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useBlogPaginationQuery({
    enabled = true,
    queries
}: {
    enabled?: boolean;
    queries?: {
        limit?: number;
        categories?: string[];
        authors?: string[];
        title?: string;
        excludeBlogSlug?: string;
    };
}) {
    return useInfiniteQuery({
        queryKey: [
            QUERY_KEY.BLOGS,
            queries?.limit,
            queries?.categories,
            queries?.title,
            queries?.authors
        ],
        queryFn: ({ pageParam }) =>
            getBlogsPagination({
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
