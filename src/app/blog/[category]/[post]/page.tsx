import { getPostDetail, getPostList, getPostMeta } from "@/lib/postService";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import PostLayout from "./_components/PostLayout";

interface PageProps {
  params: Promise<{ category: string; post: string }>;
}

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
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
      url: `https://spde3289.dev/blog/${category}/${post}`,
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
};

export const generateStaticParams = () => {
  const posts = getPostList();
  return posts.map((post) => {
    const fileName = post.href.split("/");
    return {
      category: post.category,
      post: fileName[3],
    };
  });
};

const PostPage = async ({ params }: PageProps) => {
  const { category, post } = await params;

  try {
    const { post: meta, contentHtml } = getPostDetail(category, post);

    if (!meta || !contentHtml) {
      notFound();
    }

    return <PostLayout metadata={meta.metadata} contentHtml={contentHtml} />;
  } catch {
    notFound();
  }
};

export default PostPage;
