import { QUERY_KEY } from "@/constants";
import { getParentComments } from "@/services/comment";
import { useQuery } from "@tanstack/react-query";

export function useParentCommentsQuery({ blogId }: { blogId: string }) {
    return useQuery({
        queryKey: [QUERY_KEY.PARENT_COMMENTS, blogId],
        queryFn: () => getParentComments(blogId!),
        enabled: !!blogId
    });
}
