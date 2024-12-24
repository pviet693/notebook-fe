import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Smartphone, Tablet, Monitor, Timer, Calendar } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { cn, formatDateTime } from "@/lib/utils";
import { type Blog } from "@/types";
import { Separator } from "@/components/ui/separator";
import LazyLoadImage from "@/components/LazyLoadImage";
import { Badge } from "@/components/ui/badge";

interface BlogPreviewPopupProps {
    isOpen: boolean;
    onClose: () => void;
    blog: Omit<
        Blog,
        "slug" | "id" | "status" | "jsonContent" | "userId" | "updatedAt"
    >;
}

const ViewModeButton: React.FC<{
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
    <Button
        variant={isActive ? "default" : "outline"}
        size="sm"
        className="flex items-center gap-2"
        onClick={onClick}
    >
        {icon}
        <span className="hidden sm:inline">{label}</span>
    </Button>
);

export default function BlogPreviewPopup({
    isOpen,
    onClose,
    blog
}: BlogPreviewPopupProps) {
    const [viewMode, setViewMode] = useState<"mobile" | "tablet" | "pc">("pc");

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <VisuallyHidden>
                <DialogDescription>Preview Blog Dialog</DialogDescription>
            </VisuallyHidden>
            <DialogContent
                className={cn(
                    "max-w-[90vw] max-h-[90vh] overflow-hidden flex flex-col",
                    {
                        "text-xs": viewMode === "mobile",
                        "text-sm": viewMode === "tablet"
                    }
                )}
            >
                <DialogHeader>
                    <DialogTitle>Blog Preview</DialogTitle>
                    <div className="flex justify-end space-x-2 mt-2">
                        <ViewModeButton
                            icon={<Smartphone size={16} />}
                            label="Mobile"
                            isActive={viewMode === "mobile"}
                            onClick={() => setViewMode("mobile")}
                        />
                        <ViewModeButton
                            icon={<Tablet size={16} />}
                            label="Tablet"
                            isActive={viewMode === "tablet"}
                            onClick={() => setViewMode("tablet")}
                        />
                        <ViewModeButton
                            icon={<Monitor size={16} />}
                            label="PC"
                            isActive={viewMode === "pc"}
                            onClick={() => setViewMode("pc")}
                        />
                    </div>
                </DialogHeader>
                <ScrollArea
                    type="scroll"
                    className="flex-grow h-[calc(90vh-120px)]"
                >
                    <div
                        className={cn(
                            "mx-auto w-full rounded-lg shadow-lg border sm:text-ellipsis",
                            {
                                "max-w-[376px] box-content py-8 px-4":
                                    viewMode === "mobile",
                                "max-w-[640px] box-content py-10 px-6":
                                    viewMode === "tablet",
                                "max-w-[900px] box-content py-12 px-8":
                                    viewMode === "pc"
                            }
                        )}
                    >
                        <div className="bg-white overflow-hidden">
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
                            <div
                                className={cn(
                                    "flex items-center gap-2 text-xs mt-4",
                                    {
                                        "items-start flex-col":
                                            viewMode === "mobile"
                                    }
                                )}
                            >
                                <div
                                    className={cn("flex items-center gap-2", {
                                        "items-start": viewMode === "mobile"
                                    })}
                                >
                                    <Avatar className="h-[18px] w-[18px]">
                                        <AvatarImage
                                            src={blog.user?.profile_img}
                                            alt={blog.user?.fullname}
                                        />
                                        <AvatarFallback>
                                            {blog.user?.fullname[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="text-[#777]">
                                        {blog.user?.fullname}
                                    </span>
                                </div>
                                <Separator
                                    orientation="vertical"
                                    className={cn("h-3 bg-[#999]", {
                                        "hidden": viewMode === "mobile"
                                    })}
                                />
                                <div className="flex items-center gap-2">
                                    <Calendar className="text-[#555] w-3 h-3" />
                                    <span className="text-[#777]">
                                        {formatDateTime(blog.createdAt)}
                                    </span>
                                </div>
                                <Separator
                                    orientation="vertical"
                                    className={cn("h-3 bg-[#999]", {
                                        "hidden": viewMode === "mobile"
                                    })}
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
                                className={cn("h-[440px] w-full mt-8", {
                                    "h-[200px]": viewMode === "mobile",
                                    "h-[310px]": viewMode === "tablet"
                                })}
                                imageClassName="rounded-sm"
                            />

                            <p className="leading-[1.4rem] text-[#666] mt-10">
                                {blog.description}
                            </p>
                            <div
                                className="prose max-w-none mt-8"
                                dangerouslySetInnerHTML={{
                                    __html: blog.htmlContent
                                }}
                            />
                        </div>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
