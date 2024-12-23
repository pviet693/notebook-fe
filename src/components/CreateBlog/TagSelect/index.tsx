import { useRef, useState, useCallback, useEffect } from "react";
import { Loader2, X } from "lucide-react";
import { Command as CommandPrimitive } from "cmdk";

import { Badge } from "@/components/ui/badge";
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList
} from "@/components/ui/command";
import { AddCategoryPayload, Category } from "@/types/category";
import { Button } from "@/components/ui/button";
import { useCategoryMutation } from "@/hooks/category/useCategoryMutation";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";

interface TagSelectProps {
    defaultOptions: Category[];
    value: Category[];
    onChange: (value: Category[]) => void;
    placeholder?: string;
    id?: string;
}

export default function TagSelect({
    defaultOptions = [],
    value,
    onChange,
    placeholder = "Select items...",
    id
}: TagSelectProps) {
    const { toast } = useToast();
    const { mutate: addCategory, isPending } = useCategoryMutation();
    const inputRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = useState<Category[]>([]);

    const handleUnselect = useCallback(
        (option: Category) => {
            const newValue = value.filter((item) => item.id !== option.id);
            onChange(newValue);
        },
        [onChange, value]
    );

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            const input = inputRef.current;
            if (input) {
                if (e.key === "Delete" || e.key === "Backspace") {
                    if (input.value === "") {
                        const newValue = [...value];
                        newValue.pop();
                        onChange(newValue);
                    }
                }
                if (e.key === "Escape") {
                    input.blur();
                }
            }
        },
        [onChange, value]
    );

    const handleSelect = useCallback(
        (option: Category) => {
            const newValue = [...value, option];
            onChange(newValue);
        },
        [onChange, value]
    );

    const selectableOptions = options.filter(
        (option) => !value.some((item) => item.id === option.id)
    );
    const selectedOptions = value;

    useEffect(() => {
        if (defaultOptions.length) {
            setOptions(defaultOptions);
        }
    }, [defaultOptions]);

    const handleSuccessMutation = useCallback(
        ({ data }: { data: Category }) => {
            const newOption = {
                id: data.id,
                name: data.name,
                slug: data.slug,
                description: data.description
            };
            setOptions((prev) => [...prev, newOption]);
            setInputValue("");
            handleSelect(newOption);
        },
        [handleSelect]
    );

    const handleErrorMutation = useCallback(
        (error: unknown) => {
            const axiosError = error as AxiosError<{ message: string }>;

            if (axiosError.isAxiosError) {
                toast({
                    title: "Create Category failed",
                    description: axiosError.response?.data.message,
                    variant: "error"
                });
            } else {
                toast({
                    title: "Create Category failed",
                    description: axiosError.message,
                    variant: "error"
                });
            }
        },
        [toast]
    );

    const handleSelectNewCategory = useCallback(() => {
        const payload: AddCategoryPayload = {
            name: inputValue
        };
        addCategory(payload, {
            onSuccess: handleSuccessMutation,
            onError: handleErrorMutation
        });
    }, [handleSuccessMutation, handleErrorMutation, addCategory, inputValue]);

    return (
        <Command
            id={id}
            onKeyDown={handleKeyDown}
            className="overflow-visible bg-transparent"
        >
            <div className="group flex items-center border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-0">
                <div className="flex gap-1 flex-wrap w-full">
                    {selectedOptions.map((option) => {
                        return (
                            <Badge key={option.id} variant="secondary">
                                {option.name}
                                <Button
                                    variant="outline"
                                    className="p-0.5 ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 h-auto"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleUnselect(option);
                                        }
                                    }}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    onClick={() => handleUnselect(option)}
                                >
                                    <X className="!h-3.5 !w-3.5 text-muted-foreground hover:text-foreground" />
                                </Button>
                            </Badge>
                        );
                    })}
                    <CommandPrimitive.Input
                        ref={inputRef}
                        value={inputValue}
                        onValueChange={setInputValue}
                        onBlur={() => setOpen(false)}
                        onFocus={() => setOpen(true)}
                        placeholder={placeholder}
                        className="ml-2 w-full bg-transparent outline-none placeholder:text-muted-foreground flex-1"
                    />
                </div>
            </div>
            <div className="relative">
                {open && selectableOptions.length > 0 ? (
                    <div className="mt-2 absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                        <CommandGroup className="h-full overflow-auto">
                            <CommandList>
                                {selectableOptions.map((option) => {
                                    return (
                                        <CommandItem
                                            key={option.id}
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }}
                                            onSelect={() =>
                                                handleSelect(option)
                                            }
                                            className={"cursor-pointer"}
                                        >
                                            {option.name}
                                        </CommandItem>
                                    );
                                })}
                                {inputValue && (
                                    <CommandItem
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}
                                        onSelect={handleSelectNewCategory}
                                        className="cursor-pointer"
                                    >
                                        {isPending ? (
                                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                        ) : null}
                                        Create "{inputValue}"
                                    </CommandItem>
                                )}
                            </CommandList>
                        </CommandGroup>
                    </div>
                ) : null}
            </div>
        </Command>
    );
}
