
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

interface props {
  darkMode: boolean;
  handleDarkMode(): void;
}


const Header = ({ darkMode, handleDarkMode }: props) => {
  
  const pathName = location.pathname.split("/");
  const currentPathName = pathName[pathName.length - 1]

  return (
    <HeaderBar>
      <BlogName>
        <Link to='/' state={{ Title: "Home" }}>
          spde3289.github.io
        </Link>
      </BlogName>
      <Nav>
        <HeaderMenu>
          <HeaderMenuItem>
            <Link to='/posts' state={{ Title: "Posts" }}>
              Posts
            </Link>
          </HeaderMenuItem>
          <HeaderMenuItem>
            <Link to='/about' state={{ Title: "About" }}>
              About
            </Link>
          </HeaderMenuItem>
        </HeaderMenu>
        <div className="Icon" onClick={handleDarkMode}>
          {darkMode ? <BsFillSunFill /> : <BsFillMoonFill />}
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
    width: 100%;
    height: 3px;
  }
  &:hover{
    a::after{
      background-color: rgba(0, 0, 0, 1);

    }
  }
`;

export default Header;
