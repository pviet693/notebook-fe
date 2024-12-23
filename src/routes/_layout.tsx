import Copyright from "@/components/Copyright";
import Navbar from "@/components/Navbar";
import NotFound from "@/components/NotFound";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout")({
    component: RouteComponent,
    notFoundComponent: NotFound
});

function RouteComponent() {
    return (
        <div className="w-full h-full">
            <Navbar />
            <Outlet />
            <Copyright />
        </div>
    );
}
