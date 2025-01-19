import { getAllPosts, getPost } from "@/lib/markdown";
import "highlight.js/styles/github.css"; // GitHub 스타일
import HighlightedCode from "./components/HighlightedCode";

interface PageProps {
  params: Promise<{ category: string; post: string }>;
}

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    category: post.category,
    post: post.post,
  }));
}

export default async function PostPage({ params }: PageProps) {
  const { category, post } = await params; // await을 사용하여 params를 처리

  const { metadata, contentHtml } = await getPost(category, post);

  return (
    <main
      style={{ margin: "0 auto" }}
      className="prose mx-auto p-4 markdown-body"
    >
      <h1 style={{ marginBottom: "4px" }}>{metadata.title}</h1>
      <div className="flex justify-between mb-4">
        <p style={{ marginBottom: "0" }}>{metadata.tags}</p>
        <p style={{ marginBottom: "0" }} className="text-gray-500">
          작성일 : {metadata.date}
        </p>
      </div>
      <HighlightedCode contentHtml={contentHtml} />
    </main>
  );
}
