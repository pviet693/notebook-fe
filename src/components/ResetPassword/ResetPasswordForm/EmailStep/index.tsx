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
import { emailResetPasswordSchema } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface EmailStepProps {
    onSubmit: (email: string) => void;
    isLoading: boolean;
}

export default function EmailStep({ onSubmit, isLoading }: EmailStepProps) {
    const form = useForm({
        resolver: zodResolver(emailResetPasswordSchema),
        defaultValues: {
            email: ""
        }
    });

    const handleSubmit = (values: { email: string }) => {
        onSubmit(values.email);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
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
                <Button className="w-full" type="submit" loading={isLoading}>
                    Send OTP
                </Button>
            </form>
        </Form>
    );
}
