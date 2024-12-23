import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface CommentInputProps {
    onSubmit: (content: string) => void;
    placeholder: string;
    initialValue?: string;
}

const CommentInput: React.FC<CommentInputProps> = ({
    onSubmit,
    placeholder,
    initialValue
}) => {
    const [content, setContent] = useState(initialValue ?? "");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            // Reset height to auto to get the correct scrollHeight
            textareaRef.current.style.height = "auto";
            // Set the height to the scrollHeight
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [content]);

    const handleSubmit = () => {
        if (content.trim()) {
            onSubmit(content);
            setContent("");
            if (textareaRef.current) {
                textareaRef.current.style.height = "auto";
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    return (
        <div className="relative">
            <Textarea
                ref={textareaRef}
                placeholder={placeholder}
                value={content}
                onChange={handleChange}
                className="pr-12 min-h-[100px] resize-none overflow-hidden"
            />
            <Button
                size="sm"
                className="absolute bottom-2 right-2 bg-primary hover:bg-primary/90"
                onClick={handleSubmit}
                disabled={!content.trim()}
            >
                <Send className="h-4 w-4" />
            </Button>
        </div>
    );
};

export default CommentInput;
