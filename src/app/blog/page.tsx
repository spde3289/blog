import { getAllPosts, getAllcategorys } from "@/lib/markdown";
import { Suspense } from "react";
import PostCategoryContainer from "./components/PostCategoryContainer";

export default async function PostsPage() {
  const posts = getAllPosts();
  const categorys = getAllcategorys();
  return (
    <div className="p-10">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex flex-col-reverse sm:flex-row items-center sm:items-start">
          <PostCategoryContainer posts={posts} categorys={categorys} />
        </div>
      </Suspense>
    </div>
  );
}
