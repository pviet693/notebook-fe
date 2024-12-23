import { QUERY_KEY } from "@/constants";
import { getBlogDetails } from "@/services/blog";
import { useQuery } from "@tanstack/react-query";

export function useBlogDetailsQuery({ slug }: { slug?: string }) {
    return useQuery({
        queryKey: [QUERY_KEY.BLOG_DETAILS, slug],
        queryFn: () => getBlogDetails(slug!),
        enabled: !!slug
    });
}
