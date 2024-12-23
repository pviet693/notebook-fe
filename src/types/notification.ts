import { User } from "@/types/auth";
import { Blog } from "@/types/blog";

export enum BlogStatus {
    DRAFT = "draft",
    PUBLISHED = "published"
}

export type Notification = {
    blog: Blog;
    blogId: string;
    createdAt: string;
    hasRead: boolean;
    id: string;
    message: string;
    type: "LIKE" | "COMMENT";
    sender: User;
    senderId: string;
    userId: string;
    user: User;
    
}

export type NotificationPaginationResponse = {
    page: number;
    limit: number;
    totalPages: number;
    total: number;
    data: Notification[];
};
