import CreateBlogPage from "@/pages/CreateBlog";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
    "/_layout/_authenticated/blogs/$blogId/edit"
)({
    component: CreateBlogPage
});
