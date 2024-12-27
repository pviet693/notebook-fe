import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { type ChangePasswordFormData, changePasswordSchema } from "@/types";

interface PasswordStepProps {
    onSubmit: (data: ChangePasswordFormData) => void;
    isLoading: boolean;
    isGoogleUser: boolean | undefined;
}

export default function PasswordStep({
    onSubmit,
    isLoading,
    isGoogleUser
}: PasswordStepProps) {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setConfirmNewPassword] = useState(false);

    const form = useForm<ChangePasswordFormData>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            googleAuth: false,
            currentPassword: "",
            newPassword: "",
            confirmedNewPassword: ""
        }
    });

    console.log(form.formState.errors);

    useEffect(() => {
        if (isGoogleUser) {
            form.setValue("googleAuth", isGoogleUser);
        }
    }, [isGoogleUser, form]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {isGoogleUser && (
                    <Alert className="bg-[#f2f8f7] border-green-50">
                        <AlertDescription >
                            You signed up with Google and haven't set a password
                            yet. You can set your initial password below.
                        </AlertDescription>
                    </Alert>
                )}

                {!isGoogleUser && (
                    <FormField
                        control={form.control}
                        name="currentPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Current Password</FormLabel>
                                <div className="relative">
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your Current Password"
                                            type={
                                                showCurrentPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            {...field}
                                        />
                                    </FormControl>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent transition-all duration-300 ease-in-out"
                                        onClick={() =>
                                            setShowCurrentPassword((pre) => !pre)
                                        }
                                        aria-label={
                                            showCurrentPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >
                                        {showCurrentPassword ? (
                                            <EyeOff className="h-4 w-4 text-gray-500" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-gray-500" />
                                        )}
                                    </Button>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <div className="relative">
                                <FormControl>
                                    <Input
                                        placeholder="Enter your New Password"
                                        type={
                                            showNewPassword
                                                ? "text"
                                                : "password"
                                        }
                                        {...field}
                                    />
                                </FormControl>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent transition-all duration-300 ease-in-out"
                                    onClick={() =>
                                        setShowNewPassword((pre) => !pre)
                                    }
                                    aria-label={
                                        showNewPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showNewPassword ? (
                                        <EyeOff className="h-4 w-4 text-gray-500" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-gray-500" />
                                    )}
                                </Button>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="confirmedNewPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <div className="relative">
                                <FormControl>
                                    <Input
                                        placeholder="Confirm your Password"
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        {...field}
                                    />
                                </FormControl>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent transition-all duration-300 ease-in-out"
                                    onClick={() =>
                                        setConfirmNewPassword((pre) => !pre)
                                    }
                                    aria-label={
                                        showConfirmPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-4 w-4 text-gray-500" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-gray-500" />
                                    )}
                                </Button>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" loading={isLoading}>
                    {isGoogleUser ? "Set Password" : "Continue"}
                </Button>
            </form>
        </Form>
    );
}
