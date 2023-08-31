import styled from "styled-components";
import { useRef } from "react";
import { useLocation } from "react-router-dom";

interface a {
  children: any
}

const PostLayout = ({ children }: a) => {
  const { pathname } = useLocation()
  const TagList = document.getElementsByTagName("h2")
  const ref = useRef<any>()
  /* console.log(TagList[0].scrollIntoView()) */

  const menu = [];

/*   for (let i = 0; i < TagList.length; i++) {
    TagList[i]
    menu.push(<div onClick={()=>TagList[i].scrollIntoView()}>{TagList[i].innerHTML}</div>)
    console.log(TagList[i].innerText)
  } */
  console.log(ref.current)
  return (
    <>
      <A ref={ref}>
        {pathname.includes("/posts/") && <SideMenu>{}</SideMenu>}
        {children}
      </A>
    </>
  )
}

const SideMenu = styled.div`
/*   position: fixed;
  top: 200px;
  right: 10px; */
  z-index: 999;
`;
const A = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row-reverse;
`;

export default PostLayout