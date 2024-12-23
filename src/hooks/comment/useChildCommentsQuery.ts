import { QUERY_KEY } from "@/constants";
import { getChildComments } from "@/services/comment";
import { useQuery } from "@tanstack/react-query";

export function useChildCommentsQuery({ commentId, isRepliesVisible }: { commentId: string; isRepliesVisible: boolean; }) {
    return useQuery({
        queryKey: [QUERY_KEY.CHILD_COMMENTS, commentId],
        queryFn: () => getChildComments(commentId!),
        enabled: !!commentId && isRepliesVisible
    });
}
