import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export default function AuthButtons() {
    const redirectUri = window.location.pathname + window.location.search;

    return (
        <div className="flex items-center gap-2">
            <Link href={`/signin?redirect_uri=${redirectUri}`}>
                <Button variant="outline" size="sm">
                    Sign in
                </Button>
            </Link>
            <Link href={`/signup?redirect_uri=${redirectUri}`}>
                <Button
                    size="sm"
                    className="bg-primary hover:bg-primary hover:opacity-90 text-primary-foreground"
                >
                    Sign up
                </Button>
            </Link>
        </div>
    );
}
