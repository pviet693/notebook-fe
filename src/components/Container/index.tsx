import { cn } from "@/lib/utils";

function Container({
    children,
    className
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn("container py-12 max-md:py-6 max-md:px-4", className)}
        >
            {children}
        </div>
    );
}

export default Container;
