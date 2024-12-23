import { Fragment, useCallback, useEffect } from "react";
import { Bell, Check, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNotificationPaginationQuery } from "@/hooks/notification/useNotificationPaginationQuery";
import { ApiResponse } from "@/types";
import { NotificationPaginationResponse } from "@/types/notification";
import { cn } from "@/lib/utils";
import NotificationMessage from "@/components/Navbar/NotificationBell/NotificationMessage";
import { useUnreadNotifiCountQuery } from "@/hooks/notification/useUnreadNotifiCountQuery";
import { useMarkNotificationAsReadMutation } from "@/hooks/notification/useMarkNotificationAsReadMutation";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants";
import { useNotificationSocket } from "@/hooks/socket/useNotificationSocket";

export default function NotificationBell() {
    const queryClient = useQueryClient();
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } =
        useNotificationPaginationQuery({ queries: { limit: 5 } });
    const { hasNewNotification, setHasNewNotification } =
        useNotificationSocket();
    const { data: unreadNotifiCountData } = useUnreadNotifiCountQuery();
    const unreadCount = unreadNotifiCountData?.data ?? 0;
    const { markAsRead, markAllAsRead } = useMarkNotificationAsReadMutation();

    const invalidateQueries = useCallback(() => {
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.NOTIFICATIONS, 5],
            exact: true,
            refetchType: "active"
        });
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.UNREAD_NOTIFICATION_COUNT],
            exact: true,
            refetchType: "active"
        });
    }, [queryClient]);

    const handleMarkAsRead = (notificationId: string) => {
        markAsRead(notificationId, {
            onSuccess: invalidateQueries
        });
    };

    const handleMarkAllAsRead = () => {
        markAllAsRead(undefined, {
            onSuccess: invalidateQueries
        });
    };

    useEffect(() => {
        if (hasNewNotification) {
            invalidateQueries();
            setHasNewNotification(false);
        }
    }, [hasNewNotification, invalidateQueries, setHasNewNotification]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="!h-6 !w-6 max-md:!w-5 max-md:!h-5" />
                    {unreadCount > 0 && (
                        <Badge
                            className="absolute top-0 right-0 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
                            variant="destructive"
                        >
                            {unreadCount}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <div className="flex items-center justify-between px-4 py-2">
                    <h2 className="text-sm font-semibold">Notifications</h2>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:text-primary"
                        disabled={unreadCount === 0}
                        onClick={handleMarkAllAsRead}
                    >
                        Mark all as read
                    </Button>
                </div>
                <DropdownMenuSeparator />
                <ScrollArea className="h-[300px] relative">
                    {data?.pages.map(
                        (
                            page: ApiResponse<NotificationPaginationResponse>,
                            pageIndex: number
                        ) => (
                            <Fragment key={pageIndex}>
                                {page.data?.data?.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className="px-4 py-2 hover:bg-gray-100"
                                    >
                                        <div className="flex items-start gap-2 w-full">
                                            <div
                                                className={cn(
                                                    "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                                                    {
                                                        "bg-gray-300":
                                                            notification.hasRead,
                                                        "bg-primary":
                                                            !notification.hasRead
                                                    }
                                                )}
                                            />

                                            <NotificationMessage
                                                notification={notification}
                                            />

                                            {!notification.hasRead && (
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>

                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                handleMarkAsRead(
                                                                    notification.id
                                                                )
                                                            }
                                                            className="text-primary focus:text-primary"
                                                        >
                                                            <Check className="mr-2 h-4 w-4" />{" "}
                                                            Mark as read
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </Fragment>
                        )
                    )}

                    {!isLoading && data?.pages[0]?.data?.total === 0 && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <svg
                                className="w-24 h-24 mb-4 text-gray-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1}
                                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                />
                            </svg>
                            <p className="text-sm text-gray-500">
                                You have no notifications at the moment.
                            </p>
                        </div>
                    )}
                </ScrollArea>
                {hasNextPage && (
                    <>
                        <DropdownMenuSeparator />
                        <div className="p-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full"
                                loading={isFetchingNextPage}
                                onClick={() => fetchNextPage()}
                            >
                                Load more
                            </Button>
                        </div>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
