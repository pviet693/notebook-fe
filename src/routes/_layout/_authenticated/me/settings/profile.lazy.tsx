import EditProfilePage from "@/pages/EditProfile";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
    "/_layout/_authenticated/me/settings/profile"
)({
    component: EditProfilePage
});
