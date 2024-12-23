import { Skeleton } from "@/components/ui/skeleton";
import { useTopCategoriesQuery } from "@/hooks/category/useTopCategoriesQuery";

export default function Categories() {
    const { data: topCategoriesData, isLoading } = useTopCategoriesQuery({
        limit: 5
    });
    const topCategories = topCategoriesData?.data ?? [];

    return (
        <div className="flex flex-col gap-11">
            <h2 className="text-xl font-semibold flex items-center gap-1">
                <span className="text-primary-foreground bg-primary">
                    Categories
                </span>
            </h2>
            <div className="flex flex-col gap-3">
                {isLoading
                    ? Array(5)
                          .fill(0)
                          .map((_, index) => (
                              <div key={index}>
                                  <div className="flex justify-between">
                                      <Skeleton className="h-5 w-24" />
                                      <Skeleton className="h-5 w-8" />
                                  </div>
                                  {index < 4 && (
                                      <hr className="border-t-1 border-dashed border-[#d1e7e5] mt-3" />
                                  )}
                              </div>
                          ))
                    : topCategories.map((category, index) => (
                          <div key={index}>
                              <div className="flex justify-between">
                                  <p className="font-medium leading-[1.4rem] text-[#1c1c1c] text-[15px] capitalize">
                                      {category.name}
                                  </p>
                                  <p className="font-medium leading-[1.4rem] text-[#1c1c1c] text-[15px] capitalize">
                                      {category
                                          .categoryCount!.toString()
                                          .padStart(2, "0")}
                                  </p>
                              </div>
                              {index < topCategories.length - 1 && (
                                  <hr className="border-t-1 border-dashed border-[#d1e7e5] mt-3" />
                              )}
                          </div>
                      ))}
            </div>
        </div>
    );
}
