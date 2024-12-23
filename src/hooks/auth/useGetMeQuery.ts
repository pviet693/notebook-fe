import { QUERY_KEY } from "@/constants";
import { getMe } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";

export const useGetMeQuery = (userId: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.GET_ME, userId],
        enabled: !!userId,
        queryFn: () => getMe(userId)
    });
};
