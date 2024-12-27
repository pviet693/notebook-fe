import ResetPasswordPage from "@/pages/ResetPassword";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/reset-password")({
    component: ResetPasswordPage
});
