import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./GlobalStyled";

import { light, dark } from "./theme";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Posts from "./pages/Posts";

import content from "./postInfo";

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const theme = darkMode ? light : dark;
  const location = useLocation();
  useEffect(() => {
    if (location.state !== null) {
      const htmlTitle: HTMLTitleElement | null = document.querySelector("title");
      if (htmlTitle) {
        htmlTitle.innerHTML = location.state.Title;
      }
    }
  }, [location.state]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header darkMode={darkMode} handleDarkMode={handleDarkMode} />
      <Routes>
        <Route path='/blog' element={<Home />} />
        <Route path='/blog/about' element={<About />} />
        <Route path='/blog/posts'>
          <Route path='/blog/posts' element={<Posts />} />
          {content.map((post) => (
            <Route key={post.key} path={post.link} element={post.element} />
          ))}
        </Route>
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
