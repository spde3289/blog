import CodeBlock from "@/components/CodeBlock";
import PostsContainer from "@/components/post/PostsContainer";
import { getAllPosts } from "@/lib/markdown";
import Link from "next/link";
import { Suspense } from "react";
import { BsArrowRight } from "react-icons/bs";

const Home = () => {
  const posts = getAllPosts().slice(0, 3);
  return (
    <div className="flex flex-col">
      <div className="flex mt-8 lg:px-6 justify-around items-center gap-2">
        <p className="text-3xl md:text-4xl button">
          안녕하세요. <br />
          다앙한 경험을 좋아하는 <br />
          개발자 김지훈입니다. <br />
        </p>
        <CodeBlock
          className="hidden sm:block"
          code={`console.log("Hello there!")`}
        />
      </div>
      <div className="mt-10 sm:px-6 flex flex-col items-center gap-4 relative ">
        <Suspense fallback={<div>Loading...</div>}>
          <PostsContainer title="최근 게시글 목록" postArray={posts}>
            <Link
              className="flex items-center gap-1 text-sm hover:text-cyan-800"
              href="/posts"
            >
              전체 게시글 보기 <BsArrowRight className="mt-[1px]" />{" "}
            </Link>
          </PostsContainer>
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
