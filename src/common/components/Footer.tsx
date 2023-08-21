import styled from "styled-components";
import { AiFillGithub, AiOutlineMail } from "react-icons/ai";
import { IoLogoInstagram } from "react-icons/io";

const Footer = () => {
  return (
    <FooterBar>
      <Footerinfo>
        <Link href='mailto:spde3289@naver.com'>
          <AiOutlineMail className='Icon' size='28' />
        </Link>
      </Footerinfo>
      <Footerinfo>
        <Link href='https://github.com/spde3289'>
          <AiFillGithub className='Icon' size='28' />
        </Link>
      </Footerinfo>
      <Footerinfo>
        <Link href='https://www.instagram.com/98._.hun/'>
          <IoLogoInstagram className='Icon' size='28' />
        </Link>
      </Footerinfo>
    </FooterBar>
  );
};

const FooterBar = styled.footer`
  display: flex;
  width: 1000px;
  justify-content: flex-end;
  padding: 40px 20px;
  margin: 0 auto;
  .title {
    padding-bottom: 10px;
  };
`;

const Footerinfo = styled.p`
  font-size: 15px;
  .Icon {
    padding: 8px;
  };
`;

const Link = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Footer;
