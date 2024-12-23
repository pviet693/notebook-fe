import { useEffect, Fragment, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { ApiResponse, BlogPaginationResponse } from "@/types";
import { useCategoryQuery } from "@/hooks/category/useCategoryQuery";
import { EmptySearch } from "@/components/Search";
import { useSearch } from "@tanstack/react-router";
import Container from "@/components/Container";
import { useDashboardBlogQuery } from "@/hooks/blog/useDashboardBlogQuery";
import {
    DashboardBlogCard,
    EmptyBlog,
    SearchForm
} from "@/components/DashboardBlogs";

export default function DashboardBlogs() {
    const { title, tags, statuses } = useSearch({
        from: "/_layout/_authenticated/me/dashboard/blogs"
    });
    const searchCategories = tags && tags.length ? tags.split(",") : [];
    const searchStatuses =
        statuses && statuses.length ? statuses.split(",") : [];
    const hasSearch = title || searchCategories.length || searchStatuses.length;
    const { ref, inView } = useInView();
    const {
        data: blogPaginationData,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isFetchingNextPage
    } = useDashboardBlogQuery({
        queries: {
            title,
            categories: searchCategories,
            statuses: searchStatuses
        }
    });
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
        <Container className="bg-white">
            <div className="min-h-screen">
                <div className="max-w-4xl mx-auto space-y-8">
                    <h1 className="text-3xl font-bold">Search</h1>

                    <SearchForm
                        categories={categories}
                        initialValue={{
                            title: title ?? "",
                            categories: searchCategories,
                            statuses: searchStatuses
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
                                                <DashboardBlogCard
                                                    blog={blog}
                                                    key={blog.id}
                                                />
                                            ))}
                                        </Fragment>
                                    )
                                )}

                                {(isFetchingNextPage || isLoading) && (
                                    <DashboardBlogCard isLoading />
                                )}

                                {/* Sentinel div to trigger the infinite scroll */}
                                <div ref={ref}></div>
                            </div>
                        ) : (
                            <>{hasSearch ? <EmptySearch /> : <EmptyBlog />}</>
                        )}
                    </div>
                </div>
            </div>
        </Container>
    );
}
