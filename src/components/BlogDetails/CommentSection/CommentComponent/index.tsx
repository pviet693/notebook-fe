import React, { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Edit2, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import CommentInput from "@/components/BlogDetails/CommentSection/CommentInput";
import type { CommentAdd, Comment } from "@/types/comment";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { useCommentMutation } from "@/hooks/comment/useCommentMutation";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants";
import CommentSkeleton from "@/components/BlogDetails/CommentSection/CommentSkeleton";
import { useChildCommentsQuery } from "@/hooks/comment/useChildCommentsQuery";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

interface CommentComponentProps {
    comment: Comment;
    level: number;
    userId: string | undefined;
    blogId: string;
    isReply?: boolean;
}

const CommentComponent: React.FC<CommentComponentProps> = ({
    comment,
    level,
    userId,
    blogId,
    isReply
}) => {
    const isAuthor = userId === comment.user.id;
    const queryClient = useQueryClient();
    const replyInputRef = useRef<HTMLDivElement>(null);

    const [isRepliesVisible, setIsRepliesVisible] = useState(false);
    const [isReplying, setIsReplying] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const { data: childCommentsData, isLoading: isLoadingChildComments } =
        useChildCommentsQuery({
            commentId: comment.id,
            isRepliesVisible
        });
    const childComments = childCommentsData?.data ?? [];

    const { addCommentMutation, editCommentMutation, deleteCommentMutation } =
        useCommentMutation();

    const toggleReplies = () => {
        setIsRepliesVisible(!isRepliesVisible);
    };

    const handleReply = () => {
        setIsRepliesVisible(true);
        setIsReplying(true);
        setTimeout(() => {
            replyInputRef.current?.scrollTo({ behavior: "smooth" });
        }, 100);
    };

    const handleSubmitReply = (content: string) => {
        const payload: CommentAdd = {
            comment: content,
            userId: userId!,
            blogId,
            parentCommentId: comment.id
        };
        addCommentMutation(payload, {
            onSuccess: () => {
                setIsReplying(false);
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEY.PARENT_COMMENTS, blogId],
                    exact: true,
                    refetchType: "active"
                });
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEY.CHILD_COMMENTS, comment.id],
                    exact: true,
                    refetchType: "active"
                });
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEY.COUNT_COMMENTS, blogId],
                    exact: true,
                    refetchType: "active"
                });
                setIsRepliesVisible(true);
            }
        });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSubmitEdit = (newContent: string) => {
        editCommentMutation(
            {
                id: comment.id,
                comment: newContent
            },
            {
                onSuccess: () => {
                    setIsEditing(false);
                    queryClient.invalidateQueries({
                        queryKey: [QUERY_KEY.PARENT_COMMENTS, blogId],
                        exact: true,
                        refetchType: "active"
                    });
                    queryClient.invalidateQueries({
                        queryKey: [QUERY_KEY.CHILD_COMMENTS]
                    });
                }
            }
        );
    };

    const handleDelete = () => {
        deleteCommentMutation(comment.id, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEY.PARENT_COMMENTS, blogId],
                    exact: true,
                    refetchType: "active"
                });
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEY.CHILD_COMMENTS, comment.id],
                    exact: true,
                    refetchType: "active"
                });
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEY.COUNT_COMMENTS, blogId],
                    exact: true,
                    refetchType: "active"
                });
            }
        });
    };

    return (
        <div
            className={cn("max-md:space-y-4 max-lg:space-y-4 space-y-4", {
                "max-md:ml-4 max:lg:ml-8 ml-12": level === 2
            })}
        >
            <div className="flex space-x-4">
                <Avatar>
                    <AvatarImage src={comment.user.profile_img} />
                    <AvatarFallback>
                        {comment.user.fullname.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <Link
                            to="/authors/$username"
                            params={{ username: comment.user.username }}
                        >
                            <h3 className="font-semibold hover:underline">
                                {comment.user.fullname}
                            </h3>
                        </Link>
                        <div className="flex items-center space-x-2">
                            <p className="text-sm text-gray-500">
                                {formatDistanceToNow(comment.createdAt, {
                                    addSuffix: true
                                })}
                            </p>
                            {isAuthor && (
                                <>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-blue-500 hover:text-blue-700"
                                        onClick={handleEdit}
                                    >
                                        <Edit2 className="h-4 w-4" />
                                    </Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    Are you sure you want to
                                                    delete this comment?
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be
                                                    undone. This will
                                                    permanently delete your
                                                    comment and remove it from
                                                    our servers.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>
                                                    Cancel
                                                </AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={handleDelete}
                                                >
                                                    Delete
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </>
                            )}
                        </div>
                    </div>
                    {isEditing ? (
                        <CommentInput
                            onSubmit={handleSubmitEdit}
                            placeholder="Edit your comment..."
                            initialValue={comment.comment}
                        />
                    ) : (
                        <p className="mt-1 text-gray-700">{comment.comment}</p>
                    )}
                    {isReply && (
                        <div className="mt-2 flex items-center space-x-4">
                            <Button
                                variant="link"
                                size="sm"
                                className="p-0"
                                onClick={handleReply}
                            >
                                Reply
                            </Button>
                            {(comment.replyCount ?? 0) > 0 && (
                                <Button
                                    variant="link"
                                    size="sm"
                                    className="p-0 flex items-center"
                                    onClick={toggleReplies}
                                >
                                    {isRepliesVisible ? (
                                        <>
                                            <ChevronUp className="w-4 h-4 mr-1" />
                                            Hide Replies
                                        </>
                                    ) : (
                                        <>
                                            <ChevronDown className="w-4 h-4 mr-1" />
                                            Show Replies ({comment.replyCount})
                                        </>
                                    )}
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </div>
            {isReply && isRepliesVisible && (
                <div className="max-md:space-y-4 max-lg:space-y-4 space-y-4 max-md:ml-4 max-lg:ml-8 ml-12">
                    {isLoadingChildComments ? (
                        <CommentSkeleton />
                    ) : (
                        childComments?.map((reply) => (
                            <CommentComponent
                                key={reply.id}
                                comment={reply}
                                blogId={blogId}
                                userId={userId}
                                level={level + 1}
                                isReply={false}
                            />
                        ))
                    )}
                </div>
            )}
            {isReply && isReplying && (
                <div ref={replyInputRef} className="mt-2 ml-12">
                    <CommentInput
                        onSubmit={handleSubmitReply}
                        placeholder={`Reply to ${comment.user.fullname}...`}
                    />
                </div>
            )}
        </div>
    );
};

export default CommentComponent;
