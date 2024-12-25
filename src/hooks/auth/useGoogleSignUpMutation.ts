import { useMutation } from "@tanstack/react-query";
import { googleSignUp } from "@/services/auth";

export const useGoogleSignUpMutation = () => {
    return useMutation({
        mutationFn: googleSignUp
    });
};
