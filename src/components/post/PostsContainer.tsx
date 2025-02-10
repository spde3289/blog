"use client";

import { getAllPostsType } from "@/lib/markdown";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { RiArrowLeftWideLine, RiArrowRightWideLine } from "react-icons/ri";
import PageButton from "./PageButton";
import PostItem from "./PostItem";

interface PostContainerProps {
  title: string;
  postArray: getAllPostsType; // 원본 배열
  children?: ReactNode;
  isPagination?: boolean; // 페이지네이션 기능 활성화
  page?: number;
  isCategory?: boolean;
  category?: string | null;
}

const maxPost = 5; // 한번에 보여줄 게시글 개수
const maxButton = 5; // 한번에 보여줄 버튼 개수

const PostsContainer = ({
  postArray,
  title,
  children,
  isPagination = false,
  page,
  isCategory,
  category,
}: PostContainerProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    currentButton: 1,
  });

  // page 파라미터로 페이지 이동
  useEffect(() => {
    if (page) {
      setPagination({
        currentPage: page,
        currentButton:
          Math.ceil(page / maxButton) * maxButton - (maxButton - 1),
      });
    }
    if (page === 0) {
      setPagination({
        currentPage: 1,
        currentButton: 1,
      });
    }
  }, [page]);

  // 카테고리 변경시 1페이지로 초기화
  useEffect(() => {
    const currentParams = new URLSearchParams(searchParams);
    if (isCategory && pathname === "/posts") {
      setPagination({
        currentPage: 1,
        currentButton: 1,
      });
      currentParams.set("page", `1`);
      currentParams.set("category", `${category}`);

      router.push(`/posts?${currentParams.toString()}`, {
        scroll: false,
      });
    }
    if (!isCategory && pathname === "/posts") {
      currentParams.delete("category");
      router.push(`/posts?${currentParams.toString()}`, {
        scroll: false,
      });
    }
  }, [category]);

  // 페이지 파라미터
  const routerHandler = (num: number) => {
    const currentParams = new URLSearchParams(searchParams);
    // 새로운 쿼리 파라미터 추가
    currentParams.set("page", `${num}`);

    if (pathname === "/posts") {
      router.push(`/posts?${currentParams.toString()}`, {
        scroll: false,
      });
    }
    if (pathname === "/search") {
      // URL 업데이트
      router.push(`/search?${currentParams.toString()}`, {
        scroll: false,
      });
    }
  };

  // 최대 버튼 개수 생성
  const tatalPageButton = Math.ceil(postArray.length / maxPost);
  const arr = [...new Array(tatalPageButton)].map((_, i) => i + 1);

  // 보여지는 게시글
  const currentPosts = postArray.slice(
    (pagination.currentPage - 1) * maxPost,
    maxPost + (pagination.currentPage - 1) * maxPost
  );
  // 보여지는 버튼
  const button = [...arr].slice(
    pagination.currentButton - 1,
    maxButton + (pagination.currentButton - 1)
  );

  // 페이지 핸들러
  const handelPage = (page: number) => {
    setPagination((pre) => ({ ...pre, currentPage: page }));
    routerHandler(page);
  };

  // 버튼 핸들러
  const handelButton = (direction: string) => {
    if (direction === "next") {
      const nextButton = pagination.currentButton + maxButton;

      if (nextButton <= tatalPageButton) {
        setPagination({
          currentPage: nextButton,
          currentButton: nextButton,
        });
        routerHandler(nextButton);
      }
    }

    if (direction === "pre") {
      const prevButton = pagination.currentButton - maxButton;

      if (prevButton > 0) {
        setPagination({
          currentPage: prevButton,
          currentButton: prevButton,
        });
        routerHandler(prevButton);
      }
    }
  };

  return (
    <>
      <div className="flex w-10/12 lg:w-8/12 justify-between items-end">
        <h2 className="">{title}</h2>
        {children}
      </div>
      {currentPosts.map((post) => (
        <PostItem post={post} key={post.metadata.title} />
      ))}
      {isPagination && (
        <div className="pt-10 flex gap-3 sm:gap-6 items-center justify-center text-base">
          <PageButton
            abled={pagination.currentButton === 1}
            handelButton={handelButton}
            arrow="pre"
          >
            <RiArrowLeftWideLine style={{ strokeWidth: 1 }} />
          </PageButton>
          {button.map((button) => (
            <button
              className={`${
                button === pagination.currentPage
                  ? "bg-[rgb(53,54,56)] rounded-full text-white"
                  : ""
              } w-8 h-8`}
              onClick={() => handelPage(button)}
              disabled={button === pagination.currentPage}
              key={button}
            >
              <div className="mb-[3px]">{button}</div>
            </button>
          ))}
          <PageButton
            abled={pagination.currentButton + maxButton > tatalPageButton}
            handelButton={handelButton}
            arrow="next"
          >
            <RiArrowRightWideLine style={{ strokeWidth: 1 }} />
          </PageButton>
        </div>
      )}
    </>
  );
};

export default PostsContainer;
