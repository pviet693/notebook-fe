import { useMutation } from "@tanstack/react-query";
import { addCategory } from "@/services/category";

export const useCategoryMutation = () => {
    return useMutation({
        mutationFn: addCategory
    });
};
