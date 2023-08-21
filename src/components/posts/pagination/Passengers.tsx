import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import postInfo from "@/pages/postPageInfo/postInfo";

type props = {
  value: string;
  tag: string;
};

const Passengers = ({ value, tag }: props) => {
  const maxPageNumber = 5;
  const newPostList = [...postInfo]
  const [pageData, setPageData] = useState(newPostList);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageLimit, setMaxPageLimit] = useState(5);
  const [minPageLimit, setMinPageLimit] = useState(0);
  const totalPages = Math.ceil(pageData.length / maxPageNumber);

  useEffect(() => {
    if (tag === "all") {
      const filterList = newPostList.filter(list =>
        list.title.toLowerCase().includes(value.toLowerCase())).reverse();
      setPageData(filterList);
    } else if (tag !== "all") {
      const filterList = newPostList.filter(list =>
        list.title.toLowerCase().includes(value.toLowerCase()) &&
        list.category === tag).reverse();
      setPageData(filterList);
    }
    setLoading(false);
  }, [tag, value, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    setMaxPageLimit(5);
    setMinPageLimit(0);
  }, [tag, value]);

  const onPageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  const onPrevClick = (): void => {
    if ((currentPage - 1) % maxPageNumber === 0) {
      setMaxPageLimit(maxPageLimit - maxPageNumber);
      setMinPageLimit(minPageLimit - maxPageNumber);
    }
    setCurrentPage((prev) => prev - 1);
  };
  const onNextClick = (): void => {
    if (currentPage + 1 > maxPageLimit) {
      setMaxPageLimit(maxPageLimit + maxPageNumber);
      setMinPageLimit(minPageLimit + maxPageNumber);
    }
    setCurrentPage((prev) => prev + 1);
  };

  const pageInfo = {
    pageData,
    currentPage,
    maxPageLimit,
    minPageLimit,
    totalPages,
    onPrevClick,
    onNextClick,
    onPageChange
  };

  return <>
    {!loading && <Pagination {...pageInfo} />}
    {loading && <div />}
  </>;
};

export default Passengers;
