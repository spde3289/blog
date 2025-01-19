"use client";
import PostsContainer from "@/components/post/PostsContainer";
import { getAllPostsType, getAllcategorysType } from "@/lib/markdown";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

interface PostCategoryContainerProps {
  posts: getAllPostsType;
  categorys: getAllcategorysType;
}

const PostCategoryContainer = ({
  posts,
  categorys,
}: PostCategoryContainerProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const query = searchParams.get("page") || "";

  const handelCategory = (category: string) => {
    if (category === selectedCategory) setSelectedCategory(null); // 기본 상태
    if (category !== selectedCategory) setSelectedCategory(category); // 카테고리 선택
  };

  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.category === selectedCategory)
    : posts; // 카테고리가 선택되지 않으면 모든 게시글 표시

  return (
    <>
      <div className="w-full space-y-2 flex flex-col items-center">
        <PostsContainer
          page={Number(query)}
          isPagination={true}
          title="게시글 목록"
          isCategory={selectedCategory !== null}
          postArray={filteredPosts}
        />
      </div>
      <div className="sm:w-40 lg:sticky lg:top-24 lg:h-fit w-full px-2 mb-4">
        <h2 className="">카테고리</h2>
        <div className="flex text-sm  md:text-base sm:block w-full flex-wrap gap-x-7 justify-center">
          {categorys.map((category) => (
            <div
              key={category.name}
              onClick={() => handelCategory(category.name)}
              className={`${
                selectedCategory === category.name
                  ? "bg-[rgba(43,193,188,0.1)] text-black mr-[-1em] pr-6 w-auto bg-auto-0.5rem " // 선택된 카테고리일 때 너비 확장
                  : "w-fit bg-auto-0rem " // 기본 너비 설정
              } bg-[url('/x.svg')] bg-[right_10px_center] bg-no-repeat hover:bg-[rgba(43,193,188,0.1)] items-center flex gap-1 -ml-3 max-w-max box-content cursor-pointer px-3 py-1 rounded-3xl h-fit mb-1 transition-all duration-500 ease-in-out`} // 애니메이션 적용
            >
              <span>{category.name}</span>
              <span className="text-sm"> ({category.count})</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PostCategoryContainer;
