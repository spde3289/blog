import type { Post } from "@/types/posts.types";
import { JSX, Suspense, useCallback, useState } from "react";
import { POSTSECTION_TEXT } from "..";
import ArticleViewPost from "./ArticleViewPost";
import ListViewPost from "./ListViewPost";
import ViewModalButton from "./ViewModalButton";

interface PostSectionMainProps {
  posts: Post[];
  searchText: string;
}

export type CurrentView = {
  text: string;
  svg: JSX.Element;
};

const PostSectionMain = ({ posts, searchText }: PostSectionMainProps) => {
  const defaultViewText = POSTSECTION_TEXT.main.viewButtonItems[0].text;
  const defaultViewSvg = POSTSECTION_TEXT.main.viewButtonItems[0].svg;
  const [currentView, setCurrentView] = useState<CurrentView>({
    text: defaultViewText,
    svg: defaultViewSvg,
  });

  const handleCurrentView = useCallback((view: CurrentView) => {
    setCurrentView(view);
  }, []);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm sm:text-base">
          {posts.length} {POSTSECTION_TEXT.main.title}
        </div>
        <ViewModalButton
          currentView={currentView}
          onClick={handleCurrentView}
        />
      </div>
      <ul className="flex list-none flex-col gap-4">
        <Suspense fallback={<div>Loading...</div>}>
          {currentView.text === defaultViewText
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

export default PostSectionMain;
