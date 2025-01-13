import { getAllPosts, getPost } from "@/lib/markdown";

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
    <main className="prose mx-auto p-4">
      {post}
      {category}
      <h1>{metadata.title}</h1>
      <p className="text-gray-500">{metadata.date}</p>
      <article dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </main>
  );
}
