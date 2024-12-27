import { changePassword, requestOTPChangePassword, verifyOTPChangePassword } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";

export function useChangePasswordMutation() {
    const { mutate: requestOTPChangePasswordMutation, isPending: isRequestOTPPending } = useMutation({
            mutationFn: requestOTPChangePassword
        });
    
        const { mutate: verifyOTPChangePasswordMutation, isPending: isVerifyOTPPending } = useMutation({
            mutationFn: verifyOTPChangePassword
        })
    
        const { mutate: changePasswordMutation, isPending: isChangePasswordPending } = useMutation({
            mutationFn: changePassword
        });
    
        return {
            requestOTPChangePasswordMutation,
            verifyOTPChangePasswordMutation,
            changePasswordMutation,
            isRequestOTPPending,
            isVerifyOTPPending,
            isChangePasswordPending
        };
}
