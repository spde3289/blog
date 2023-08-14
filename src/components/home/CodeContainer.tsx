import styled from "styled-components";

interface props {
  children: JSX.Element[] | JSX.Element;
}

const CodeContainer = ({ children }: props) => {
  return (
    <Container>
      <CodeContainerHeader>
        <Dot color="#f75f59"/>
        <Dot color="#fbbe2f"/>
        <Dot color="#3acb41"/>
      </CodeContainerHeader>
      <CodeContainerMain>{children}</CodeContainerMain>
    </Container>
  );
};

const Container = styled.div`
  width: 300px;
  height: 100px;
  background-color: rgba(30, 41, 59, 1);
  border-radius: 12px;
`;

const CodeContainerHeader = styled.div`
  height: 32px;
  border-bottom: 1px solid #ffffff30;
  padding: 0 6px;
  display: flex;
  align-items: center;
`;

const Dot = styled.div<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 99999px;
  margin-left: 6px;
  background-color: ${({color})=> color};
`;

const CodeContainerMain = styled.div`
  padding: 20px 12px;
`;

export default CodeContainer;
