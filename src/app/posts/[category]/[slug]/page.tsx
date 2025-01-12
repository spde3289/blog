import { getPost } from "@/lib/markdown";

export default async function PostPage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const { category, slug } = await params; // params를 바로 사용할 수 있도록 비동기 처리 후 구조 분해 할당

  const { metadata, contentHtml } = await getPost(category, slug);

  return (
    <main className="prose mx-auto p-4">
      <h1>{metadata.title}</h1>
      <p className="text-gray-500">{metadata.date}</p>
      <article dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </main>
  );
}
