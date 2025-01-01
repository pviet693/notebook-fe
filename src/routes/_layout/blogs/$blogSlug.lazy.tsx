import BlogDetailsPage from "@/pages/BlogDetails";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_layout/blogs/$blogSlug")({
    component: BlogDetailsPage
});
