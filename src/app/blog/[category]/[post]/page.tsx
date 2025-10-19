import HighlightedCode from "@/components/HighlightedCode";
import { getAllPosts, getPost } from "@/lib/markdown";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ category: string; post: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category, post } = await params;

  const postData = await getPost(category, post);

  if (!postData) {
    return {
      title: "게시글을 찾을 수 없습니다.",
      description: "요청하신 게시글이 존재하지 않습니다.",
    };
  }

  const { metadata } = postData;

  return {
    title: metadata.title,
    description: metadata.description || "이 글에 대한 설명이 없습니다.",
    openGraph: {
      title: metadata.title,
      description: metadata.description || "이 글에 대한 설명이 없습니다.",
      url: `https://spde3289.dev/${category}/${post}`,
      type: "article",
      publishedTime: metadata.date,
      images: metadata.image ? [metadata.image] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description || "이 글에 대한 설명이 없습니다.",
      images: metadata.image ? [metadata.image] : [],
    },
  };
}

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    category: post.category,
    post: post.post,
  }));
}

export default async function PostPage({ params }: PageProps) {
  const { category, post } = await params;

  const { metadata, contentHtml } = await getPost(category, post);

  return (
    <main style={{ margin: "0 auto" }} className="mx-auto p-4 markdown-body">
      <h1 style={{ marginBottom: "4px" }}>{metadata.title}</h1>
      <div className="flex justify-between mb-4">
        <p style={{ marginBottom: "0" }} className="text-gray-500">
          {metadata.tags}
        </p>
        <p style={{ marginBottom: "0" }} className="text-gray-500">
          작성일 : {metadata.date}
        </p>
      </div>
      <HighlightedCode contentHtml={contentHtml} />
    </main>
  );
}
