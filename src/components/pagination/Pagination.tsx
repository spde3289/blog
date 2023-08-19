import { useState, useMemo } from "react";
import styled from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import PostBox from "../posts/post/PostBox";

type pageData = {
    key: number;
    title: string;
    body: string;
    date: string;
    category: string;
    link: string;
    element: JSX.Element;
  }

interface props {
  currentPage: number;
  maxPageLimit: number;
  minPageLimit: number;
  totalPages: number;
  pageData: pageData[];
  onPrevClick: () => void;
  onNextClick: () => void;
  onPageChange: (e: number) => void;
};

const Pagination = (props: props) => {
  const { currentPage, maxPageLimit, minPageLimit, totalPages, pageData, onPrevClick, onNextClick, onPageChange } = props
  const [currentNum, setCurrentNum] = useState(1);
  const count: number = pageData.length;

  useMemo(() => {
    setCurrentNum(currentPage);
  }, [currentPage]);

  const page: number[] = [];

  for (let i = 1; i <= totalPages; i++) {
    page.push(i);
  }

  const handlePrevClick = () => {
    if (currentPage !== page[0]) {
      onPrevClick();
    }
  };

  const handleNextClick = () => {
    if (currentPage !== page[page.length - 1]) {
      onNextClick();
    }
  };

  const handlePageClick = (e: number) => {
    onPageChange(e);
  };

  return (
    <>
      {count === 0 ? (
        <NotFound>검색결과가 없습니다.</NotFound>
      ) : (
        <ContentPoint>
          <PostColumn>
            {pageData.slice(currentPage * 5 - 5, currentPage * 5).map((data) => (
              <PostBox key={data.key} title={data.title} body={data.body} date={data.date} category={data.category} link={data.link} />
            ))}
          </PostColumn>
          <Pages>
            <PageBtn onClick={handlePrevClick}>
              <AiOutlineLeft />
            </PageBtn>
            <Number>
              {page.map((page) =>
                page <= maxPageLimit && page > minPageLimit ? (
                  <Page key={page} onClick={() => handlePageClick(page)} scale={currentNum === page ? "1.2" : "1"}>
                    {page}
                  </Page>
                ) : null
              )}
            </Number>
            <PageBtn onClick={handleNextClick}>
              <AiOutlineRight />
            </PageBtn>
          </Pages>
        </ContentPoint>
      )}
    </>
  );
};

const ContentPoint = styled.div`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin: 0 auto;
`;


const PostColumn = styled.div`
  min-height: 812px;
  overflow: hidden;
`;

const Pages = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  li:hover {
    cursor: pointer;
  }
`;

const Number = styled.div`
  display: flex;
`;

const Page = styled.li<{ scale: string }>`
  color: ${({ theme }) => theme.color.font};
  scale: ${({ scale }) => scale};
  margin: 5px;
  width: 20px;
  text-align: center;
`;

const PageBtn = styled.div`
  color: ${({ theme }) => theme.color.font};
  cursor: pointer;
  margin-bottom: -4px;
`;

const NotFound = styled.div`
  text-align: center;
`;

export default Pagination;
