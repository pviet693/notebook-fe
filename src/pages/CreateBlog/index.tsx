import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    BannerUpload,
    BlogPreviewPopup,
    ContentEditor,
    TagSelect
} from "@/components/CreateBlog";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { useCategoryQuery } from "@/hooks/category/useCategoryQuery";
import {
    BlogStatus,
    type CreateBlogFormData,
    createBlogFormSchema,
    CreateBlogPayload,
    EditBlogPayload
} from "@/types";
import { useUploadMutation } from "@/hooks/upload/useUploadMutation";
import { useEffect, useRef, useState, useCallback } from "react";
import { calculateReadingTime, debounce } from "@/lib/utils";
import useAuthContext from "@/hooks/auth/useAuthContext";
import { useCreateBlogMutation } from "@/hooks/blog/useCreateBlogMutation";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import Container from "@/components/Container";
import { useParams } from "@tanstack/react-router";
import { useEditBlogMutation } from "@/hooks/blog/useEditBlogMutation";
import { useBlogDetailsByIdQuery } from "@/hooks/blog/useBlogDetailsByIdQuery";

const defaultValues = {
    status: BlogStatus.DRAFT,
    banner: null,
    bannerUrl: "",
    title: "",
    description: "",
    jsonContent: {},
    htmlContent: "",
    categories: []
};

export default function CreateBlogPage() {
    const auth = useAuthContext();
    const { toast } = useToast();
    const { blogId } = useParams({
        strict: false
    });
    const { data: blogDetailsData, isSuccess } = useBlogDetailsByIdQuery({
        id: blogId
    });
    const blogDetails = blogDetailsData?.data;
    const { mutate: createBlogMutation, isPending: isCreatingBlog } =
        useCreateBlogMutation();
    const { mutate: editBlogMutation, isPending: isEditingBlog } =
        useEditBlogMutation();
    const { data: categoriesData } = useCategoryQuery();
    const { mutate: uploadFile, isPending: isUploadingImage } =
        useUploadMutation();
    const formRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const [isSticky, setIsSticky] = useState(true);
    const [isAtBottom, setIsAtBottom] = useState(false);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const isLoading = isUploadingImage || isCreatingBlog || isEditingBlog;

    const form = useForm<CreateBlogFormData>({
        resolver: zodResolver(createBlogFormSchema),
        defaultValues,
        reValidateMode: "onChange"
    });

    const status = form.watch("status");

    useEffect(() => {
        if (isSuccess && blogId) {
            const data: CreateBlogFormData = {
                status: blogDetails?.status ?? BlogStatus.DRAFT,
                bannerUrl: blogDetails?.bannerUrl ?? "",
                banner: null,
                title: blogDetails?.title ?? "",
                description: blogDetails?.description ?? "",
                jsonContent: blogDetails?.jsonContent ?? {},
                htmlContent: blogDetails?.htmlContent ?? "",
                categories: blogDetails?.categories ?? []
            };

            form.reset(data);
        }

        if (!blogId) {
            form.reset(defaultValues);
        }
    }, [isSuccess, blogId]);

    const createBlog = (data: CreateBlogFormData) => {
        if (!blogId) {
            const payload: CreateBlogPayload = {
                bannerUrl: data.bannerUrl,
                title: data.title,
                description: data.description,
                jsonContent: data.jsonContent,
                htmlContent: data.htmlContent,
                status: data.status,
                categories: data.categories.map((item) => item.id),
                userId: auth!.user!.id,
                readTime: calculateReadingTime(data.htmlContent)
            };

            createBlogMutation(payload, {
                onSuccess: () => {
                    toast({
                        title: "Blog created",
                        description: `Your blog has been ${data.status === BlogStatus.DRAFT ? "saved" : "published"} successfully.`,
                        variant: "success"
                    });
                },
                onError: (error) => {
                    const axiosError = error as AxiosError<{ message: string }>;
                    if (axiosError.isAxiosError) {
                        toast({
                            title: "Error creating blog",
                            description: axiosError.response?.data.message,
                            variant: "error"
                        });
                    } else {
                        toast({
                            title: "Error creating blog",
                            description: error.message,
                            variant: "error"
                        });
                    }
                }
            });
        }

        if (blogId) {
            const payload: EditBlogPayload = {
                bannerUrl: data.bannerUrl,
                title: data.title,
                description: data.description,
                jsonContent: data.jsonContent,
                htmlContent: data.htmlContent,
                status: data.status,
                categories: data.categories.map((item) => item.id),
                userId: blogDetails!.userId,
                id: blogDetails!.id,
                readTime: calculateReadingTime(data.htmlContent)
            };

            editBlogMutation(payload, {
                onSuccess: ({ data }) => {
                    toast({
                        title: "Blog updated",
                        description: `Your blog has been ${data.status === BlogStatus.DRAFT ? "saved" : "published"} successfully.`,
                        variant: "success"
                    });
                },
                onError: (error) => {
                    const axiosError = error as AxiosError<{ message: string }>;
                    if (axiosError.isAxiosError) {
                        toast({
                            title: "Error updating blog",
                            description: axiosError.response?.data.message,
                            variant: "error"
                        });
                    } else {
                        toast({
                            title: "Error updating blog",
                            description: error.message,
                            variant: "error"
                        });
                    }
                }
            });
        }
    };

    const handleSubmit = (values: CreateBlogFormData) => {
        const { dirtyFields } = form.formState;
        if (dirtyFields.bannerUrl && values.banner !== null) {
            const formData = new FormData();
            formData.append("file", values.banner);

            uploadFile(formData, {
                onSuccess: ({ data }) => {
                    createBlog({ ...values, bannerUrl: data!.fileUrl });
                }
            });
        } else {
            createBlog(values);
        }
    };

    const checkSticky = useCallback(() => {
        if (formRef.current) {
            const { bottom, height } = formRef.current.getBoundingClientRect();
            setIsSticky(
                bottom > window.innerHeight && height > window.innerHeight
            );
        }
    }, []);

    const debouncedCheckSticky = debounce(checkSticky, 300);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsAtBottom(entry.isIntersecting);
            },
            { threshold: 1 }
        );

        if (bottomRef.current) {
            observer.observe(bottomRef.current);
        }

        const handleScroll = () => {
            requestAnimationFrame(debouncedCheckSticky);
        };

        window.addEventListener("scroll", handleScroll);
        checkSticky();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            observer.disconnect();
        };
    }, [debouncedCheckSticky, checkSticky]);

    const renderButtons = () => (
        <div className="flex justify-end items-center gap-2">
            <Button
                type="button"
                variant="outline"
                disabled={!form.formState.isValid || isLoading}
                onClick={() => setIsPreviewOpen(true)}
            >
                Preview
            </Button>
            <Button
                type="submit"
                variant="outline"
                disabled={isLoading}
                loading={isLoading && status === BlogStatus.DRAFT}
                onClick={() => {
                    form.setValue("status", BlogStatus.DRAFT);
                }}
            >
                Save Draft
            </Button>
            <Button
                type="submit"
                disabled={isLoading}
                loading={isLoading && status === BlogStatus.PUBLISHED}
                onClick={() => {
                    form.setValue("status", BlogStatus.PUBLISHED);
                }}
            >
                Publish
            </Button>
        </div>
    );

    return (
        <Container>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className="container max-w-screen-lg mx-auto p-4 max-md:p-0">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-4xl">
                                    {blogId
                                        ? "Edit Your Blog"
                                        : "Write Your Blog"}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6" ref={formRef}>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="bannerUrl"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel
                                                    htmlFor="banner"
                                                    className="mb-2 block"
                                                >
                                                    Banner Image
                                                </FormLabel>
                                                <FormControl>
                                                    <BannerUpload
                                                        bannerUrl={field.value}
                                                        onChange={(
                                                            file,
                                                            bannerUrl
                                                        ) => {
                                                            field.onChange(
                                                                bannerUrl
                                                            );
                                                            form.setValue(
                                                                "banner",
                                                                file
                                                            );
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="relative">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="title">
                                                    Title
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        id="title"
                                                        value={field.value}
                                                        onChange={
                                                            field.onChange
                                                        }
                                                        placeholder="Enter blog title"
                                                        maxLength={100}
                                                    />
                                                </FormControl>
                                                <span className="absolute right-0 top-0 text-xs text-[#98A2B3] font-medium leading-[1.125rem]">
                                                    {field.value.length}/100
                                                    chars limit
                                                </span>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="categories"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="categories">
                                                    Tags
                                                </FormLabel>
                                                <FormControl>
                                                    <TagSelect
                                                        id="categories"
                                                        defaultOptions={
                                                            categoriesData?.data ??
                                                            []
                                                        }
                                                        value={field.value}
                                                        onChange={
                                                            field.onChange
                                                        }
                                                        placeholder="Select or create new tags"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="relative">
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="description">
                                                    Short Description
                                                </FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        id="description"
                                                        value={field.value}
                                                        onChange={
                                                            field.onChange
                                                        }
                                                        className="w-full h-20"
                                                        placeholder="Enter a short description"
                                                        maxLength={255}
                                                    />
                                                </FormControl>
                                                <span className="absolute right-0 top-0 text-xs text-[#98A2B3] font-medium leading-[1.125rem]">
                                                    {field.value.length}/255
                                                    chars limit
                                                </span>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="w-full mb-6">
                                    <FormField
                                        control={form.control}
                                        name="htmlContent"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Content</FormLabel>
                                                <FormControl>
                                                    {blogId ? (
                                                        <ContentEditor
                                                            initialContent={
                                                                blogDetails?.jsonContent ??
                                                                null
                                                            }
                                                            onChange={(
                                                                jsonContent,
                                                                htmlContent
                                                            ) => {
                                                                field.onChange(
                                                                    htmlContent
                                                                );
                                                                form.setValue(
                                                                    "jsonContent",
                                                                    jsonContent
                                                                );
                                                            }}
                                                            key={blogId}
                                                        />
                                                    ) : (
                                                        <ContentEditor
                                                            onChange={(
                                                                jsonContent,
                                                                htmlContent
                                                            ) => {
                                                                field.onChange(
                                                                    htmlContent
                                                                );
                                                                form.setValue(
                                                                    "jsonContent",
                                                                    jsonContent
                                                                );
                                                            }}
                                                        />
                                                    )}
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div ref={bottomRef} />
                                {isAtBottom && renderButtons()}
                            </CardContent>
                        </Card>
                    </div>
                    {isSticky && !isAtBottom && (
                        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 transition-all duration-300">
                            <div className="flex items-center justify-end container max-w-screen-lg mx-auto">
                                {renderButtons()}
                            </div>
                        </div>
                    )}

                    <BlogPreviewPopup
                        isOpen={isPreviewOpen}
                        onClose={() => setIsPreviewOpen(false)}
                        blog={{
                            bannerUrl: form.getValues("bannerUrl"),
                            title: form.getValues("title"),
                            htmlContent: form.getValues("htmlContent"),
                            description: form.getValues("description"),
                            user: auth.user!,
                            createdAt: new Date().toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            }),
                            readTime: calculateReadingTime(
                                form.getValues("htmlContent")
                            ),
                            categories: form.getValues("categories")
                        }}
                    />
                </form>
            </FormProvider>
        </Container>
    );
}
