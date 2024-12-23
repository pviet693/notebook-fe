import SettingPasswordPage from "@/pages/SettingPassword";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
    "/_layout/_authenticated/me/settings/password"
)({
    component: SettingPasswordPage
});
