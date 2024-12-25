import { JSONContent } from "novel";
import { z } from "zod";

import { type Category } from "@/types/category";
import { User } from "@/types/auth";

export enum BlogStatus {
    DRAFT = "draft",
    PUBLISHED = "published"
}

export const createBlogFormSchema = z.object({
    status: z.nativeEnum(BlogStatus),
    banner: z.custom<File>().nullable(),
    bannerUrl: z.string().min(1, "Banner is required"),
    title: z
        .string()
        .min(1, "Title is required")
        .max(100, "Title must be at most 100 characters"),
    description: z
        .string()
        .min(1, "Description is required")
        .max(500, "Description must be at most 500 characters"),
    categories: z
        .array(z.custom<Category>())
        .min(1, "Tags is required")
        .max(3, "You can select up to 3 tags only"),
    jsonContent: z.custom<JSONContent>(),
    htmlContent: z.string().min(1, "Content is required")
});

export type CreateBlogFormData = z.infer<typeof createBlogFormSchema>;

export type CreateBlogPayload = {
    status: BlogStatus;
    bannerUrl: string;
    title: string;
    description: string;
    categories: string[];
    jsonContent: object;
    htmlContent: string;
    userId: string;
    readTime: number;
};

export type EditBlogPayload = CreateBlogPayload & {
    id: string
};

export type Blog = {
    id: string;
    slug: string;
    status: BlogStatus;
    bannerUrl: string;
    title: string;
    description: string;
    categories: Category[];
    htmlContent: string;
    jsonContent: {
        type: string;
        content: JSONContent[];
    };
    userId: string;
    user: User;
    createdAt: string;
    updatedAt: string;
    readTime: number;
    likeCount?: number;
    commentCount?: number;
    readCount?: number;
};

export type BlogPaginationResponse = {
    page: number;
    limit: number;
    totalPages: number;
    total: number;
    data: Blog[];
};
