import axiosInstance from "@/lib/api";
import { type StreamedAIPayload } from "@/types/ai";

export const fetchStreamedResponse = async (
    payload: StreamedAIPayload,
    onChunkReceived: (chunk: string) => void
) => {
    const url = `/ai/generate`;

    const response = await axiosInstance.post(url, payload, {
        responseType: "stream",
        adapter: "fetch"
    });

    const reader = response.data.getReader();

    const decoder = new TextDecoder();
    let done = false;
    let chunks = "";

    while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        chunks += decoder.decode(value, { stream: true });

        onChunkReceived(chunks);

        chunks = "";
    }
};
