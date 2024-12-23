import ForgotPasswordPage from "@/pages/ForgotPassword";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/forgot-password")({
    component: ForgotPasswordPage
});
