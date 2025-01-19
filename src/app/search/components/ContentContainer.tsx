"use client";
import PostsContainer from "@/components/post/PostsContainer";
import { getAllPostsType } from "@/lib/markdown";
import { useSearchParams } from "next/navigation";

interface ContentContainerProps {
  posts: getAllPostsType;
  // categorys: getAllcategorysType;
}

const ContentContainer = ({ posts }: ContentContainerProps) => {
  // const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const pageQuery = searchParams.get("page") || "";

  // const handelCategory = (category: string) => {
  //   if (category === selectedCategory) setSelectedCategory(null); // 기본 상태
  //   if (category !== selectedCategory) setSelectedCategory(category); // 카테고리 선택
  // };

  // const filteredPosts = selectedCategory
  //   ? posts.filter((post) => post.category === selectedCategory)
  //   : posts; // 카테고리가 선택되지 않으면 모든 게시글 표시

  const searchPosts = posts.filter((post) =>
    post.metadata.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <div className="w-full space-y-2 flex flex-col items-center">
        <PostsContainer
          page={Number(pageQuery)}
          isPagination={true}
          title="검색 게시글 목록"
          // isCategory={selectedCategory !== null}
          postArray={searchPosts}
        >
          <div className="text-sm font-medium">
            총 ({searchPosts.length}) 개
          </div>
        </PostsContainer>
      </div>
      {/* <div className="w-40 sticky top-24 h-fit">
        <h2 className="">카테고리</h2>
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
      </div> */}
    </>
  );
};

export default ContentContainer;
