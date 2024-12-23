import { Skeleton } from "@/components/ui/skeleton";

function SkeletonBlogDetails() {
    return (
        <div className="w-[900px] max-md:w-full space-y-8">
            {/* Blog Header Skeleton */}
            <div className="space-y-4">
                <div className="flex gap-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-24" />
                </div>
                <Skeleton className="h-10 w-3/4" />
                <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                </div>
            </div>

            {/* Blog Image Skeleton */}
            <Skeleton className="h-[440px] w-full" />

            {/* Blog Content Skeleton */}
            <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
            </div>

            {/* Blog Interactions Skeleton */}
            <div className="space-y-4">
                <div className="flex justify-center gap-4">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                </div>
                <div className="flex gap-4">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-24" />
                </div>
            </div>

            {/* Comments Skeleton */}
            <div className="space-y-4">
                <Skeleton className="h-8 w-32" />
                {[1, 2, 3].map((_, index) => (
                    <div key={index} className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div className="space-y-1">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                        </div>
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SkeletonBlogDetails;
