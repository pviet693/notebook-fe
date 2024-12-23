import { QUERY_KEY } from "@/constants";
import {
    blogReadStats,
    newBlogStats,
    newUserStats,
    webVisitStats
} from "@/services/stats";
import { useQuery } from "@tanstack/react-query";

export function useStatsQuery() {
    const { data: webVisitStatsData, isLoading: isWebVisitStatsLoading } =
        useQuery({
            queryKey: [QUERY_KEY.WEB_VISIT_STATS],
            queryFn: webVisitStats
        });

    const { data: blogReadStatsData, isLoading: isBlogReadStatsLoading } =
        useQuery({
            queryKey: [QUERY_KEY.BLOG_READ_STATS],
            queryFn: blogReadStats
        });

    const { data: newUserStatsData, isLoading: isNewUserStatsLoading } =
        useQuery({
            queryKey: [QUERY_KEY.NEW_USER_STATS],
            queryFn: newUserStats
        });

    const { data: newBlogStatsData, isLoading: isNewBlogStatsLoading } =
        useQuery({
            queryKey: [QUERY_KEY.NEW_BLOG_STATS],
            queryFn: newBlogStats
        });

    const isLoading =
        isWebVisitStatsLoading ||
        isNewUserStatsLoading ||
        isNewBlogStatsLoading ||
        isBlogReadStatsLoading;

    return {
        webVisitStats: webVisitStatsData?.data as number,
        blogReadStats: blogReadStatsData?.data as number,
        newUserStats: newUserStatsData?.data as number,
        newBlogStats: newBlogStatsData?.data as number,
        isLoading
    };
}
