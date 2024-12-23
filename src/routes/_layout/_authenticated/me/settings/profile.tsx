import EditProfilePage from "@/pages/EditProfile";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
    "/_layout/_authenticated/me/settings/profile"
)({
    component: EditProfilePage
});
