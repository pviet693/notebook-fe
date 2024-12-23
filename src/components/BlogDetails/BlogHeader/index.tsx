import React from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Calendar, Timer } from "lucide-react";
import { formatDateTime } from "@/lib/utils";
import { Blog } from "@/types";
import LazyLoadImage from "@/components/LazyLoadImage";

interface BlogHeaderProps {
    blog: Blog;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ blog }) => {
    return (
        <>
            <div className="flex items-center gap-1.5">
                {blog.categories.map((category) => (
                    <Badge
                        key={category.id}
                        variant="secondary"
                        className="bg-[#f2f8f7] text-[#555] hover:bg-[#e7f1f0] font-normal text-sm"
                    >
                        {category.name}
                    </Badge>
                ))}
            </div>
            <h2 className="text-4xl font-semibold leading-[2.375rem] text-[#222] mt-4">
                {blog.title}
            </h2>
            <div className="flex items-center gap-2 text-xs max-md:flex-col max-md:items-start mt-4">
                <div className="flex items-center gap-2 max-md:items-start">
                    <Avatar className="h-[18px] w-[18px]">
                        <AvatarImage
                            src={blog.user.profile_img}
                            alt={blog.user.fullname}
                        />
                        <AvatarFallback>{blog.user.fullname[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-[#777]">{blog.user.fullname}</span>
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
            <LazyLoadImage
                src={blog.bannerUrl}
                alt={blog.title}
                className="h-[440px] max-sm:h-[200px] max-lg:h-[310px] w-full mt-8"
                imageClassName="rounded-sm"
            />
        </>
    );
};

export default BlogHeader;
