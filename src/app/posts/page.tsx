import { getAllPosts } from "@/lib/markdown";

export default async function PostsPage() {
  const posts = getAllPosts(); // 모든 카테고리의 게시글 목록을 가져옵니다.

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">게시글 목록</h1>
      <ul className="mt-4 space-y-2">
        {posts.map((post) => (
          <li key={post.slug}>
            <a
              href={`/posts/${post.slug}`}
              className="text-blue-500 hover:underline"
            >
              {post.metadata.title}
              {post.slug}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
