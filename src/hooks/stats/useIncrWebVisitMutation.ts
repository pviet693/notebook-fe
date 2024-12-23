import { QUERY_KEY } from "@/constants";
import { incrWebVisit } from "@/services/stats";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useIncrWebVisitMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: incrWebVisit,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.WEB_VISIT_STATS]
            });
        }
    });
}
