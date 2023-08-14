import styled from "styled-components";
import { AiFillGithub, AiOutlineMail } from "react-icons/ai";
import { IoLogoInstagram } from "react-icons/io";

const Footer = () => {
  return (
    <FooterBar>
      <h2 className='title'>Contact Information</h2>
      <Footerinfo>
        <a href='mailto:spde3289@naver.com'>
          <AiOutlineMail className='Icon' size='24' />
          spde3289@naver.com
        </a>
      </Footerinfo>
      <Footerinfo>
        <a href='https://github.com/spde3289'>
          <AiFillGithub className='Icon' size='24' />
          spde3289
        </a>
      </Footerinfo>
      <Footerinfo>
        <a href='https://www.instagram.com/98._.hun/'>
          <IoLogoInstagram className='Icon' size='24' />
          98._.hun
        </a>
      </Footerinfo>
    </FooterBar>
  );
};

const FooterBar = styled.footer`
  width: 1000px;
  margin: 0 auto;
  margin-top: 50px;
  padding: 40px 30px 30px 50px;
  .title {
    padding-bottom: 10px;
  }
`;

const Footerinfo = styled.p`
  font-size: 15px;
  margin-right: 10px;
  margin-bottom: 10px;
  .Icon {
    margin-bottom: -7px;
    margin-right: 5px;
  }
`;

export default Footer;
