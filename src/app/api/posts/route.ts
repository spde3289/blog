import { getPostContent } from "@/lib/postService";
import type { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category");
  const slug = searchParams.get("slug");

  if (!category || !slug) {
    return new Response("카테고리 또는 슬러그를 찾을 수 없어요", {
      status: 400,
    });
  }

  try {
    const post = getPostContent(category, slug);
    return new Response(post, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }

    return new Response("알 수 없는 에러가 발생했어요", { status: 500 });
  }
};
