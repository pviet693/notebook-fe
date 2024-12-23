import { Form, FormControl, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";

type SearchForm = {
    title: string;
};
export default function SearchInput({ className }: { className: string }) {
    const navigate = useNavigate({ from: "/search" });

    const form = useForm<SearchForm>({
        defaultValues: { title: "" }
    });

    const handleSearchSubmit = (data: SearchForm) => {
        navigate({
            to: "/search",
            search: {
                title: data.title.trim()
            }
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSearchSubmit)}>
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <div className={cn("relative", className)}>
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <FormControl>
                                <Input
                                    placeholder="Search blog title..."
                                    className="w-[300px] pl-8 bg-white"
                                    required
                                    {...field}
                                />
                            </FormControl>
                        </div>
                    )}
                />
            </form>
        </Form>
    );
}
