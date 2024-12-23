import { QUERY_KEY } from "@/constants";
import { countComments } from "@/services/comment";
import { useQuery } from "@tanstack/react-query";

export function useCountCommentsQuery({ blogId }: { blogId: string }) {
    return useQuery({
        queryKey: [QUERY_KEY.COUNT_COMMENTS, blogId],
        queryFn: () => countComments(blogId!),
        enabled: !!blogId
    });
}
