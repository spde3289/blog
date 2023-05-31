type Color = 
  | "body" 
  | "font"
  | "comment"
  | "tag"
  | "currentTag";

interface themePlatte{
  color: Record<Color, string>;
}

export const light: themePlatte = {
  color: {
    body: "#fff",
    font: "#222222",
    comment: "light",
    tag: "rgba(13,12,34,.05)",
    currentTag: "#bbbbbb",
  }
};

export const dark: themePlatte = {
  color: {
    body: "#232326",
    font: "#e6e6e6",
    comment: "dark",
    tag: "#232326",
    currentTag: "#563b56",
  },
};