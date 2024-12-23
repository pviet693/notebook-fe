import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/services/auth";

export const useSignUpMutation = () => {
    return useMutation({
        mutationFn: signUp
    });
};
