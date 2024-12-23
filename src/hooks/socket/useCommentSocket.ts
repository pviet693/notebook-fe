import { useCallback, useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io(`${import.meta.env.VITE_BASE_URL}/comments`, {
    transports: ["websocket", "polling"]
});

type CommentSocketPayload = {
    parentCommentId?: string | null;
    blogId: string;
};

export function useCommentSocket({ blogId }: { blogId: string }) {
    const hasConnected = useRef(false);
    const [newComment, setNewComment] = useState<CommentSocketPayload | null>(
        null
    );

    const handleNewNotification = useCallback(
        (payload: CommentSocketPayload) => {
            setNewComment(payload);
        },
        [setNewComment]
    );

    useEffect(() => {
        if (blogId && !hasConnected.current) {
            hasConnected.current = true;
            socket.emit("joinRoom", blogId);

            socket.on("comment", handleNewNotification);
        }
    }, [blogId, handleNewNotification]);

    return { newComment, setNewComment };
}
