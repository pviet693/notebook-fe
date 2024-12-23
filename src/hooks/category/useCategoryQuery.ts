import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/category";
import { QUERY_KEY } from "@/constants";

export const useCategoryQuery = () => {
    return useQuery({
        queryKey: [QUERY_KEY.CATEGORIES],
        queryFn: getCategories
    });
};
