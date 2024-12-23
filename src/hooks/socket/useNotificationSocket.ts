import useAuthContext from "@/hooks/auth/useAuthContext";
import { useCallback, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import sound from "@/assets/sounds/notification-sound.wav";

const socket = io(`${import.meta.env.VITE_BASE_URL}/notifications`, {
    transports: ["websocket", "polling"]
});

export function useNotificationSocket() {
    const { userId } = useAuthContext();
    const hasConnected = useRef(false);
    const [hasNewNotification, setHasNewNotification] = useState(false);

    const handleNewNotification = useCallback(() => {
        setHasNewNotification(true);
        const audio = new Audio(sound);
        audio.play();
    }, []);

    useEffect(() => {
        if (userId && !hasConnected.current) {
            hasConnected.current = true;
            socket.emit("joinRoom", userId);

            socket.on("notification", handleNewNotification);
        }
    }, [userId, handleNewNotification]);

    return { hasNewNotification, setHasNewNotification };
}
