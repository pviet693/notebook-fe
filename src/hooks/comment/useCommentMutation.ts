import { addComment, deleteComment, editComment } from "@/services/comment";
import { useMutation } from "@tanstack/react-query";

export function useCommentMutation() {
    const { mutate: addCommentMutation } = useMutation({
        mutationFn: addComment
    });

    const { mutate: editCommentMutation } = useMutation({
        mutationFn: editComment
    });

    const { mutate: deleteCommentMutation } = useMutation({
        mutationFn: deleteComment
    });

    return {
        addCommentMutation,
        editCommentMutation,
        deleteCommentMutation
    };
}
