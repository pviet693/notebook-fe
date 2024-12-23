import { RelatedBlogCard } from "@/components/BlogDetails";
import Container from "@/components/Container";
import LazyLoadImage from "@/components/LazyLoadImage";
import { social_icons, socials } from "@/constants";
import { useBlogsByUsernameQuery } from "@/hooks/blog/useBlogsByUsernameQuery";
import { useAuthorQuery } from "@/hooks/user/useAuthorQuery";
import { ApiResponse, BlogPaginationResponse } from "@/types";
import { useParams } from "@tanstack/react-router";
import { PenSquare } from "lucide-react";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function AuthorProfile() {
    const { username } = useParams({ strict: false });
    const { ref, inView } = useInView();
    const { data: authorData } = useAuthorQuery(username);
    const author = authorData?.data;
    const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
        useBlogsByUsernameQuery({
            queries: { username: username as string, limit: 8 }
        });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    const totalResults = data?.pages[0]?.data?.total || 0;

    const hasSocialLink = socials.some((social) => !!author?.[social]);

    return (
        <div className="min-h-screen">
            <div className="bg-[#f2f8f7]">
                <Container>
                    <div className="flex items-center gap-16">
                        <div className="aspect-square rounded-lg flex items-center justify-center">
                            <LazyLoadImage
                                src={author?.profile_img ?? ""}
                                alt={author?.fullname ?? ""}
                                className="w-[300px] h-[300px]"
                                imageClassName="rounded-sm"
                            />
                        </div>
                        <div className="space-y-6">
                            <h1 className="text-3xl font-bold">
                                Hi! I'm {author?.fullname}
                            </h1>
                            <p className="text-gray-600">
                                Dynamically underwhelm integrated outsourcing
                                via timely models. Rapidiously reconceptualize
                                visionary imperatives without 24/365 catalysts
                                for change. Completely streamline functionalized
                                models and out-of-the-box functionalities.
                                Authoritatively target proactive vortals
                                vis-a-vis exceptional results. Compellingly
                                brand emerging sources and compelling materials.
                                Globally iterate parallel content
                            </p>
                            <div className="space-y-2">
                                <h2 className="text-xl font-semibold">
                                    The Best Ideas Can Change Who We Are,
                                </h2>
                                <p className="text-gray-600">
                                    Dynamically underwhelm integrated
                                    outsourcing via timely models. Rapidiously
                                    reconceptualize visionary imperatives
                                    without 24/365 catalysts for
                                </p>
                            </div>
                            {hasSocialLink ? (
                                <div className="space-y-2">
                                <h3 className="font-medium">
                                    Follow On Social Media:
                                </h3>
                                <div className="flex gap-4">
                                    {socials.map((social) => {
                                        const Icon = social_icons[social];

                                        if (!author?.[social]) return null;

                                        return (
                                            <a
                                                key={social}
                                                href={author[social]}
                                                className="p-1 w-[28px] h-[28px] rounded-[3px] border border-[#c4c4c4] text-[#c4c4c4] hover:bg-[#00aaa1] hover:text-white hover:border-none hover:cursor-pointer shadow-lg"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Icon className="w-full h-full" />
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                            ) : null}
                        </div>
                    </div>
                </Container>
            </div>

            {/* Author Blogs Section */}
            <Container>
                <div className="flex flex-col gap-14">
                    <h2 className="text-xl font-semibold flex items-center gap-1">
                        <span className="text-primary-foreground bg-primary">
                            Read
                        </span>
                        <span> Author Blogs</span>
                    </h2>

                    {totalResults > 0 || isLoading ? (
                        <div className="w-full h-full grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {data?.pages.map(
                                (
                                    page: ApiResponse<BlogPaginationResponse>,
                                    pageIndex: number
                                ) => (
                                    <Fragment key={pageIndex}>
                                        {page.data?.data?.map((blog) => (
                                            <RelatedBlogCard
                                                blog={blog}
                                                key={blog.id}
                                            />
                                        ))}
                                    </Fragment>
                                )
                            )}

                            {(isFetchingNextPage || isLoading) && (
                                <RelatedBlogCard isLoading />
                            )}

                            {/* Sentinel div to trigger the infinite scroll */}
                            <div ref={ref}></div>
                        </div>
                    ) : (
                        <div className="px-8 py-12 text-center bg-gray-50 dark:bg-gray-900">
                            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-[#00BFA6]/10">
                                <PenSquare className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                No Blogs Yet
                            </h3>
                            <p className="text-gray-600">
                                This author hasn't created any blogs yet. Check
                                back later for new content!
                            </p>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
}
