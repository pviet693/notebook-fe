import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Timer } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { type Blog } from "@/types";
import { formatDateTime } from "@/lib/utils";
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
                    <Skeleton className="w-[266px] h-[180px]" />
                    <CardContent className="flex flex-col justify-between p-6 w-[460px]">
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
                    </CardContent>
                </div>
            </Card>
        );
    }

    if (!blog) return null;

    return (
        <Card className="overflow-hidden shadow-none border-none rounded-sm max-md:border-[#f2f8f7] max-md:shadow-sm">
            <div className="flex items-center max-md:flex-col max-md:gap-2">
                <LazyLoadImage
                    src={blog.bannerUrl}
                    alt={blog.title}
                    className="w-[266px] h-[180px] max-md:w-full"
                    imageClassName="rounded-sm"
                />
                <CardContent className="flex flex-col justify-between p-6 max-md:p-2 w-[460px] max-md:w-full gap-3">
                    <div className="flex items-center gap-1.5">
                        {blog.categories.map((category) => (
                            <Badge
                                key={category.id}
                                variant="secondary"
                                className="bg-[#f2f8f7] text-[#555] hover:bg-[#e7f1f0] text-xs font-normal"
                            >
                                {category.name}
                            </Badge>
                        ))}
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
                    <p className="line-clamp-3 text-[#555] text-[15px] leading-[1.4rem] text-wrap">
                        {blog.description}
                    </p>
                </CardContent>
            </div>
        </Card>
    );
}

export default BlogCard;
