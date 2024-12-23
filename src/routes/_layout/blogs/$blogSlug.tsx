import BlogDetailsPage from "@/pages/BlogDetails";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/blogs/$blogSlug")({
    component: BlogDetailsPage
});
