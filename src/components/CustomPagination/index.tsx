import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

function CustomPagination({
    currentPage,
    totalPages,
    onPageChange
}: PaginationProps) {
    const renderPageNumbers = () => {
        const pageNumbers: (string | number)[] = [];
        const maxVisiblePages = 3;
        const sidePadding = Math.floor(maxVisiblePages / 2);

        let startPage = Math.max(currentPage - sidePadding, 1);
        const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(endPage - maxVisiblePages + 1, 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        if (startPage > 1) {
            pageNumbers.unshift("...");
        }
        if (endPage < totalPages) {
            pageNumbers.push("...");
        }

        return pageNumbers;
    };

    return (
        <Pagination className="pt-4">
            <PaginationContent className="flex items-center gap-2">
                <PaginationPrevious
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="cursor-pointer h-10 py-spacing-2 pr-spacing-4 pl-[10px] flex items-center justify-center gap-1 rounded-[6px] border border-white hover:border-border-light/2 hover:bg-white text-[#101828]"
                />

                {/* Các số trang */}
                {renderPageNumbers().map((pageNumber, index) => (
                    <PaginationItem key={index}>
                        {pageNumber === "..." ? (
                            <PaginationEllipsis className="h-10 w-10 flex items-center justify-center gap-1 rounded-[6px] border border-white hover:border-border-light/2 hover:bg-white" />
                        ) : (
                            <PaginationLink
                                isActive={pageNumber === currentPage}
                                onClick={() => onPageChange(Number(pageNumber))}
                                className={`cursor-pointer h-10 flex items-center justify-center gap-1 rounded-[6px] border border-white hover:border-border-light/2 ${
                                    pageNumber === currentPage
                                        ? "text-primary-foreground border-white bg-primary hover:bg-primary hover:text-primary-foreground"
                                        : "text-[]"
                                }`}
                            >
                                {pageNumber}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}

                <PaginationNext
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="cursor-pointer h-10 py-spacing-2 pr-spacing-4 pl-[10px] flex items-center justify-center gap-1 rounded-[6px] border border-white hover:border-border-light/2 hover:bg-white text-[#101828]"
                />
            </PaginationContent>
        </Pagination>
    );
}

export default CustomPagination;
