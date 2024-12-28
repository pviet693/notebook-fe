import { QUERY_KEY } from "@/constants";
import { getMe } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";

export const useGetMeQuery = () => {
    return useQuery({
        queryKey: [QUERY_KEY.GET_ME],
        queryFn: getMe,
        retry: 1
    });
};
