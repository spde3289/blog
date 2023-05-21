import styled from "styled-components";
import { Link } from "react-router-dom";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

interface props {
  darkMode: boolean;
  handleDarkMode(): void;
}

const Header = ({ darkMode, handleDarkMode }: props) => {
  return (
    <HeaderBar>
      <NavBar>
        <BlogName>
          <Link to='/' state={{ Title: "Home" }}>
            spde3289.github.io
          </Link>
        </BlogName>
        <HeaderMenu>
          <HeaderMenuItem>
            <Link to='/posts' state={{ Title: "Post" }}>
              posts
            </Link>
          </HeaderMenuItem>
          <HeaderMenuItem>
            <Link to='/about' state={{ Title: "About" }}>
              about
            </Link>
          </HeaderMenuItem>
          <HeaderMenuItem onClick={handleDarkMode}>
            {darkMode ? <BsFillSunFill /> : <BsFillMoonFill />}
          </HeaderMenuItem>
        </HeaderMenu>
      </NavBar>
    </HeaderBar>
  );
};

const HeaderBar = styled.header`
  height: 75px;
  margin-bottom: 70px;
  border-bottom: 0.5px solid #a8a8a8;
  display: flex;
  align-items: center;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 1000px;
  padding: 10px;
`;

const BlogName = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const HeaderMenu = styled.ul`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
`;

const HeaderMenuItem = styled.li`
  margin-right: 10px;
  &:last-child {
    margin-bottom: -3px;
  }
`;

export default Header;
