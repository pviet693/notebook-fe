import { Fragment, useEffect, useRef } from "react";
import { TopAuthors } from "@/components/Home";
import { Categories } from "@/components/Home";
import { TodaysUpdate } from "@/components/Home";
import { SearchTags } from "@/components/Home";
import { useBlogPaginationQuery } from "@/hooks/blog/useBlogPaginationQuery";
import { useBlogDetailsQuery } from "@/hooks/blog/useBlogDetailsQuery";
import { useParams } from "@tanstack/react-router";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ApiResponse, BlogPaginationResponse } from "@/types";
import {
    BlogContent,
    BlogHeader,
    BlogInteractions,
    CommentSection,
    RelatedBlogCard,
    SkeletonBlogDetails
} from "@/components/BlogDetails";
import Container from "@/components/Container";
import { PenSquare } from "lucide-react";
import { useIncrBlogReadMutation } from "@/hooks/stats/useIncrBlogReadMutation";
import { useInView } from "react-intersection-observer";

export default function BlogDetailsPage() {
    const { blogSlug } = useParams({ strict: false });
    const { ref, inView } = useInView();
    const hasIncrementedRef = useRef(false);
    const { mutate: incrBlogReadMutation } = useIncrBlogReadMutation();
    const { data: blogData, isFetching: isBlogDetailsFetching } =
        useBlogDetailsQuery({ slug: blogSlug! });
    const blog = blogData?.data;
    const categoryIds = blog?.categories?.map((item) => item.slug);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading: isRelatedBlogsLoading
    } = useBlogPaginationQuery({
        queries: {
            limit: 4,
            categories: categoryIds,
            excludeBlogSlug: blogSlug
        },
        enabled: !!blog?.categories
    });

    const totalResults = data?.pages[0]?.data?.total || 0;

    useEffect(() => {
        if (inView && !hasIncrementedRef.current && blog) {
            incrBlogReadMutation(blog.id);
            hasIncrementedRef.current = true;
        }
    }, [inView, blog, incrBlogReadMutation]);

    return (
        <Container>
            <div className="grid justify-center xl:grid-cols-[900px_1fr] gap-[80px] min-h-screen relative">
                {/* Blog Details */}
                {isBlogDetailsFetching ? (
                    <SkeletonBlogDetails />
                ) : (
                    <div className="xl:w-[900px] w-full">
                        <BlogHeader blog={blog!} />
                        <BlogContent
                            description={blog!.description}
                            htmlContent={blog!.htmlContent}
                        />

                        <div ref={ref}></div>

                        <BlogInteractions
                            blogId={blog!.id}
                            blogTitle={blog!.title}
                        />

                        <div className="mt-6 space-y-4">
                            <CommentSection blog={blog!} />
                        </div>

                        <Separator className="my-8" />

                        <div className="flex flex-col gap-14">
                            <h2 className="text-xl font-semibold flex items-center gap-1">
                                <span className="text-primary-foreground bg-primary">
                                    See Related
                                </span>
                                <span> Blogs</span>
                            </h2>

                            {totalResults > 0 || isRelatedBlogsLoading ? (
                                <div className="flex flex-col gap-6">
                                    <div className="grid md:grid-cols-2 gap-10">
                                        {data?.pages.map(
                                            (
                                                page: ApiResponse<BlogPaginationResponse>,
                                                pageIndex: number
                                            ) => (
                                                <Fragment key={pageIndex}>
                                                    {page.data?.data?.map(
                                                        (blog) => (
                                                            <RelatedBlogCard
                                                                key={blog.id}
                                                                blog={blog}
                                                            />
                                                        )
                                                    )}
                                                </Fragment>
                                            )
                                        )}

                                        {isRelatedBlogsLoading && (
                                            <RelatedBlogCard isLoading />
                                        )}
                                    </div>
                                    <div className="flex justify-center">
                                        {hasNextPage && (
                                            <Button
                                                loading={isFetchingNextPage}
                                                variant="outline"
                                                className="w-fit"
                                                onClick={() => fetchNextPage()}
                                            >
                                                Load more
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-gray-50 rounded-lg shadow-sm p-8 text-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/10">
                                        <PenSquare className="w-8 h-8 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-primary">
                                        No Related Blogs Found
                                    </h3>
                                    <p className="text-gray-600">
                                        We couldn't find any related for this
                                        blog. Check back later for more content!
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Trending */}
                <div className="flex flex-col gap-[56px] sticky top-0">
                    <TopAuthors />
                    <Categories />
                    <TodaysUpdate />
                    <SearchTags />
                </div>
            </div>
        </Container>
    );
}
