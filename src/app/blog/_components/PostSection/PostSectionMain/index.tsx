import { getAllPostsType } from "@/lib/markdown";
import { memo, Suspense, useCallback, useState } from "react";
import ArticleViewPost from "./ArticleViewPost";
import ListViewPost from "./ListViewPost";
import ViewModalButton from "./ViewModalButton";

interface PostSectionMainProps {
  posts: getAllPostsType;
  searchText: string;
}

const PostSectionMain = ({ posts, searchText }: PostSectionMainProps) => {
  const [currentView, setCurrentView] = useState<"목록 보기" | "본문 보기">(
    "목록 보기"
  );

  const handleCurrentView: React.MouseEventHandler<HTMLDivElement> =
    useCallback((e) => {
      const target = e.target as HTMLElement;
      if (
        target.textContent === "목록 보기" ||
        target.textContent === "본문 보기"
      ) {
        setCurrentView(target.textContent);
      }
    }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm sm:text-base">{posts.length} articles</div>
        <ViewModalButton
          currentView={currentView}
          onClick={handleCurrentView}
        />
      </div>
      <ul className="flex flex-col gap-4">
        <Suspense fallback={<div>Loading...</div>}>
          {currentView === "목록 보기"
            ? posts.map((post) => (
                <ListViewPost
                  key={post.metadata.title}
                  post={post}
                  searchText={searchText}
                />
              ))
            : posts.map((post) => (
                <ArticleViewPost
                  key={post.metadata.title}
                  post={post}
                  searchText={searchText}
                />
              ))}
        </Suspense>
      </ul>
    </div>
  );
};

export default memo(PostSectionMain);
