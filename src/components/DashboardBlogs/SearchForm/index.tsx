import { useForm, Controller } from "react-hook-form";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

interface SearchFormProps {
    categories: { id: string; name: string; slug: string }[];
    initialValue?: SearchFilters;
}

interface SearchFilters {
    title: string;
    categories: string[];
    statuses: string[];
}

const statuses: { label: string; value: "published" | "draft" }[] = [
    { label: "Published", value: "published" },
    { label: "Draft", value: "draft" }
];

export default function SearchForm({
    categories,
    initialValue
}: SearchFormProps) {
    const navigate = useNavigate({ from: "/me/dashboard/blogs" });
    const { control, handleSubmit, watch, setValue } = useForm<SearchFilters>({
        defaultValues: initialValue
    });

    const [categorySearch, setCategorySearch] = useState("");
    const [statuesSearch, setStatusSearch] = useState("");
    const [filteredCategories, setFilteredCategories] = useState(categories);
    const [filteredStatuses, setFilteredStatuses] = useState(statuses);

    const watchedCategories = watch("categories");
    const watchedStatuses = watch("statuses");

    useEffect(() => {
        setFilteredCategories(
            categories.filter((category) =>
                category.name
                    .toLowerCase()
                    .includes(categorySearch.toLowerCase())
            )
        );
    }, [categorySearch, categories]);

    useEffect(() => {
        setFilteredStatuses(
            statuses.filter((status) =>
                status.value
                    .toLowerCase()
                    .includes(statuesSearch.toLowerCase())
            )
        );
    }, [statuesSearch]);

    const handleSelectAll = (type: "categories" | "authors") => {
        if (type === "categories") {
            setValue(
                "categories",
                categories.map((c) => c.slug)
            );
        } else {
            setValue(
                "statuses",
                statuses.map((a) => a.value)
            );
        }
    };

    const handleClearSelected = (type: "categories" | "statuses") => {
        setValue(type, []);
    };

    const onSubmit = (data: SearchFilters) => {
        navigate({
            search: {
                title: data.title,
                tags: data.categories.join(","),
                statuses: data.statuses.join(",")
            }
        });
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col md:flex-row gap-4"
        >
            <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            placeholder="Search blog title..."
                            className="pl-9"
                        />
                    )}
                />
            </div>

            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        type="button"
                        variant="outline"
                        className={cn(
                            "flex-1 md:flex-none justify-start text-left font-normal",
                            watchedCategories.length > 0 && "text-primary"
                        )}
                    >
                        <span className="mr-1">Tags</span>
                        <span className="ml-auto bg-primary/10 font-semibold text-sm text-primary rounded-full px-2 py-0.5">
                            {watchedCategories.length}
                        </span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="start">
                    <div className="p-2">
                        <Input
                            placeholder="Search categories..."
                            value={categorySearch}
                            onChange={(e) => setCategorySearch(e.target.value)}
                            className="mb-2"
                        />
                        <div className="flex items-center justify-between mb-2">
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleSelectAll("categories")}
                            >
                                Select All
                            </Button>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                    handleClearSelected("categories")
                                }
                            >
                                Clear
                            </Button>
                        </div>
                        {filteredCategories.map((category) => (
                            <label
                                key={category.slug}
                                className="flex items-center space-x-2 p-2 hover:bg-accent cursor-pointer"
                            >
                                <Controller
                                    name="categories"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            checked={field.value.includes(
                                                category.slug
                                            )}
                                            onCheckedChange={(checked) => {
                                                const updatedValue = checked
                                                    ? [
                                                          ...field.value,
                                                          category.slug
                                                      ]
                                                    : field.value.filter(
                                                          (slug) =>
                                                              slug !==
                                                              category.slug
                                                      );
                                                field.onChange(updatedValue);
                                            }}
                                        />
                                    )}
                                />
                                <span>{category.name}</span>
                            </label>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>

            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        type="button"
                        variant="outline"
                        className={cn(
                            "flex-1 md:flex-none justify-start text-left font-normal",
                            watchedStatuses.length > 0 && "text-primary"
                        )}
                    >
                        <span className="mr-1">Statuses</span>
                        <span className="ml-auto bg-primary/10 font-semibold text-sm text-primary rounded-full px-2 py-0.5">
                            {watchedStatuses.length}
                        </span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="start">
                    <div className="p-2">
                        <Input
                            placeholder="Search statuses..."
                            value={statuesSearch}
                            onChange={(e) => setStatusSearch(e.target.value)}
                            className="mb-2"
                        />
                        <div className="flex items-center justify-between mb-2">
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleSelectAll("authors")}
                            >
                                Select All
                            </Button>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleClearSelected("statuses")}
                            >
                                Clear
                            </Button>
                        </div>
                        {filteredStatuses.map((option) => (
                            <label
                                key={option.value}
                                className="flex items-center space-x-2 p-2 hover:bg-accent cursor-pointer"
                            >
                                <Controller
                                    name="statuses"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            checked={field.value.includes(
                                                option.value
                                            )}
                                            onCheckedChange={(checked) => {
                                                const updatedValue = checked
                                                    ? [
                                                          ...field.value,
                                                          option.value
                                                      ]
                                                    : field.value.filter(
                                                          (status) =>
                                                            status !== option.value
                                                      );
                                                field.onChange(updatedValue);
                                            }}
                                        />
                                    )}
                                />
                                <span>{option.label}</span>
                            </label>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>

            <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 flex-1 md:flex-none"
            >
                Search
            </Button>
        </form>
    );
}
