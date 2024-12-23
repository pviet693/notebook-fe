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
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Container from "@/components/Container";
import {
    type ChangePasswordFormData,
    changePasswordFormSchema
} from "@/types/user";
import { useToast } from "@/hooks/use-toast";
import { useChangePasswordMutation } from "@/hooks/user/useChangePasswordMutation";
import { AxiosError } from "axios";

export default function SettingPasswordPage() {
    const { toast } = useToast();
    const { mutate: changePasswordMutation } = useChangePasswordMutation();
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const form = useForm<ChangePasswordFormData>({
        resolver: zodResolver(changePasswordFormSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: ""
        }
    });

    function onSubmit(values: ChangePasswordFormData) {
        changePasswordMutation(values, {
            onSuccess: () => {
                toast({
                    variant: "success",
                    title: "Password changed successfully",
                    description: "Your password has been changed successfully."
                });
            },
            onError: (error) => {
                const axiosError = error as AxiosError<{ message: string }>;

                toast({
                    variant: "error",
                    title: "Password change failed",
                    description:
                        axiosError.response?.data?.message ?? error?.message
                });
            }
        });
    }

    return (
        <Container className="bg-white h-full min-h-[calc(100vh-120px)]">
            <h1 className="text-2xl font-semibold mb-6">Change Password</h1>

            <div className="max-w-md">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
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
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowCurrentPassword(
                                                    !showCurrentPassword
                                                )
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2"
                                        >
                                            {showCurrentPassword ? (
                                                <EyeOff className="h-4 w-4 text-gray-500" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-gray-500" />
                                            )}
                                        </button>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowNewPassword(
                                                    !showNewPassword
                                                )
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2"
                                        >
                                            {showNewPassword ? (
                                                <EyeOff className="h-4 w-4 text-gray-500" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-gray-500" />
                                            )}
                                        </button>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit">Change Password</Button>
                    </form>
                </Form>
            </div>
        </Container>
    );
}
