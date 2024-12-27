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
import { ScrollArea } from "@/components/ui/scroll-area";

interface SearchFormProps {
    categories: { id: string; name: string; slug: string }[];
    authors: { id: string; username: string; fullname: string }[];
    initialValue?: SearchFilters;
}

interface SearchFilters {
    title: string;
    categories: string[];
    authors: string[];
}

export default function SearchForm({
    categories,
    authors,
    initialValue
}: SearchFormProps) {
    const navigate = useNavigate({ from: "/search" });
    const { control, handleSubmit, watch, setValue } = useForm<SearchFilters>({
        defaultValues: initialValue
    });

    const [categorySearch, setCategorySearch] = useState("");
    const [authorSearch, setAuthorSearch] = useState("");
    const [filteredCategories, setFilteredCategories] = useState(categories);
    const [filteredAuthors, setFilteredAuthors] = useState(authors);

    const watchedCategories = watch("categories");
    const watchedAuthors = watch("authors");

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
        setFilteredAuthors(
            authors.filter((author) =>
                author.fullname
                    .toLowerCase()
                    .includes(authorSearch.toLowerCase())
            )
        );
    }, [authorSearch, authors]);

    const handleSelectAll = (type: "categories" | "authors") => {
        if (type === "categories") {
            setValue(
                "categories",
                categories.map((c) => c.slug)
            );
        } else {
            setValue(
                "authors",
                authors.map((a) => a.username)
            );
        }
    };

    const handleClearSelected = (type: "categories" | "authors") => {
        setValue(type, []);
    };

    const onSubmit = (data: SearchFilters) => {
        navigate({
            search: {
                title: data.title,
                tags: data.categories.join(","),
                users: data.authors.join(",")
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
                        <ScrollArea>
                            <div className="max-h-[300px]">
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
                                                    onCheckedChange={(
                                                        checked
                                                    ) => {
                                                        const updatedValue =
                                                            checked
                                                                ? [
                                                                      ...field.value,
                                                                      category.slug
                                                                  ]
                                                                : field.value.filter(
                                                                      (slug) =>
                                                                          slug !==
                                                                          category.slug
                                                                  );
                                                        field.onChange(
                                                            updatedValue
                                                        );
                                                    }}
                                                />
                                            )}
                                        />
                                        <span>{category.name}</span>
                                    </label>
                                ))}
                            </div>
                        </ScrollArea>
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
                            watchedAuthors.length > 0 && "text-primary"
                        )}
                    >
                        <span className="mr-1">Authors</span>
                        <span className="ml-auto bg-primary/10 font-semibold text-sm text-primary rounded-full px-2 py-0.5">
                            {watchedAuthors.length}
                        </span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="start">
                    <div className="p-2">
                        <Input
                            placeholder="Search authors..."
                            value={authorSearch}
                            onChange={(e) => setAuthorSearch(e.target.value)}
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
                                onClick={() => handleClearSelected("authors")}
                            >
                                Clear
                            </Button>
                        </div>
                        {filteredAuthors.map((author) => (
                            <label
                                key={author.username}
                                className="flex items-center space-x-2 p-2 hover:bg-accent cursor-pointer"
                            >
                                <Controller
                                    name="authors"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            checked={field.value.includes(
                                                author.username
                                            )}
                                            onCheckedChange={(checked) => {
                                                const updatedValue = checked
                                                    ? [
                                                          ...field.value,
                                                          author.username
                                                      ]
                                                    : field.value.filter(
                                                          (username) =>
                                                              username !==
                                                              author.username
                                                      );
                                                field.onChange(updatedValue);
                                            }}
                                        />
                                    )}
                                />
                                <span>{author.fullname}</span>
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
