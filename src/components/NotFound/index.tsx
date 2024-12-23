import { ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 flex flex-col items-center justify-center text-center px-4 gap-6">
                <h1 className="text-[200px] font-bold text-primary leading-none">
                    404
                </h1>
                <p className="text-xl">
                    The Page You Are Looking For Does Not Exist!
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center text-primary hover:underline gap-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back To Homepage
                </Link>
            </main>
        </div>
    );
}
