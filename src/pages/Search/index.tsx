import { useEffect, Fragment, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { useBlogPaginationQuery } from "@/hooks/blog/useBlogPaginationQuery";
import { ApiResponse, BlogPaginationResponse } from "@/types";
import BlogCard from "@/components/BlogCard";
import { useAllAuthorsQuery } from "@/hooks/user/useAllAuthorsQuery";
import { useCategoryQuery } from "@/hooks/category/useCategoryQuery";
import { EmptySearch, SearchForm } from "@/components/Search";
import { useSearch } from "@tanstack/react-router";
import Container from "@/components/Container";

export default function SearchPage() {
    const { title, tags, users } = useSearch({ from: "/_layout/search" });
    const searchCategories = tags && tags.length ? tags.split(",") : [];
    const searchAuthors = users && users.length ? users.split(",") : [];
    const { ref, inView } = useInView();
    const {
        data: blogPaginationData,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isFetchingNextPage
    } = useBlogPaginationQuery({
        queries: {
            title,
            categories: searchCategories,
            authors: searchAuthors
        }
    });
    const { data: allAuthorsData } = useAllAuthorsQuery();
    const authors = useMemo(() => allAuthorsData?.data ?? [], [allAuthorsData]);
    const { data: allCategoriesData } = useCategoryQuery();
    const categories = useMemo(
        () => allCategoriesData?.data ?? [],
        [allCategoriesData]
    );

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    const totalResults = blogPaginationData?.pages[0]?.data?.total || 0;

    return (
        <Container>
            <div className="min-h-screen">
                <div className="max-w-4xl mx-auto space-y-8">
                    <h1 className="text-3xl font-bold">Search</h1>

                    <SearchForm
                        categories={categories}
                        authors={authors}
                        initialValue={{
                            title: title ?? "",
                            categories: searchCategories,
                            authors: searchAuthors
                        }}
                    />

                    {/* Search Results */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold">
                                Search Results
                                <span className="text-muted-foreground ml-2">
                                    ({totalResults} results)
                                </span>
                            </h2>
                        </div>
                        {totalResults > 0 || isLoading ? (
                            <div className="flex flex-col w-full gap-12 h-full">
                                {blogPaginationData?.pages.map(
                                    (
                                        page: ApiResponse<BlogPaginationResponse>,
                                        pageIndex: number
                                    ) => (
                                        <Fragment key={pageIndex}>
                                            {page.data?.data?.map((blog) => (
                                                <BlogCard
                                                    blog={blog}
                                                    key={blog.id}
                                                />
                                            ))}
                                        </Fragment>
                                    )
                                )}

                                {(isFetchingNextPage || isLoading) && (
                                    <BlogCard isLoading />
                                )}

                                {/* Sentinel div to trigger the infinite scroll */}
                                <div ref={ref}></div>
                            </div>
                        ) : (
                            <EmptySearch />
                        )}
                    </div>
                </div>
            </div>
        </Container>
    );
}
