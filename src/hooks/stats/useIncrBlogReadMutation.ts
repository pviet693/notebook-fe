import { QUERY_KEY } from "@/constants";
import { incrBlogRead } from "@/services/stats";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useIncrBlogReadMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: incrBlogRead,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.BLOG_READ_STATS]
            });
        }
    });
}
