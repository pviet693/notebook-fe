import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useChangePasswordMutation } from "@/hooks/user/useChangePasswordMutation";
import { AxiosError } from "axios";
import OTPStep from "@/components/ResetPassword/ResetPasswordForm/OTPStep";
import useAuthContext from "@/hooks/auth/useAuthContext";
import { type ChangePasswordFormData } from "@/types";
import PasswordStep from "@/components/SettingPassword/SettingPasswordForm/PasswordStep";

export default function SettingPasswordPage() {
    const { toast } = useToast();
    const { user } = useAuthContext();
    const {
        requestOTPChangePasswordMutation,
        verifyOTPChangePasswordMutation,
        changePasswordMutation,
        isRequestOTPPending,
        isVerifyOTPPending,
        isChangePasswordPending
    } = useChangePasswordMutation();
    const passwordDataRef = useRef<ChangePasswordFormData | null>(null);

    const [step, setStep] = useState<"password" | "otp">("password");

    function onSubmitPassword(values: ChangePasswordFormData) {
        passwordDataRef.current = values;

        requestOTPChangePasswordMutation(
            { email: user!.email },
            {
                onSuccess: () => {
                    toast({
                        variant: "success",
                        title: "OTP Sent",
                        description: "Please check your email for the OTP."
                    });
                    setStep("otp");
                },
                onError: handleError
            }
        );
    }

    function handleOTPSubmit(otp: string) {
        if (!passwordDataRef.current) return;

        verifyOTPChangePasswordMutation(
            { otp, email: user!.email },
            {
                onSuccess: () => {
                    changePasswordMutation(
                        {
                            currentPassword:
                                passwordDataRef.current?.currentPassword ??
                                undefined,
                            newPassword: passwordDataRef.current!.newPassword,
                            confirmedNewPassword:
                                passwordDataRef.current!.confirmedNewPassword
                        },
                        {
                            onSuccess: () => {
                                toast({
                                    variant: "success",
                                    title: "Password changed successfully",
                                    description: user?.google_auth
                                        ? "Your password has been set successfully."
                                        : "Your password has been changed successfully."
                                });
                                setStep("password");
                            },
                            onError: (e: Error) => {
                                handleError(e);
                                setStep("password");
                            }
                        }
                    );
                },
                onError: handleError
            }
        );
    }

    function handleResendOTP(callback: () => void) {
        requestOTPChangePasswordMutation(
            { email: user!.email },
            {
                onSuccess: () => {
                    toast({
                        variant: "success",
                        title: "OTP Resent",
                        description: "A new OTP has been sent to your email."
                    });
                    callback();
                },
                onError: handleError
            }
        );
    }

    function handleError(error: Error) {
        const axiosError = error as AxiosError<{ message: string }>;
        toast({
            variant: "error",
            title: "Error",
            description: axiosError.response?.data?.message ?? error?.message
        });
    }

    return (
        <div className="max-w-md">
            {step === "password" ? (
                <PasswordStep
                    onSubmit={onSubmitPassword}
                    isLoading={isRequestOTPPending}
                    isGoogleUser={user?.google_auth}
                />
            ) : (
                <OTPStep
                    onSubmit={handleOTPSubmit}
                    onResendOTP={handleResendOTP}
                    isVerifyPending={isVerifyOTPPending || isChangePasswordPending}
                    isResendPending={isRequestOTPPending}
                />
            )}
        </div>
    );
}
