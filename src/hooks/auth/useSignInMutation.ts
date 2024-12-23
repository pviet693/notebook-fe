import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/services/auth";

export const useSignInMutation = () => {
    return useMutation({
        mutationFn: signIn
    });
};
