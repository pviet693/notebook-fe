import { Facebook, Github, Globe, Instagram, Twitter, Youtube } from "lucide-react";

export const socials: (
    | "youtube"
    | "instagram"
    | "facebook"
    | "twitter"
    | "github"
    | "website"
)[] = ["facebook", "instagram", "twitter", "github", "youtube", "website"];

export const social_icons = {
    youtube: Youtube,
    instagram: Instagram,
    facebook: Facebook,
    twitter: Twitter,
    github: Github,
    website: Globe
}