import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./GlobalStyled";

import { light, dark, theme } from "./theme/theme";

import Header from "./common/components/Header";
import Footer from "./common/components/Footer";
import Home from "./components/home/HomePage";
import About from "./pages/About";
import Posts from "./components/posts/PostsPage";

import content from "./postInfo";

function App() {
  const [darkMode, setDarkMode] = useState<theme>("light");

  const handleDarkMode = () => {
    if (darkMode === "dark") {
      setDarkMode("light");
    } else {
      setDarkMode("dark");
    }
  };

  return (
    <ThemeProvider theme={darkMode === "light" ? light : dark}>
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
