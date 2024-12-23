import { FileQuestion } from "lucide-react";

export default function EmptySearch() {
    return (
        <div className="flex flex-col items-center justify-center h-[55vh] bg-gray-50 dark:bg-gray-900">
            <div className="relative z-10 px-12 py-12 flex flex-col items-center">
                <FileQuestion className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 text-center">
                    No results found
                </h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400 text-center max-w-sm">
                    We couldn't find any blogs matching your search.
                </p>
            </div>
        </div>
    );
}
