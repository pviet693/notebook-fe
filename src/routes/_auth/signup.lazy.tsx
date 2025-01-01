import SignUpPage from "@/pages/SignUp";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_auth/signup")({
    component: SignUpPage
});
