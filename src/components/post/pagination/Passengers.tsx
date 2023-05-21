import React, { useState, useMemo } from "react";
import Pagination from "./Pagination";
import postInfo from "../../../postInfo";

const Passengers = ({ value, tag }) => {
  const maxPageNumber = 5;
  const [contentList, setContentList] = useState(postInfo);
  const [newList, setNewList] = useState(contentList);
  const [pageDate, setPageDate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageLimit, setMaxPageLimit] = useState(5);
  const [minPageLimit, setMinPageLimit] = useState(0);
  const totalPages = Math.ceil(newList.length / maxPageNumber);

  useMemo(() => {
    if (value === null) {
      setCurrentPage(1);
      setNewList(contentList);
    } else {
      setCurrentPage(1);
      setNewList(
        contentList.filter((list) => list.title.toLowerCase().includes(value.toLowerCase()))
      );
    }
  }, [value, contentList]);

  useMemo(() => {
    tag === "all"
      ? setContentList(postInfo)
      : setContentList(postInfo.filter((el) => el.category === tag));
  }, [tag]);

  useMemo(() => {
    setPageDate([...newList].reverse().slice(currentPage * 5 - 5, currentPage * 5));
    setLoading(false);
  }, [currentPage, newList]);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const onPrevClick = () => {
    if ((currentPage - 1) % maxPageNumber === 0) {
      setMaxPageLimit(maxPageLimit - maxPageNumber);
      setMinPageLimit(minPageLimit - maxPageNumber);
    }
    setCurrentPage((prev) => prev - 1);
  };
  const onNextClick = () => {
    if (currentPage + 1 > maxPageLimit) {
      setMaxPageLimit(maxPageLimit + maxPageNumber);
      setMinPageLimit(minPageLimit + maxPageNumber);
    }
    setCurrentPage((prev) => prev + 1);
  };

  const pageInfo = {
    pageDate,
    currentPage,
    maxPageLimit,
    minPageLimit,
    totalPages,
  };

  return (
    <>
      {!loading ? (
        <Pagination
          {...pageInfo}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          onPageChange={onPageChange}
        />
      ) : (
        <div />
      )}
    </>
  );
};

export default Passengers;
