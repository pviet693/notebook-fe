import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export default function EmptyBlog() {
    return (
        <div className="flex flex-col items-center justify-center h-[55vh] bg-gray-50 dark:bg-gray-900">
            <FileText className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No blogs yet
            </h3>
            <p className="text-gray-500 text-center mb-4">
                You haven't written any blogs yet. Start creating your first
                blog post!
            </p>
            <Button>
                <Link to="/blogs/create">Create Your First Blog</Link>
            </Button>
        </div>
    );
}
