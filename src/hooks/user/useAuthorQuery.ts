import { QUERY_KEY } from "@/constants";
import { getAuthorByUsername } from "@/services/user";
import { useQuery } from "@tanstack/react-query";

export function useAuthorQuery(username?: string) {
    return useQuery({
        queryKey: [QUERY_KEY.AUTHOR, username],
        queryFn: () => getAuthorByUsername(username!),
        enabled: !!username
    });
}
