import React from "react";
import { Button } from "@/components/ui/button";
import {
    Heart,
    MessageCircle,
    Share2,
    Facebook,
    Twitter,
    Linkedin
} from "lucide-react";
import useAuthContext from "@/hooks/auth/useAuthContext";
import { useLikeMutation } from "@/hooks/like/useLikeMutation";
import { useLikeQuery } from "@/hooks/like/useLikeQuery";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants";
import { constructFacebookShareUrl, constructLinkedInShareUrl, constructTwitterShareUrl } from "@/lib/utils";
import { useCountCommentsQuery } from "@/hooks/comment/useCountCommentsQuery";

interface BlogInteractionsProps {
    blogId: string;
    blogTitle: string;
}

const BlogInteractions: React.FC<BlogInteractionsProps> = ({ blogId, blogTitle }) => {
    const { user } = useAuthContext();
    const { mutate: likeBlog } = useLikeMutation();
    const { isLiked, likeCount } = useLikeQuery({ userId: user?.id, blogId });
    const { data: countCommentsData } = useCountCommentsQuery({ blogId });
    const queryClient = useQueryClient();

    const handleLikeBlog = () => {
        likeBlog(blogId, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEY.HAS_LIKED, blogId, user?.id],
                    exact: true,
                    refetchType: "active"
                });
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEY.COUNT_LIKES, blogId],
                    exact: true,
                    refetchType: "active"
                });
            }
        });
    };

    return (
        <>
            <div className="flex items-center gap-8 mt-16 w-full">
                <hr className="border-t-[#d1e7e5] flex-1" />
                <div className="flex items-center gap-6">
                    <Share2 className="p-0.5 w-10 h-10 text-[#c4c4c4]" />
                    <a
                        href={constructFacebookShareUrl(
                            window.location.href,
                            blogTitle
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 w-8 h-8 rounded-sm border border-[#c4c4c4] text-[#c4c4c4] hover:bg-[#00aaa1] hover:text-white hover:border-none hover:cursor-pointer"
                    >
                        <Facebook className="w-full h-full" />
                    </a>
                    <a
                        href={constructTwitterShareUrl(
                            window.location.href,
                            blogTitle
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 w-8 h-8 rounded-sm border border-[#c4c4c4] text-[#c4c4c4] hover:bg-[#00aaa1] hover:text-white hover:border-none hover:cursor-pointer"
                    >
                        <Twitter className="w-full h-full" />
                    </a>
                    <a
                        href={constructLinkedInShareUrl(
                            window.location.href,
                            blogTitle
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 w-8 h-8 rounded-sm border border-[#c4c4c4] text-[#c4c4c4] hover:bg-[#00aaa1] hover:text-white hover:border-none hover:cursor-pointer"
                    >
                        <Linkedin className="w-full h-full" />
                    </a>
                </div>
                <hr className="border-t-[#d1e7e5] flex-1" />
            </div>

            <div className="flex items-center gap-4 mt-12">
                <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={handleLikeBlog}
                >
                    <Heart
                        size={16}
                        className={isLiked ? "fill-current text-red-500" : ""}
                    />
                    {isLiked ? "Unlike" : "Like"} ({likeCount})
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                >
                    <MessageCircle size={16} />
                    Comment ({countCommentsData?.data ?? 0})
                </Button>
            </div>
        </>
    );
};

export default BlogInteractions;
