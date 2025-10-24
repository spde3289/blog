"use client";

import useDebouncedValue from "@/hooks/useDebouncedValue";
import { getAllPostsType, getAllcategorysType } from "@/lib/markdown";
import ArrowHeadSVG from "@/svg/ArrowHeadSVG";
import ArticleSVG from "@/svg/ArticleSVG";
import ListSVG from "@/svg/ListSVG";
import SearchSVG from "@/svg/SearchSVG";
import { useCallback, useMemo, useState } from "react";
import PostSectionHeader from "./PostSectionHeader";
import PostSectionMain from "./PostSectionMain";

export type Sort = "최신순" | "시간순";
export type View = "목록보기" | "상세보기";

export const POSTSECTION_TEXT = {
  header: {
    search: {
      placeholder: "Search",
      svg: (
        <SearchSVG className="size-8 absolute pointer-events-none top-0 left-0 pl-2 text-neutral-400 dark:text-neutral-600" />
      ),
    },
    categoryButton: {
      text: "카테고리",
      svg: <ArrowHeadSVG className="size-5" />,
    },
    sortButton: {
      text: "정렬",
      svg: <ArrowHeadSVG className="size-5" />,
      sort: ["최신순", "시간순"],
    },
  },
  main: {
    title: "게시글",
    viewButtonItems: [
      {
        text: "목록보기",
        svg: <ListSVG className="size-4" />,
      },
      {
        text: "상세보기",
        svg: <ArticleSVG className="size-4" />,
      },
    ],
  },
} as const;

interface PostSectionProps {
  posts: getAllPostsType;
  categorys: getAllcategorysType;
}

const PostSection = ({ posts, categorys }: PostSectionProps) => {
  const [searchText, setSearchText] = useState("");
  const [currentCategories, setCurrentCategories] = useState<string[]>([]);
  const [currentSort, setCurrentSort] = useState<Sort>("최신순");

  const debouncedQuery = useDebouncedValue(searchText);

  const handleSetCategorys: React.ChangeEventHandler<HTMLDivElement> =
    useCallback((e) => {
      const target = e.target as HTMLElement;
      if (target instanceof HTMLInputElement) {
        const { id, checked } = target;

        setCurrentCategories((prev) => {
          if (checked) {
            return prev.includes(id) ? prev : [...prev, id]; // 중복 방지
          } else {
            return prev.filter((item) => item !== id); // 체크 해제 시 제거
          }
        });
      }
    }, []);

  const handleSort = useCallback((text: Sort) => {
    setCurrentSort(text);
  }, []);

  const handleSearchText: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      const { value } = e.target;

      setSearchText(value);
    }, []);

  const filteredPosts = useMemo(() => {
    const byCategory =
      currentCategories.length === 0
        ? posts
        : posts.filter((post) => currentCategories.includes(post.category));

    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return byCategory;

    return byCategory.filter((p) => {
      const hay = `${p.metadata.title} ${p.content ?? ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [posts, currentCategories, debouncedQuery]);

  const displayedPosts =
    currentSort === "시간순" ? [...filteredPosts].reverse() : filteredPosts;

  return (
    <section className="flex-1 flex gap-4 sm:gap-8 flex-col">
      <PostSectionHeader
        currentCategories={currentCategories}
        onChange={{ handleSetCategorys, handleSearchText }}
        currentSort={currentSort}
        onClick={handleSort}
        categorys={categorys}
      />
      <PostSectionMain searchText={debouncedQuery} posts={displayedPosts} />
    </section>
  );
};

export default PostSection;
