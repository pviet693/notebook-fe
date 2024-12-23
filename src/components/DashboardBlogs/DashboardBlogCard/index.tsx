import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Timer, MessageSquare, Eye, Heart, Edit } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { BlogStatus, type Blog } from "@/types";
import { cn, formatDateTime } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import LazyLoadImage from "@/components/LazyLoadImage";

interface BlogCardProps {
    blog?: Blog;
    isLoading?: boolean;
}

function BlogCard({ blog, isLoading = false }: BlogCardProps) {
    if (isLoading) {
        return (
            <Card className="overflow-hidden border-none shadow-none rounded-sm">
                <div className="flex items-center">
                    <Skeleton className="w-[420px] h-[220px]" />
                    <CardContent className="flex flex-col justify-between p-6 w-full">
                        <div className="space-y-4">
                            <Skeleton className="h-6 w-20" />
                            <Skeleton className="h-8 w-full" />
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-[18px] w-[18px] rounded-full" />
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                        </div>
                        <Skeleton className="h-4 w-full mt-4" />
                        <Skeleton className="h-4 w-full mt-2" />
                        <Skeleton className="h-4 w-3/4 mt-2" />
                        <div className="flex items-center gap-2 mt-4">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-16" />
                        </div>
                    </CardContent>
                </div>
            </Card>
        );
    }

    if (!blog) return null;

    const totalLikeCount = blog.likes!.reduce(
        (total, like) => total + like.likeCount,
        0
    );
    const totalCommentCount = blog.comments!.reduce(
        (total, comment) => total + comment.commentCount,
        0
    );
    const totalReadCount = blog.read!.reduce(
        (total, read) => total + read.readCount,
        0
    );

    return (
        <Card className="overflow-hidden shadow-none border-none rounded-sm max-md:border-[#f2f8f7] max-md:shadow-sm">
            <div className="flex items-center gap-8 max-md:flex-col max-md:gap-2">
                <LazyLoadImage
                    src={blog.bannerUrl}
                    alt={blog.title}
                    className="w-[420px] h-[220px] max-md:w-full"
                    imageClassName="rounded-sm"
                />
                <CardContent className="flex flex-col justify-between w-full gap-3 p-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                        {blog.categories.map((category) => (
                            <Badge
                                key={category.id}
                                variant="secondary"
                                className="bg-[#f2f8f7] text-[#555] hover:bg-[#e7f1f0] text-xs font-normal"
                            >
                                {category.name}
                            </Badge>
                        ))}
                        <Badge
                            variant="outline"
                            className={cn("ml-auto", {
                                "bg-[#f2f8f7] text-primary": blog.status === BlogStatus.PUBLISHED,
                                "bg-[#e06f6c26] text-destructive": blog.status === BlogStatus.DRAFT
                            })}
                        >
                            {blog.status === BlogStatus.DRAFT
                                ? "Published"
                                : "Draft"}
                        </Badge>
                    </div>
                    <Link
                        to="/blogs/$blogSlug"
                        params={{ blogSlug: blog.slug }}
                    >
                        <h3 className="text-[28px] font-semibold leading-[2.375rem] text-[#222] hover:cursor-pointer hover:underline line-clamp-2">
                            {blog.title}
                        </h3>
                    </Link>
                    <div className="flex items-center gap-2 text-xs max-md:flex-col max-md:items-start">
                        <div className="flex items-center gap-2 max-md:items-start">
                            <Avatar className="h-[18px] w-[18px]">
                                <AvatarImage
                                    src={blog.user.profile_img}
                                    alt={blog.user.fullname}
                                />
                                <AvatarFallback>
                                    {blog.user.fullname[0]}
                                </AvatarFallback>
                            </Avatar>
                            <Link
                                to="/authors/$username"
                                params={{ username: blog.user.username }}
                            >
                                <span className="text-[#777] hover:underline">
                                    {blog.user.fullname}
                                </span>
                            </Link>
                        </div>
                        <Separator
                            orientation="vertical"
                            className="h-3 bg-[#999] max-md:hidden"
                        />
                        <div className="flex items-center gap-2">
                            <Calendar className="text-[#555] w-3 h-3" />
                            <span className="text-[#777]">
                                {formatDateTime(blog.updatedAt)}
                            </span>
                        </div>
                        <Separator
                            orientation="vertical"
                            className="h-3 bg-[#999] max-md:hidden"
                        />
                        <div className="flex items-center gap-2">
                            <Timer className="text-[#555] w-3 h-3" />
                            <span className="text-[#777]">
                                {blog.readTime} min. To Read
                            </span>
                        </div>
                    </div>
                    <p className="line-clamp-4 text-[#555] text-[15px] leading-[1.4rem] text-justify">
                        {blog.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-[#777]">
                        <div className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            <span>{totalCommentCount}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{totalReadCount}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            <span>{totalLikeCount}</span>
                        </div>
                        <Link
                            to="/blogs/$blogId/edit"
                            params={{ blogId: blog.id }}
                            className="ml-auto"
                        >
                            <Button
                                variant="outline"
                                size="sm"
                                className="ml-auto text-white bg-primary hover:bg-primary hover:text-white hover:opacity-90"
                            >
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </div>
        </Card>
    );
}

export default BlogCard;
