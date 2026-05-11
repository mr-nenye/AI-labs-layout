export type ViewId =
  | "landing"
  | "article"
  | "slides"
  | "webpage"
  | "video"
  | "interactive";

export type ModeId = Exclude<ViewId, "landing">;

export type Status = "idle" | "loading" | "done";

export type Revision = { role: "user" | "assistant"; text: string };

export type StyleId = "freestyle" | "summarised" | "academic" | "minimal";

export type VideoOptions = {
  ratio?: string;
  duration?: string;
  style?: string;
  voice?: string;
  accent?: string;
};

export type WebpageStyleId = "immersive" | "minimal" | "brutalism" | "retro";

export type WebpageStyle = {
  id: WebpageStyleId;
  label: string;
  thumb: string;
};
