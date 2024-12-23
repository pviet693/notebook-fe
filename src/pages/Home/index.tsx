import { useEffect, Fragment } from "react";
import BlogCard from "@/components/BlogCard";
import { ShareKnowledge } from "@/components/Home";
import { TopAuthors } from "@/components/Home";
import { Categories } from "@/components/Home";
import { TodaysUpdate } from "@/components/Home";
import { SearchTags } from "@/components/Home";
import { useInView } from "react-intersection-observer";
import { useBlogPaginationQuery } from "@/hooks/blog/useBlogPaginationQuery";
import { ApiResponse, BlogPaginationResponse } from "@/types";
import Container from "@/components/Container";

export default function HomePage() {
    const { ref, inView } = useInView();

    const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
        useBlogPaginationQuery({});

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    return (
        <Container>
            <div className="flex justify-center max-md:flex-col gap-[80px] min-h-screen relative">
                {/* Recently Posted */}
                <div className="w-[900px] max-md:w-full">
                    <h2 className="text-xl font-semibold flex items-center gap-1 mb-14">
                        <span className="text-primary-foreground bg-primary">
                            Recently
                        </span>
                        <span> Posted</span>
                    </h2>
                    <div className="flex flex-col w-full gap-12 h-full">
                        {data?.pages.map(
                            (
                                page: ApiResponse<BlogPaginationResponse>,
                                pageIndex: number
                            ) => (
                                <Fragment key={pageIndex}>
                                    {page.data?.data?.map((blog) => (
                                        <Fragment key={blog.id}>
                                            <BlogCard blog={blog} />
                                            {pageIndex === 0 &&
                                                blog.id ===
                                                    page.data?.data[2]?.id && (
                                                    <ShareKnowledge />
                                                )}
                                        </Fragment>
                                    ))}
                                </Fragment>
                            )
                        )}

                        {(isFetchingNextPage || isLoading) && (
                            <>
                                <BlogCard isLoading />
                            </>
                        )}

                        {/* Sentinel div to trigger the infinite scroll */}
                        <div ref={ref}></div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="flex-1 flex flex-col gap-[56px] sticky top-0">
                    <TopAuthors />
                    <Categories />
                    <TodaysUpdate />
                    <SearchTags />
                </div>
            </div>
        </Container>
    );
}
