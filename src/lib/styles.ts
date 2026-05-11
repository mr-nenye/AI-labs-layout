import type { WebpageStyle } from "./types";

export const WEBPAGE_STYLES: WebpageStyle[] = [
  { id: "immersive", label: "Immersive", thumb: "/icons/style-immersive.jpg" },
  { id: "minimal", label: "Minimal", thumb: "/icons/style-minimal.jpg" },
  { id: "brutalism", label: "Brutalism bold", thumb: "/icons/style-brutalism.jpg" },
  { id: "retro", label: "Retro Vintage", thumb: "/icons/style-retro.jpg" },
];

export const VIDEO_STYLE_OPTIONS = [
  { id: "cinematic", label: "Cinematic", swatch: "linear-gradient(135deg,#1f1f1f,#3d3d3d)" },
  { id: "whiteboard", label: "Whiteboard", swatch: "linear-gradient(135deg,#fafafa,#dedede)" },
  { id: "animated", label: "Animated", swatch: "linear-gradient(135deg,#f59e7a,#ad5a3a)" },
  { id: "documentary", label: "Documentary", swatch: "linear-gradient(135deg,#2c4cff,#88d4ff)" },
];

export const VIDEO_VOICE_OPTIONS = [
  { id: "aria", label: "Aria", swatch: "linear-gradient(135deg,#ff7e5e,#e8543a)" },
  { id: "liam", label: "Liam", swatch: "linear-gradient(135deg,#4d63ff,#3447d4)" },
  { id: "sage", label: "Sage", swatch: "linear-gradient(135deg,#4ed884,#2cc068)" },
  { id: "theo", label: "Theo", swatch: "linear-gradient(135deg,#a78bfa,#6d28d9)" },
];
