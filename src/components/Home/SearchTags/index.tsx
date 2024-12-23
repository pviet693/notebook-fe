import { Skeleton } from "@/components/ui/skeleton";
import { useCategoryQuery } from "@/hooks/category/useCategoryQuery";
import { Link } from "@tanstack/react-router";

export default function SearchTags() {
    const { data: categoriesData, isLoading } = useCategoryQuery();
    const categories = categoriesData?.data ?? [];

    return (
        <div className="flex flex-col gap-11">
            <h2 className="text-xl font-semibold flex items-center gap-1">
                <span className="text-primary-foreground bg-primary">
                    Search
                </span>
                <span> With Tags</span>
            </h2>
            <div className="flex gap-3 flex-wrap">
                {isLoading
                    ? Array(9)
                          .fill(0)
                          .map((_, index) => (
                              <Skeleton key={index} className="h-10 w-24" />
                          ))
                    : categories.map((category) => (
                          <Link
                              to={`/search?tags=${category.slug}`}
                              key={category.id}
                              className="py-[10px] px-[20px] border border-[#c4c4c4] rounded-[4px] text-[15px] leading-[15px] text-[#666] hover:bg-primary hover:border-primary hover:text-white cursor-pointer transition-all duration-300 ease-in-out"
                          >
                              {category.name}
                          </Link>
                      ))}
            </div>
        </div>
    );
}
