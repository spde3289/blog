import { getPostContent } from "@/lib/client/getBlogData";
import type { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const pathroot = request.nextUrl.searchParams.get("pathroot");

  if (!pathroot) {
    return new Response("pathroot를 찾을 수 없어요", { status: 400 });
  }

  try {
    const post = getPostContent(pathroot);
    return new Response(post, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  } catch (error) {
    return new Response("해당 경로를 찾을 수 없어요", { status: 404 });
  }
};
