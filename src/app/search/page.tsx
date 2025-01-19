import { getAllPosts } from "@/lib/markdown";
import ContentContainer from "./components/ContentContainer";

const SearchPage = () => {
  const posts = getAllPosts();
  return <ContentContainer posts={posts} />;
};

export default SearchPage;
