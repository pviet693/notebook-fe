import SearchPage from "@/pages/Search";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_layout/search")({
    component: SearchPage
});
