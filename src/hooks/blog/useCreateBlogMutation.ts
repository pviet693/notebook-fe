import { createBlog } from "@/services/blog";
import { useMutation } from "@tanstack/react-query";

export const useCreateBlogMutation = () => {
    return useMutation({
        mutationFn: createBlog
    });
};
