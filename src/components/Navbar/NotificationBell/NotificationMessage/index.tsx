import { cn } from "@/lib/utils";
import { type Notification } from "@/types/notification";
import { Link } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";

type NotificationMessageProps = {
    notification: Notification;
};

export default function NotificationMessage({
    notification
}: NotificationMessageProps) {
    const { type, sender } = notification;

    const messages = {
        LIKE: "liked your blog",
        COMMENT: "commented on your blog",
        REPLY: "replied to your comment"
    };

    return (
        <div className="flex-1 min-w-0">
            <p
                className={cn("text-sm", {
                    "text-gray-500": notification.hasRead,
                    "text-gray-900": !notification.hasRead
                })}
            >
                <Link to="/" className="hover:underline font-medium inline-block">{sender.fullname}</Link>
                <span className="whitespace-break-spaces flex-1"> {messages[type]}</span>
            </p>
            <Link
                to="/blogs/$blogSlug"
                params={{ blogSlug: notification.blog.slug }}
                className="text-xs text-gray-400 mt-1 truncate line-clamp-1 hover:underline"
            >
                {notification.blog.title}
            </Link>
            <p className="text-xs text-gray-400 mt-1">
                {formatDistanceToNow(notification.createdAt, {
                    addSuffix: true
                })}
            </p>
        </div>
    );
}
