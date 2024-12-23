import SignInPage from "@/pages/SignIn";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/signin")({
    component: SignInPage
});
