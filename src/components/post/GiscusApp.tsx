import styled, { useTheme } from "styled-components";
import Giscus from "@giscus/react";

export default function GiscusApp() {
  const theme = useTheme();

  return (
    <Container>
      <Giscus
        id='comments'
        repo='spde3289/blog'
        repoId='R_kgDOJkAFdA'
        category='General'
        categoryId='DIC_kwDOJkAFdM4CWimU'
        mapping='pathname'
        term='Welcome to @giscus/react component!'
        reactionsEnabled='1'
        emitMetadata='0'
        inputPosition='bottom'
        theme={theme.color.comment}
        lang='ko'
        loading='lazy'
      />
    </Container>
  );
}

const Container = styled.div`
  width: 800px;
  margin-top: 50px;
`;
