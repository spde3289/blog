import {
  getPostContent,
  getPostList,
  getPostMeta,
} from "@/lib/sever/getBlogData";
import { Metadata } from "next";
import PostContainer from "./_components/PostContainer";

interface PageProps {
  params: Promise<{ category: string; post: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category, post } = await params;

  const postData = getPostMeta(category, post);

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
  const posts = getPostList();
  return posts.map((post) => {
    const fileName = post.href.split("/");
    return {
      category: post.category,
      post: fileName[3],
    };
  });
}

export default async function PostPage({ params }: PageProps) {
  const { category, post } = await params;

  const { metadata, content } = getPostMeta(category, post);
  const contentHtml = getPostContent(content);

  return <PostContainer metadata={metadata} contentHtml={contentHtml} />;
}
