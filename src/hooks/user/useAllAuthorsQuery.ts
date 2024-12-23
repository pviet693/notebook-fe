import { QUERY_KEY } from "@/constants";
import { getAllAuthors } from "@/services/user";
import { useQuery } from "@tanstack/react-query";

export function useAllAuthorsQuery() {
    return useQuery({
        queryKey: [QUERY_KEY.ALL_AUTHORS],
        queryFn: getAllAuthors
    });
}
