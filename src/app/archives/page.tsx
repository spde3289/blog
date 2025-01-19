import { getAllPosts } from "@/lib/markdown";
import Link from "next/link";

const ArchivesPage = () => {
  const allPosts = getAllPosts();
  return (
    <div className="w-full space-y-2 flex flex-col items-center justify-center">
      {allPosts.map((post) => (
        <div
          key={post.metadata.title}
          className="w-full justify-center flex pb-10 gap-5 sm:gap-10"
        >
          <div className="text-sm relative text-gray-600 virtual font-light">
            {post.metadata.data}
          </div>
          <div className="w-4/6">
            <Link className="group hover:text-gray-600" href={post.href}>
              <h1 className="text-xl sm:text-3xl font-extrabold mb-4">
                {post.metadata.title}
              </h1>
              <p className="text-sm">{post.excerpt}</p>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArchivesPage;
