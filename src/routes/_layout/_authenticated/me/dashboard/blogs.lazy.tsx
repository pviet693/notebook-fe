import DashboardBlogs from "@/pages/DashboardBlogs";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
    "/_layout/_authenticated/me/dashboard/blogs"
)({
    component: DashboardBlogs
});
