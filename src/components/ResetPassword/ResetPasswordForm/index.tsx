import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "@tanstack/react-router";
import { useResetPasswordMutation } from "@/hooks/auth/useResetPasswordMutation";
import { AxiosError } from "axios";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@tanstack/react-router";
import EmailStep from "@/components/ResetPassword/ResetPasswordForm/EmailStep";
import OTPStep from "@/components/ResetPassword/ResetPasswordForm/OTPStep";
import ResetPasswordStep from "@/components/ResetPassword/ResetPasswordForm/ResetPasswordStep";

export default function ResetPasswordForm() {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [step, setStep] = useState<"email" | "otp" | "password">("email");
    const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
    const [email, setEmail] = useState("");

    const {
        requestOTPResetPasswordMutation,
        verifyOTPResetPasswordMutation,
        resetPasswordMutation,
        isRequestOTPPending,
        isVerifyOTPPending,
        isResetPasswordPending
    } = useResetPasswordMutation();

    const handleMutationError = (error: Error) => {
        const axiosError = error as AxiosError<{ message: string }>;
        toast({
            title: "Error",
            description: axiosError.response?.data.message ?? error.message,
            variant: "error"
        });
    };

    const handleEmailSubmit = (emailValue: string) => {
        setEmail(emailValue);
        requestOTPResetPasswordMutation(
            { email: emailValue },
            {
                onSuccess: () => {
                    toast({
                        title: "OTP sent",
                        description: "An OTP has been sent to your email.",
                        variant: "success"
                    });
                    setStep("otp");
                    setCompletedSteps((prev) => new Set(prev).add("email"));
                },
                onError: handleMutationError
            }
        );
    };

    const handleOTPSubmit = (otp: string) => {
        verifyOTPResetPasswordMutation(
            { otp, email },
            {
                onSuccess: () => {
                    toast({
                        title: "OTP verified",
                        description: "You can now set a new password.",
                        variant: "success"
                    });
                    setStep("password");
                    setCompletedSteps((prev) => new Set(prev).add("otp"));
                },
                onError: handleMutationError
            }
        );
    };

    const handlePasswordReset = (newPassword: string, confirmedNewPassword: string) => {
        resetPasswordMutation(
            {
                email,
                newPassword,
                confirmedNewPassword
            },
            {
                onSuccess: () => {
                    toast({
                        title: "Password reset successful",
                        description: "You can now log in with your new password.",
                        variant: "success"
                    });
                    navigate({ to: "/signin" });
                },
                onError: handleMutationError
            }
        );
    };

    const handleResendOTP = (callback: () => void) => {
        requestOTPResetPasswordMutation(
            { email },
            {
                onSuccess: () => {
                    toast({
                        title: "OTP Resent",
                        description: "A new OTP has been sent to your email.",
                        variant: "success"
                    });
                    callback();
                },
                onError: handleMutationError
            }
        );
    };

    const isStepDisabled = (currentStep: typeof step) => {
        switch (currentStep) {
            case "email":
                return completedSteps.has("email");
            case "otp":
                return !completedSteps.has("email") || completedSteps.has("otp");
            case "password":
                return !completedSteps.has("otp");
            default:
                return false;
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Reset Your Password</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs
                    value={step}
                    onValueChange={(value) => setStep(value as typeof step)}
                >
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger
                            value="email"
                            disabled={isStepDisabled("email")}
                        >
                            Email
                        </TabsTrigger>
                        <TabsTrigger
                            value="otp"
                            disabled={isStepDisabled("otp")}
                        >
                            OTP
                        </TabsTrigger>
                        <TabsTrigger
                            value="password"
                            disabled={isStepDisabled("password")}
                        >
                            New Password
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="email">
                        <EmailStep
                            onSubmit={handleEmailSubmit}
                            isLoading={isRequestOTPPending}
                        />
                    </TabsContent>
                    <TabsContent value="otp">
                        <OTPStep
                            onSubmit={handleOTPSubmit}
                            onResendOTP={handleResendOTP}
                            isVerifyPending={isVerifyOTPPending}
                            isResendPending={isRequestOTPPending}
                        />
                    </TabsContent>
                    <TabsContent value="password">
                        <ResetPasswordStep
                            onSubmit={handlePasswordReset}
                            isLoading={isResetPasswordPending}
                        />
                    </TabsContent>
                </Tabs>
            </CardContent>
            <CardFooter className="flex justify-center">
                <Link
                    to="/signin"
                    className="text-sm text-primary hover:underline"
                >
                    Back to Sign In
                </Link>
            </CardFooter>
        </Card>
    );
}

