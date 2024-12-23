import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { useInView } from "react-intersection-observer";

interface LazyLoadImageProps {
    src: string;
    alt: string;
    className?: string;
    imageClassName?: string;
    placeholder?: React.ReactNode;
}

const LazyLoadImage: React.FC<LazyLoadImageProps> = ({
    src,
    alt,
    className,
    imageClassName,
    placeholder = <Skeleton className={cn("w-full h-full", imageClassName)} />
}) => {
    const [imageLoaded, setImageLoaded] = useState(false); // State to track if the image has loaded
    const { ref, inView } = useInView({
        triggerOnce: true, // Only trigger once when the image enters the viewport
        threshold: 0.1 // Trigger when 10% of the image is in the viewport
    });

    return (
        <div ref={ref} className={className}>
            {/* Show placeholder until image is in view and loaded */}
            {(!inView || !imageLoaded) && placeholder}

            {/* Image tag, only loads the image when in view */}
            <img
                src={inView ? src : ""} // Lazy-load the image when it is in the viewport
                alt={alt}
                className={cn(
                    "w-full h-full object-cover transition-opacity duration-300",
                    {
                        "opacity-100": imageLoaded,
                        "opacity-0": !imageLoaded
                    },
                    imageClassName
                )}
                onLoad={() => setImageLoaded(true)} // Set the image as loaded once it finishes loading
            />
        </div>
    );
};

export default LazyLoadImage;
