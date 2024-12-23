import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as cheerio from "cheerio";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Debounces a function, ensuring it waits for a specified duration before executing.
 *
 * This function is useful for optimizing performance in scenarios where a function
 * should not be called too frequently, such as when handling user input or resizing the window.
 *
 * @template T - The type of the function to debounce.
 *
 * @param func - The function to debounce.
 * @param wait - The duration in milliseconds to wait before executing the debounced function.
 *
 * @returns A debounced version of the input function.
 */
export function debounce<T extends (...args: unknown[]) => void>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;
    return (...args: Parameters<T>) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

/**
 * Formats a date string into a human-readable format.
 *
 * This function takes a date string in any format and returns a formatted date string
 * in the format "DD Month YYYY".
 *
 * @param dateStr - The date string to be formatted.
 *
 * @returns A formatted date string in the format "DD Month YYYY".
 */
export function formatDateTime(dateStr: string): string {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("en-GB", { month: "long" });
    const year = date.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;

    return formattedDate;
}

/**
 * Calculates the estimated reading time based on the HTML content of a blog.
 * Excludes images, videos, audio, and links from the word count.
 * Rounds the estimated reading time to the nearest 0.5 minute.
 * @param htmlContent - The HTML content of the blog post.
 * @returns Estimated reading time in minutes.
 */
export function calculateReadingTime(htmlContent: string): number {
    // Load the HTML content using cheerio
    const $ = cheerio.load(htmlContent);

    // Remove non-text elements (images, videos, audio, and links)
    $("img, video, audio, a").remove();

    // Extract the plain text content from the HTML
    const text = $("body").text(); // You can adjust the selector to be more specific if needed

    // Count words in the extracted text using a regular expression
    const wordCount = text.split(/\s+/).filter(Boolean).length;

    // Assume average reading speed is 200 words per minute
    const wordsPerMinute = 200;

    // Calculate the reading time and round it to the nearest 0.25 minute
    const readingTime = Math.round((wordCount / wordsPerMinute) * 4) / 4;

    return readingTime;
}

/**
 * Constructs a Facebook share URL for a given URL and title.
 *
 * @param url - The URL to be shared on Facebook.
 * @param title - The title of the content being shared.
 *
 * @returns A string representing the Facebook share URL.
 */
export function constructFacebookShareUrl(url: string, title: string): string {
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`;
}

/**
 * Constructs a Twitter share URL for a given URL and title.
 *
 * @remarks
 * This function generates a URL that can be used to share content on Twitter.
 * The generated URL includes the provided `url` and `title` parameters, encoded
 * to ensure they are properly formatted for use in a URL.
 *
 * @param url - The URL to be shared on Twitter.
 * This parameter should be a valid URL string.
 *
 * @param title - The title of the content being shared.
 * This parameter should be a string that will be displayed as the tweet's text.
 *
 * @returns A string representing the Twitter share URL.
 * The returned URL can be used to open a new browser tab or window with the
 * Twitter share interface pre-populated with the provided `url` and `title`.
 */
export function constructTwitterShareUrl(url: string, title: string): string {
    return `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
}

/**
 * Constructs a LinkedIn share URL for a given URL and title.
 *
 * @remarks
 * This function generates a URL that can be used to share content on LinkedIn.
 * The generated URL includes the provided `url` and `title` parameters, encoded
 * to ensure they are properly formatted for use in a URL.
 *
 * @param url - The URL to be shared on LinkedIn.
 * This parameter should be a valid URL string.
 *
 * @param title - The title of the content being shared.
 * This parameter should be a string that will be displayed as the LinkedIn post's title.
 *
 * @returns A string representing the LinkedIn share URL.
 * The returned URL can be used to open a new browser tab or window with the
 * LinkedIn share interface pre-populated with the provided `url` and `title`.
 */
export function constructLinkedInShareUrl(url: string, title: string): string {
    return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
}
