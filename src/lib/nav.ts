import type { ModeId } from "./types";

export type NavItem = {
  id: ModeId;
  label: string;
  icon: string;
};

export const NAV_ITEMS: NavItem[] = [
  { id: "article", label: "Article", icon: "/icons/article.svg" },
  { id: "slides", label: "Slides", icon: "/icons/slides.svg" },
  { id: "webpage", label: "Webpage", icon: "/icons/webpage.svg" },
  { id: "video", label: "Video", icon: "/icons/video.svg" },
  { id: "interactive", label: "Interactive lesson", icon: "/icons/interactive.svg" },
];

export const PLACEHOLDERS: Record<ModeId, string> = {
  article: "Ask anything or describe what to create",
  slides: "Turn your course into stunning slides",
  webpage: "Describe the website you want to build",
  video: "Turn your course into stunning slides",
  interactive: "Describe an interactive lesson",
};
