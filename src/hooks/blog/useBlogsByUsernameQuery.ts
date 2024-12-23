import { QUERY_KEY } from "@/constants";
import { getBlogsByUsername } from "@/services/blog";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useBlogsByUsernameQuery({
    queries
}: {
    queries: {
        limit: number;
        username: string;
    };
}) {
    return useInfiniteQuery({
        queryKey: [
            QUERY_KEY.BLOGS_BY_USERNAME,
            queries?.limit,
            queries?.username
        ],
        queryFn: ({ pageParam }) =>
            getBlogsByUsername({
                ...queries,
                page: pageParam || 1,
                limit: queries?.limit,
                username: queries?.username as string
            }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, _, lastPageParam) => {
            if (lastPageParam >= (lastPage.data?.totalPages as number)) {
                return undefined;
            }
            return lastPageParam + 1;
        },
    });
}
