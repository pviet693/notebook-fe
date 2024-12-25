import { useMutation } from "@tanstack/react-query";
import { googleSignIn } from "@/services/auth";

export const useGoogleSignInMutation = () => {
    return useMutation({
        mutationFn: googleSignIn
    });
};
