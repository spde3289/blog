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
    tag: "#222222",
    currentTag: "#8ab4f8",
  },
};

export const dark: themePlatte = {
  color: {
    body: "#232326",
    object: "#e6e6e6",
    font: "#e6e6e6",
    comment: "dark",
    tag: "#e6e6e6",
    currentTag: "#8ab4f8",
  },
};
