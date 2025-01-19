import { getAllPosts, getAllcategorys } from "@/lib/markdown";
import PostCategoryContainer from "./components/PostCategoryContainer";

export default async function PostsPage() {
  const posts = getAllPosts();
  const categorys = getAllcategorys();
  return (
    <div className="flex flex-col-reverse sm:flex-row items-center sm:items-start">
      <PostCategoryContainer posts={posts} categorys={categorys} />
    </div>
  );
}
