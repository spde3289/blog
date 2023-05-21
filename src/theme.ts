export interface Theme {
  color: {
    body: string;
    font: string;
    comment: string;
    tag: string;
    currentTag: string;
  };
}

export const light: Theme = {
  color: {
    body: "#fff",
    font: "#000",
    comment: "light",
    tag: "rgba(13,12,34,.05)",
    currentTag: "#bbbbbb",
  },
};

export const dark: Theme = {
  color: {
    body: "#232326",
    font: "#e6e6e6",
    comment: "dark",
    tag: "#232326",
    currentTag: "#563b56",
  },
};
