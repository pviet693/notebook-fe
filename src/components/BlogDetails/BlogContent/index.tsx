import React from "react";

interface BlogContentProps {
    description: string;
    htmlContent: string;
}

const BlogContent: React.FC<BlogContentProps> = ({
    description,
    htmlContent
}) => {
    return (
        <>
            <p className="leading-[1.4rem] text-[#666] mt-10">{description}</p>
            <div
                className="prose max-w-none mt-8"
                dangerouslySetInnerHTML={{
                    __html: htmlContent
                }}
            />
        </>
    );
};

export default BlogContent;
