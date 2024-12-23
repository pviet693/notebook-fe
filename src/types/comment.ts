import { User } from "@/types/auth";

export type CommentAdd = {
    comment: string;
    userId: string;
    blogId: string;
    parentCommentId?: string;
};

export type CommentEdit = {
    id: string;
    comment: string;
};

export type Comment = {
    id: string;
    comment: string;
    userId: string;
    user: User;
    blogId: string;
    parentCommentId?: string;
    createdAt: Date;
    replyCount?: number;
}