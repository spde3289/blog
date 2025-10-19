"use client";

import useDebouncedValue from "@/hooks/useDebouncedValue";
import { getAllPostsType, getAllcategorysType } from "@/lib/markdown";
import { useCallback, useMemo, useState } from "react";
import PostSectionHeader from "./PostSectionHeader";
import PostSectionMain from "./PostSectionMain";

interface PostSectionProps {
  posts: getAllPostsType;
  categorys: getAllcategorysType;
}

const PostSection = ({ posts, categorys }: PostSectionProps) => {
  const [searchText, setSearchText] = useState("");
  const [currentCategories, setCurrentCategories] = useState<string[]>([]);
  const [sort, setSort] = useState("최신순");

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

  const handleSort: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      const target = e.target as HTMLElement;

      if (target.textContent === "시간순" || target.textContent === "최신순") {
        setSort(target.textContent);
      }
    },
    []
  );

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
  }, [currentCategories, debouncedQuery]);

  const displayedPosts =
    sort === "시간순" ? [...filteredPosts].reverse() : filteredPosts;

  return (
    <section className="flex-1 flex gap-4 sm:gap-8 flex-col">
      <PostSectionHeader
        currentCategories={currentCategories}
        onChange={{ handleSetCategorys, handleSearchText }}
        sort={sort}
        onClick={handleSort}
        categorys={categorys}
      />
      <PostSectionMain searchText={debouncedQuery} posts={displayedPosts} />
    </section>
  );
};

export default PostSection;
