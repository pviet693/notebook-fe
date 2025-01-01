import ResetPasswordPage from "@/pages/ResetPassword";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_auth/reset-password")({
    component: ResetPasswordPage
});
