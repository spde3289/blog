import { getAllPosts } from "@/lib/markdown";
import { Suspense } from "react";
import ContentContainer from "./components/ContentContainer";

const SearchPage = () => {
  const posts = getAllPosts();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContentContainer posts={posts} />
    </Suspense>
  );
};

export default SearchPage;
