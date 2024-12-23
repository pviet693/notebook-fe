import { QUERY_KEY } from "@/constants";
import { getTopAuthors } from "@/services/user";
import { useQuery } from "@tanstack/react-query";

export function useTopAuthorsQuery() {
    return useQuery({
        queryKey: [QUERY_KEY.TOP_AUTHORS],
        queryFn: getTopAuthors
    });
}
