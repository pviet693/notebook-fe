import DashboardBlogs from "@/pages/DashboardBlogs";
import { createFileRoute } from "@tanstack/react-router";

export type BlogFilters = {
    title?: string;
    tags?: string;
    statuses?: string;
};

export const Route = createFileRoute(
    "/_layout/_authenticated/me/dashboard/blogs"
)({
    component: DashboardBlogs,
    validateSearch: (search: Record<string, unknown>): BlogFilters => {
        return {
            title: search.title as string,
            tags: search.tags as string,
            statuses: search.statuses as string
        };
    }
});
