import SignInPage from "@/pages/SignIn";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_auth/signin")({
    component: SignInPage
});
