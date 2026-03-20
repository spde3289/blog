import { DOMNode } from "html-react-parser";

export const getTextContent = (node: DOMNode): string => {
  if (node.type === "text" && "data" in node) {
    return node.data as string;
  }

  if ("children" in node && Array.isArray(node.children)) {
    return node.children
      .map((child) => getTextContent(child as DOMNode))
      .join("");
  }

  return "";
};
