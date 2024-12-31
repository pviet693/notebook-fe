import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
    beforeLoad: async ({ context }) => {
        const { isLoggedIn } = context.auth;

        if (isLoggedIn) {
            throw redirect({ to: "/" });
        }
    }
});
