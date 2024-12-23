import HomePage from "@/pages/Home";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/")({
    component: HomePage
});
