import { uploadFile } from "@/services/upload";
import { useMutation } from "@tanstack/react-query";

export const useUploadMutation = () => {
    return useMutation({
        mutationFn: uploadFile
    });
}