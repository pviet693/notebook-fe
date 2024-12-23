import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@tanstack/react-router";

const emailSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." })
});

const otpSchema = z.object({
    otp: z.string().length(6, { message: "OTP must be 6 characters long." })
});

const passwordSchema = z
    .object({
        password: z
            .string()
            .min(1, { message: "Password is required" })
            .min(8, {
                message: "Password must be at least 8 characters long."
            }),
        confirmPassword: z
            .string()
            .min(1, { message: "Confirm Password is required" })
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"]
    });

type FormData = z.infer<typeof emailSchema> &
    z.infer<typeof otpSchema> &
    z.infer<typeof passwordSchema>;

export default function ForgotPasswordForm() {
    const [step, setStep] = useState<"email" | "otp" | "password">("email");
    const [completedSteps, setCompletedSteps] = useState<Set<string>>(
        new Set()
    );
    const otpInputs = useRef<(HTMLInputElement | null)[]>([]);

    const form = useForm<FormData>({
        resolver: zodResolver(
            step === "email"
                ? emailSchema
                : step === "otp"
                  ? otpSchema
                  : passwordSchema
        ),
        defaultValues: {
            email: "",
            otp: "",
            password: "",
            confirmPassword: ""
        }
    });

    useEffect(() => {
        if (step === "otp") {
            otpInputs.current[0]?.focus();
        }
    }, [step]);

    const handleOtpChange = (index: number, value: string) => {
        const newOtp = form.getValues("otp").split("");
        newOtp[index] = value;
        form.setValue("otp", newOtp.join(""));

        if (value && index < 5) {
            otpInputs.current[index + 1]?.focus();
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

    async function onSubmit(values: Partial<FormData>) {
        console.log(values);
        if (step === "email") {
            setStep("otp");
            setCompletedSteps((prev) => new Set(prev).add("email"));
        } else if (step === "otp") {
            setStep("password");
            setCompletedSteps((prev) => new Set(prev).add("otp"));
        } else {
            // toast({
            //     title: "Password reset successful",
            //     description: "You can now log in with your new password."
            // });
            // router.push("/signin");
        }
    }

    const isStepDisabled = (currentStep: typeof step) => {
        switch (currentStep) {
            case "email":
                return completedSteps.has("email");
            case "otp":
                return (
                    !completedSteps.has("email") || completedSteps.has("otp")
                );
            case "password":
                return !completedSteps.has("otp");
            default:
                return false;
        }
    };

    console.log(completedSteps);

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
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4"
                            >
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="Enter email"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className="w-full" type="submit">
                                    Send OTP
                                </Button>
                            </form>
                        </Form>
                    </TabsContent>
                    <TabsContent value="otp">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
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
                                                    {[0, 1, 2, 3, 4, 5].map(
                                                        (index) => (
                                                            <Input
                                                                key={index}
                                                                type="text"
                                                                maxLength={1}
                                                                className="w-12 h-12 text-center"
                                                                value={
                                                                    field.value[
                                                                        index
                                                                    ] || ""
                                                                }
                                                                onChange={(e) =>
                                                                    handleOtpChange(
                                                                        index,
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                onKeyDown={(
                                                                    e
                                                                ) =>
                                                                    handleOtpKeyDown(
                                                                        index,
                                                                        e
                                                                    )
                                                                }
                                                                ref={(el) =>
                                                                    (otpInputs.current[
                                                                        index
                                                                    ] = el)
                                                                }
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className="w-full" type="submit">
                                    Verify OTP
                                </Button>
                            </form>
                        </Form>
                    </TabsContent>
                    <TabsContent value="password">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4"
                            >
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>New Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="Enter new password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Confirm New Password
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="Confirm new password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className="w-full" type="submit">
                                    Reset Password
                                </Button>
                            </form>
                        </Form>
                    </TabsContent>
                </Tabs>
            </CardContent>
            <CardFooter className="flex justify-center">
                <Link
                    href="/signin"
                    className="text-sm text-primary hover:underline"
                >
                    Back to Sign In
                </Link>
            </CardFooter>
        </Card>
    );
}
