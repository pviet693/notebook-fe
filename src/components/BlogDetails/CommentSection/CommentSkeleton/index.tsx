import { Skeleton } from "@/components/ui/skeleton";

const CommentSkeleton = () => (
    <div className="mt-12 space-y-6">
        <Skeleton className="h-8 w-32" />
        {[1, 2, 3].map((i) => (
            <div key={i} className="flex space-x-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                </div>
            </div>
        ))}
    </div>
);

export default CommentSkeleton;
