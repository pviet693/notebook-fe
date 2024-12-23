import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { SignInFormData, signInFormSchema } from "@/types";
import { useSignInMutation } from "@/hooks/auth/useSignInMutation";
import { useState } from "react";
import useAuthContext from "@/hooks/auth/useAuthContext";
import { AxiosError } from "axios";

export default function SignInForm() {
    const { toast } = useToast();
    const { signin } = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const redirectUri = urlParams.get("redirect_uri") || "/";
    const [showPassword, setShowPassword] = useState(false);
    const { mutate, isPending } = useSignInMutation();
    const form = useForm<SignInFormData>({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
            email: "",
            password: ""
        },
        reValidateMode: "onChange"
    });

    async function onSubmit(values: SignInFormData) {
        mutate(values, {
            onSuccess: ({ data }) => {
                signin(data.accessToken, data.user);
                navigate({ to: redirectUri });

                toast({
                    title: "Sign in successful",
                    description: "Welcome back!",
                    variant: "success"
                });
            },
            onError: (error) => {
                const axiosError = error as AxiosError<{ message: string }>;
                toast({
                    title: "Sign in failed",
                    description: axiosError?.response?.data?.message ?? error.message,
                    variant: "error"
                });
            }
        });
    }

    const handleGoogleSignIn = async () => {};

    return (
        <div className="space-y-6">
            <p className="text-center text-muted-foreground mb-6">
                Sign in to continue your writing journey and connect with the
                community.
            </p>
            <Button
                variant="outline"
                className="w-full"
                onClick={handleGoogleSignIn}
            >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                    />
                    <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                    />
                    <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                    />
                    <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                    />
                    <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Sign in with Google
            </Button>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>

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
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Enter password"
                                            autoComplete="on"
                                            {...field}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent transition-all duration-300 ease-in-out"
                                            onClick={() =>
                                                setShowPassword((pre) => !pre)
                                            }
                                            aria-label={
                                                showPassword
                                                    ? "Hide password"
                                                    : "Show password"
                                            }
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4 text-gray-500" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-gray-500" />
                                            )}
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="text-sm text-right">
                        <Link
                            href="/forgot-password"
                            className="text-primary hover:underline"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <Button
                        className="w-full"
                        type="submit"
                        disabled={isPending}
                        loading={isPending}
                    >
                        {isPending ? "Signing in..." : "Sign In"}
                    </Button>
                </form>
            </Form>

            <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link
                    href={`/signup?redirect_uri=${redirectUri}`}
                    className="font-semibold text-primary hover:underline"
                >
                    Sign up
                </Link>
            </div>
        </div>
    );
}
