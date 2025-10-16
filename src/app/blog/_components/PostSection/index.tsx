import { getAllPostsType, getAllcategorysType } from "@/lib/markdown";
import PostSectionHeader from "./PostSectionHeader";
import PostSectionMain from "./PostSectionMain";

interface PostSectionProps {
  posts: getAllPostsType;
  categorys: getAllcategorysType;
}

const PostSection = ({ posts, categorys }: PostSectionProps) => {
  return (
    <section className="flex-1 flex gap-4 sm:gap-8 flex-col">
      <PostSectionHeader />
      <PostSectionMain posts={posts} />
    </section>
  );
};

export default PostSection;
