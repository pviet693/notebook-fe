import { useMutation } from "@tanstack/react-query";
import { requestOTPResetPassword, resetPassword, verifyOTPResetPassword } from "@/services/auth";

export const useResetPasswordMutation = () => {
    const { mutate: requestOTPResetPasswordMutation, isPending: isRequestOTPPending } = useMutation({
        mutationFn: requestOTPResetPassword
    });

    const { mutate: verifyOTPResetPasswordMutation, isPending: isVerifyPending } = useMutation({
        mutationFn: verifyOTPResetPassword
    })

    const { mutate: resetPasswordMutation, isPending: isResetPasswordPending } = useMutation({
        mutationFn: resetPassword
    });

    return {
        requestOTPResetPasswordMutation,
        verifyOTPResetPasswordMutation,
        resetPasswordMutation,
        isRequestOTPPending,
        isVerifyPending,
        isResetPasswordPending
    };
};
