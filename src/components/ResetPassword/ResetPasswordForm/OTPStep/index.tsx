import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { otpSchema } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface OTPStepProps {
    onSubmit: (otp: string) => void;
    onResendOTP: (callback: () => void) => void;
    isVerifyPending: boolean;
    isResendPending: boolean;
}

export default function OTPStep({
    onSubmit,
    onResendOTP,
    isVerifyPending,
    isResendPending
}: OTPStepProps) {
    const [countdown, setCountdown] = useState(60);
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const otpInputs = useRef<(HTMLInputElement | null)[]>([]);

    const form = useForm({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            otp: ""
        }
    });

    useEffect(() => {
        otpInputs.current[0]?.focus();
        startCountdown();
    }, []);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        } else if (countdown === 0) {
            setIsResendDisabled(false);
        }
        return () => clearTimeout(timer);
    }, [countdown]);

    const startCountdown = () => {
        setCountdown(60);
        setIsResendDisabled(true);
    };

    const handleOtpChange = (index: number, value: string) => {
        const newOtp = form.getValues("otp").split("");
        newOtp[index] = value;
        const updatedOtp = newOtp.join("");
        form.setValue("otp", updatedOtp);

        if (value && index < 5) {
            otpInputs.current[index + 1]?.focus();
        }

        if (updatedOtp.length === 6) {
            form.handleSubmit(handleSubmit)();
        }
    };

    const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6);
        const otpArray = pastedData.split("").slice(0, 6);

        otpArray.forEach((digit, index) => {
            if (otpInputs.current[index]) {
                otpInputs.current[index]!.value = digit;
            }
        });

        form.setValue("otp", pastedData);

        if (pastedData.length === 6) {
            form.handleSubmit(handleSubmit)();
        } else {
            const nextEmptyIndex = otpArray.length;
            if (nextEmptyIndex < 6) {
                otpInputs.current[nextEmptyIndex]?.focus();
            }
        }
    };

    const handleOtpKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (
            e.key === "Backspace" &&
            !form.getValues("otp")[index] &&
            index > 0
        ) {
            otpInputs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = (values: { otp: string }) => {
        onSubmit(values.otp);
    };

    const handleResendOTP = () => {
        onResendOTP(startCountdown);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
            >
                <FormField
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>OTP</FormLabel>
                            <FormControl className="justify-between items-center">
                                <div className="flex space-x-2">
                                    {[0, 1, 2, 3, 4, 5].map((index) => (
                                        <Input
                                            key={index}
                                            type="text"
                                            maxLength={1}
                                            className="w-12 h-12 text-center"
                                            value={field.value[index] || ""}
                                            onChange={(e) =>
                                                handleOtpChange(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            onKeyDown={(e) =>
                                                handleOtpKeyDown(index, e)
                                            }
                                            onPaste={handleOtpPaste}
                                            ref={(el) =>
                                                (otpInputs.current[index] = el)
                                            }
                                        />
                                    ))}
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-center">
                    <Button
                        variant="outline"
                        type="button"
                        onClick={handleResendOTP}
                        disabled={isResendDisabled || isResendPending}
                        loading={isResendPending}
                        className="text-sm text-primary hover:underline disabled:no-underline border-none shadow-none hover:bg-white hover:text-primary hover:opacity-90"
                    >
                        {isResendPending
                            ? "Resending..."
                            : isResendDisabled
                              ? `Resend OTP (${countdown}s)`
                              : "Resend OTP"}
                    </Button>
                </div>
                <Button
                    className="w-full"
                    type="submit"
                    loading={isVerifyPending}
                >
                    Verify OTP
                </Button>
            </form>
        </Form>
    );
}
