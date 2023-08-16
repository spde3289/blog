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
      <BlogName>
        <Link to='/' state={{ Title: "Home" }}>
          spde3289.github.io
        </Link>
      </BlogName>
      <nav>
        <HeaderMenu>
          <HeaderMenuItem>
            <Link to='/posts' state={{ Title: "Post" }}>
              Posts
            </Link>
          </HeaderMenuItem>
          <HeaderMenuItem>
            <Link to='/about' state={{ Title: "About" }}>
              About
            </Link>
          </HeaderMenuItem>
          <HeaderMenuItem onClick={handleDarkMode}>
            {darkMode ? <BsFillSunFill /> : <BsFillMoonFill />}
          </HeaderMenuItem>
        </HeaderMenu>
      </nav>
    </HeaderBar>
  );
};

const HeaderBar = styled.header`
  height: 88px;
  width: 100vw;
  display: flex;
  position: -webkit-sticky;
  position: sticky;  
  top: 0;
  left: 0;
  z-index: 999;
  align-items: center;
  background-color: ${({ theme }) => theme.color.body};

  //background-color: #fff;
`;

const BlogName = styled.h1`
  font-size: 22px;
  font-weight: bold;
  margin-left: 32px;
`;

const HeaderMenu = styled.ul`
  display: flex;
  align-items: center;
  font-size: 17px;
  font-weight: bold;
  margin-left: 32px;
`;

const HeaderMenuItem = styled.li`
  padding: 0 20px;
  &:last-child {
    margin-bottom: -3px;
  }
`;

export default Header;
