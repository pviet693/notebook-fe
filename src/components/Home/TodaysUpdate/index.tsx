import { Skeleton } from "@/components/ui/skeleton";
import { useStatsQuery } from "@/hooks/stats/useStatsQuery";
import { useMemo } from "react";

type UpdateItem = {
    count: number;
    label: string;
}

export default function TodaysUpdate() {
    const { webVisitStats, blogReadStats, newUserStats, newBlogStats, isLoading } =
        useStatsQuery();

    const todaysUpdateItems: UpdateItem[] = useMemo(
        () => [
            { count: newBlogStats, label: "New blogs" },
            { count: webVisitStats, label: "Total Visitors" },
            { count: newUserStats, label: "New users" },
            { count: blogReadStats, label: "Blog Read" }
        ],
        [blogReadStats, newBlogStats, newUserStats, webVisitStats]
    );

    return (
        <div className="flex flex-col gap-11">
            <h2 className="text-xl font-semibold flex items-center gap-1">
                <span className="text-primary-foreground bg-primary">
                    Today's
                </span>
                <span> Update</span>
            </h2>
            <div className="flex gap-6 flex-wrap">
                {isLoading
                    ? Array(4)
                          .fill(0)
                          .map((_, index) => (
                              <div
                                  key={index}
                                  className="w-[calc(50%-12px)] h-[111px] rounded-[10px] bg-[#f2f8f7] flex justify-center items-center flex-col gap-[6px]"
                              >
                                  <Skeleton className="h-8 w-16" />
                                  <Skeleton className="h-4 w-24" />
                              </div>
                          ))
                    : todaysUpdateItems.map((item, index) => (
                          <div
                              key={index}
                              className="w-[166px] h-[111px] rounded-[10px] bg-[#f2f8f7] flex justify-center items-center flex-col gap-[6px]"
                          >
                              <p className="font-semibold text-2xl leading-[2.1rem] text-primary">
                                  {item.count}
                              </p>
                              <p className="text-[15px] text-[#222] leading-[1.4rem]">
                                  {item.label}
                              </p>
                          </div>
                      ))}
            </div>
        </div>
    );
}
