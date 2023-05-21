import { useState, useEffect } from "react";

const useTitle = () => {
  const [title, setTitle] = useState("Home");

  const updateTitle = () => {
    const htmlTitle = document.querySelector("title");
    htmlTitle.innerHTML = title;
  };
  useEffect(updateTitle, [title]);

  return setTitle;
};

export default useTitle;
