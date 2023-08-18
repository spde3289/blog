type Color = "body" | "object" | "font" | "comment" | "tag" | "currentTag";
export type theme = "dark" | "light" 

interface themePlatte {
  color: Record<Color, string>;
}

export const light: themePlatte = {
  color: {
    body: "#fff",
    object: "#222222",
    font: "#222222",
    comment: "light",
    tag: "rgba(13,12,34,.05)",
    currentTag: "#bbbbbb",
  },
};

export const dark: themePlatte = {
  color: {
    body: "#232326",
    object: "#e6e6e6",
    font: "#e6e6e6",
    comment: "dark",
    tag: "#232326",
    currentTag: "#563b56",
  },
};
