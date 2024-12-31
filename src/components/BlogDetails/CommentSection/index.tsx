import CommentComponent from "@/components/BlogDetails/CommentSection/CommentComponent";
import CommentInput from "@/components/BlogDetails/CommentSection/CommentInput";
import CommentSkeleton from "@/components/BlogDetails/CommentSection/CommentSkeleton";
import { QUERY_KEY } from "@/constants";
import useAuthContext from "@/hooks/auth/useAuthContext";
import { useCommentMutation } from "@/hooks/comment/useCommentMutation";
import { useParentCommentsQuery } from "@/hooks/comment/useParentCommentsQuery";
import { useCommentSocket } from "@/hooks/socket/useCommentSocket";
import { Blog } from "@/types";
import { CommentAdd } from "@/types/comment";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";

interface CommentSectionProps {
    blog: Blog;
}

const CommentSection: React.FC<CommentSectionProps> = ({ blog }) => {
    const { user } = useAuthContext();
    const queryClient = useQueryClient();
    const { newComment, setNewComment } = useCommentSocket({ blogId: blog.id });
    const {
        data: parentCommentsData,
        isLoading: isLoadingParentComments,
        isError: isErrorParentComments
    } = useParentCommentsQuery({
        blogId: blog.id ?? ""
    });
    const comments = parentCommentsData?.data ?? [];

    const { addCommentMutation } = useCommentMutation();

    const handleSubmitComment = (comment: string, parentCommentId?: string) => {
        const payload: CommentAdd = {
            comment,
            userId: user!.id,
            blogId: blog.id,
            parentCommentId: parentCommentId
        };

        addCommentMutation(payload, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEY.COUNT_COMMENTS, blog.id],
                    exact: true,
                    refetchType: "active"
                });
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEY.PARENT_COMMENTS, blog.id],
                    exact: true,
                    refetchType: "active"
                });
            }
        });
    };

    useEffect(() => {
        if (newComment?.blogId === blog.id) {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.COUNT_COMMENTS, blog.id],
                exact: true,
                refetchType: "active"
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.PARENT_COMMENTS, blog.id],
                exact: true,
                refetchType: "active"
            });
            if (newComment?.parentCommentId) {
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEY.CHILD_COMMENTS,
                        newComment.parentCommentId
                    ],
                    exact: true,
                    refetchType: "active"
                });
            }
            setNewComment(null);
        }
    }, [newComment, blog.id, queryClient, setNewComment]);

    if (isLoadingParentComments) return <CommentSkeleton />;

    if (isErrorParentComments) {
        return <div>Error loading comments. Please try again later.</div>;
    }

    return (
        <div className="mt-12 space-y-6">
            <h2 className="text-2xl font-bold">Comments</h2>
            {comments.length === 0 ? (
                <div className="bg-gradient-to-b from-gray-50 to-white rounded-lg p-8 text-center shadow-sm border border-gray-100">
                    <svg
                        className="mx-auto h-32 w-32 text-gray-400 mb-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        No comments yet
                    </h3>
                    <p className="text-gray-500 mb-6">
                        Be the first to share your thoughts on this blog!
                    </p>
                    <div className="    mx-auto bg-white">
                        <CommentInput
                            onSubmit={handleSubmitComment}
                            placeholder="Write a comment..."
                        />
                    </div>
                </div>
            ) : (
                <>
                    {comments.map((comment) => (
                        <CommentComponent
                            key={comment.id}
                            comment={comment}
                            blogId={blog.id}
                            userId={user?.id}
                            level={1}
                            isReply
                        />
                    ))}
                    <div className="mt-4">
                        <CommentInput
                            onSubmit={handleSubmitComment}
                            placeholder="Write a comment..."
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default CommentSection;
