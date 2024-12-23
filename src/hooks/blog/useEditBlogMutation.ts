import { editBlog } from "@/services/blog";
import { useMutation } from "@tanstack/react-query";

export const useEditBlogMutation = () => {
    return useMutation({
        mutationFn: editBlog
    });
};
