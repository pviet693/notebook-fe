import { createFileRoute } from "@tanstack/react-router";

export type BlogFilters = {
    title?: string;
    tags?: string;
    users?: string;
};

export const Route = createFileRoute("/_layout/search")({
    validateSearch: (search: Record<string, unknown>): BlogFilters => {
        return {
            title: search.title as string,
            tags: search.tags as string,
            users: search.users as string
        };
    }
});
