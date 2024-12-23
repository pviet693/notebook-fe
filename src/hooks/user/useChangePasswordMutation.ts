import { changePassword } from "@/services/user";
import { useMutation } from "@tanstack/react-query";

export function useChangePasswordMutation() {
    return useMutation({
        mutationFn: changePassword
    });
}
