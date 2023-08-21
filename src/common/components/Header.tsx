import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { theme } from "@/theme/theme";

interface props {
  darkMode: theme;
  handleDarkMode(): void;
}

const Header = ({ darkMode, handleDarkMode }: props) => {
  
  const { pathname } = useLocation();

  return (
    <HeaderBar>
      <BlogName>
        <Link to='/'>
          spde3289.github.io
        </Link>
      </BlogName>
      <Nav>
        <HeaderMenu>
          <HeaderMenuItem>
            <Wrapper to='/posts' data-selected={pathname === "/posts"}>
              Posts
            </Wrapper>
          </HeaderMenuItem>
          <HeaderMenuItem>
            <Wrapper to='/about'  data-selected={pathname === "/about"}>
              About
            </Wrapper>
          </HeaderMenuItem>
          <HeaderMenuItem>
            <Wrapper to='/archives'  data-selected={pathname === "/archives"}>
              Archives
            </Wrapper>
          </HeaderMenuItem>
        </HeaderMenu>
        <div className="Icon" onClick={handleDarkMode}>
          {darkMode === "light" && <BsFillSunFill />}
          {darkMode === "dark" && <BsFillMoonFill />}
        </div>
      </Nav>
    </HeaderBar>
  );
};

const HeaderBar = styled.header`
  height: 88px;
  display: flex;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 999;
  align-items: center;
  background-color: ${({ theme }) => theme.color.body};
`;

const BlogName = styled.h1`
  font-size: 22px;
  font-weight: bold;
  margin-left: 32px;
`;

const Nav = styled.nav`
  display: flex;
  .Icon{
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 40px;
    top: 26px;
    width: 36px;
    height: 36px;
    &:hover{
      border-radius: 999px;
      background-color: rgba(138, 129, 129, 0.3);
    }
  }
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
  a{
    position: relative;
  }
  a::after{
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0px;
    height: 3px;
  }
  &:hover{
    a::after{
      width: 100%;
      transition: all 0.4s ease-in-out 0s;
      background-color: ${({ theme }) => theme.color.object};
    }
  }
`;

const Wrapper = styled(Link)`
  &[data-selected="true"] {
    &::after{
      width: 100%;
      background-color: ${({ theme }) => theme.color.object};
    }
  }
`;

export default Header;
