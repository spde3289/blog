import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./GlobalStyled";

import { light, dark } from "./theme/theme";

import Header from "./common/components/Header";
import Footer from "./common/components/Footer";
import Home from "./components/home/HomePage";
import About from "./pages/About";
import Posts from "./components/posts/PostsPage";

import content from "./postInfo";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };

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
    <ThemeProvider theme={darkMode ? light : dark}>
      <GlobalStyle />
      <Header darkMode={darkMode} handleDarkMode={handleDarkMode} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/posts'>
          <Route path='/posts' element={<Posts />} />
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
