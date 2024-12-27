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
import { resetPasswordSchema } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface ResetPasswordStepProps {
    onSubmit: (newPassword: string, confirmedNewPassword: string) => void;
    isLoading: boolean;
}

export default function ResetPasswordStep({
    onSubmit,
    isLoading
}: ResetPasswordStepProps) {
    const form = useForm({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            newPassword: "",
            confirmedNewPassword: ""
        }
    });

    const handleSubmit = (values: {
        newPassword: string;
        confirmedNewPassword: string;
    }) => {
        onSubmit(values.newPassword, values.confirmedNewPassword);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
            >
                <FormField
                    control={form.control}
                    name="newPassword"
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
                    name="confirmedNewPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm New Password</FormLabel>
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
                <Button
                    className="w-full mt-4"
                    type="submit"
                    loading={isLoading}
                >
                    Reset Password
                </Button>
            </form>
        </Form>
    );
}
