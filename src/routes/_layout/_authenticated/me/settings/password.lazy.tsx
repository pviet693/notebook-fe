import SettingPasswordPage from "@/pages/SettingPassword";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
    "/_layout/_authenticated/me/settings/password"
)({
    component: SettingPasswordPage
});
