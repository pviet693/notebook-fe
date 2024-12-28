import NotFound from "@/components/NotFound";
import { AuthContextType } from "@/hooks/auth/useAuth";
import { useIncrWebVisitMutation } from "@/hooks/stats/useIncrWebVisitMutation";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";

type RouterContext = {
    auth: AuthContextType;
};

export const Route = createRootRouteWithContext<RouterContext>()({
    component: RouteComponent,
    notFoundComponent: NotFound
});

function RouteComponent() {
    const { mutate: incrWebVisitMutation } = useIncrWebVisitMutation();

    useEffect(() => {
        const hasVisitedPage = sessionStorage.getItem("hasVisitedPage");

        if (!hasVisitedPage) {
            sessionStorage.setItem("hasVisitedPage", "true");
            incrWebVisitMutation();
        }
    }, [incrWebVisitMutation]);

    return <Outlet />;
}
