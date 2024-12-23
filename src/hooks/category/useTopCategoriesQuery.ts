import { QUERY_KEY } from "@/constants";
import { getTopCategories } from "@/services/category";
import { useQuery } from "@tanstack/react-query";

export function useTopCategoriesQuery({ limit}: {limit: number}) {
    return useQuery({
        queryKey: [QUERY_KEY.TOP_CATEGORIES, limit],
        queryFn: () => getTopCategories(limit)
    });
}