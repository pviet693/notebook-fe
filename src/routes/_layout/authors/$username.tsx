import AuthorProfile from "@/pages/AuthorProfile";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/authors/$username")({
    component: AuthorProfile
});
