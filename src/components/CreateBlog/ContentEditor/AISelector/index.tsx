import { Command, CommandInput } from "@/components/ui/command";

import { ArrowUp } from "lucide-react";
import { useEditor } from "novel";
import { addAIHighlight } from "novel/extensions";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import AICompletionCommands from "@/components/CreateBlog/ContentEditor/AICompletionCommands";
import AISelectorCommands from "@/components/CreateBlog/ContentEditor/AISelectorCommands";
import CrazySpinner from "@/components/icons/CrazySpinner";
import Magic from "@/components/icons/Magic";
import useStreamCompletion from "@/hooks/ai/useStreamCompletion";

interface AISelectorProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AISelector({ onOpenChange }: AISelectorProps) {
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const { editor } = useEditor();
    const [inputValue, setInputValue] = useState("");

    const { completion, startStream, isLoading } = useStreamCompletion();

    const hasCompletion = completion?.length > 0;

    useEffect(() => {
        if (scrollAreaRef.current) {
            const scrollContainer = scrollAreaRef.current.querySelector(
                "[data-radix-scroll-area-viewport]"
            );
            if (scrollContainer) {
                scrollContainer.scrollTop = scrollContainer.scrollHeight;
            }
        }
    }, [completion]);

    return (
        <Command className="w-[350px] md:w-[450px] lg:w-[540px]">
            {hasCompletion && (
                <div className="flex max-h-[400px] w-full">
                    <ScrollArea ref={scrollAreaRef} className="w-full">
                        <div className="prose p-2 px-4 prose-sm w-full">
                            <Markdown>{completion}</Markdown>
                        </div>
                    </ScrollArea>
                </div>
            )}

            {isLoading && (
                <div className="flex h-12 w-full items-center px-4 text-sm font-medium text-primary">
                    <Magic className="mr-2 h-4 w-4 shrink-0  " />
                    AI is thinking
                    <div className="ml-2 mt-1">
                        <CrazySpinner />
                    </div>
                </div>
            )}
            {!isLoading && (
                <>
                    <div className="relative">
                        <CommandInput
                            value={inputValue}
                            onValueChange={setInputValue}
                            autoFocus
                            placeholder={
                                hasCompletion
                                    ? "Tell AI what to do next"
                                    : "Ask AI to edit or generate..."
                            }
                            onFocus={() => addAIHighlight(editor!)}
                        />
                        <Button
                            size="icon"
                            type="button"
                            className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-primary hover:opacity-90"
                            onClick={() => {
                                if (completion) {
                                    startStream({
                                        option: "zap",
                                        command: inputValue,
                                        prompt: completion
                                    }).then(() => setInputValue(""));
                                } else {
                                    const slice =
                                        editor!.state.selection.content();
                                    const text =
                                        editor!.storage.markdown.serializer.serialize(
                                            slice.content
                                        );

                                    startStream({
                                        option: "zap",
                                        command: inputValue,
                                        prompt: text
                                    }).then(() => setInputValue(""));
                                }
                            }}
                        >
                            <ArrowUp className="h-4 w-4" />
                        </Button>
                    </div>
                    {hasCompletion ? (
                        <AICompletionCommands
                            onDiscard={() => {
                                editor!.chain().unsetHighlight().focus().run();
                                onOpenChange(false);
                            }}
                            completion={completion}
                        />
                    ) : (
                        <AISelectorCommands
                            onSelect={(value, option) =>
                                startStream({ option, prompt: value })
                            }
                        />
                    )}
                </>
            )}
        </Command>
    );
}
