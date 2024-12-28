import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/_authenticated")({
    beforeLoad: async ({ context }) => {
        const { isLoggedIn } = context.auth;
        console.log(context);
        if (!isLoggedIn()) {
            const redirectUri =
                window.location.pathname + window.location.search;

            throw redirect({ to: `/signin?redirect_uri=${redirectUri}` });
        }
    }
});
