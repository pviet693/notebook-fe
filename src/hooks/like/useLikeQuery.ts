import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants";
import { countLikes, hasLikedPost } from "@/services/like";

export const useLikeQuery = ({
    blogId,
    userId
}: {
    blogId?: string;
    userId?: string;
}) => {
    const { data: hasLikedBlogData } = useQuery({
        queryKey: [QUERY_KEY.HAS_LIKED, blogId, userId],
        queryFn: () => hasLikedPost(blogId!),
        enabled: !!blogId && !!userId
    });
    const { data: countLikesData } = useQuery({
        queryKey: [QUERY_KEY.COUNT_LIKES, blogId],
        queryFn: () => countLikes(blogId!),
        enabled: !!blogId
    });

    return {
        isLiked: hasLikedBlogData?.data ?? false,
        likeCount: countLikesData?.data ?? 0
    };
};
