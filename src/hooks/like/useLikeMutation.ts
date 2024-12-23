import { useMutation } from "@tanstack/react-query";
import { likeBlog } from "@/services/like";

export const useLikeMutation = () => {
    return useMutation({
        mutationFn: likeBlog
    });
};
