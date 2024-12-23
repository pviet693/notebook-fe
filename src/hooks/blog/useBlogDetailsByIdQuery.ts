import { QUERY_KEY } from "@/constants";
import { getBlogDetailsById } from "@/services/blog";
import { useQuery } from "@tanstack/react-query";

export function useBlogDetailsByIdQuery({ id }: { id?: string }) {
    return useQuery({
        queryKey: [QUERY_KEY.BLOG_DETAILS, id],
        queryFn: () => getBlogDetailsById(id!),
        enabled: !!id
    });
}
