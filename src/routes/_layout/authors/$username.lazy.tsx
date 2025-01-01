import AuthorProfile from "@/pages/AuthorProfile";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_layout/authors/$username")({
    component: AuthorProfile
});
