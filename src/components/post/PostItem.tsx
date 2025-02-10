import { metadataType } from "@/lib/markdown";
import Image from "next/image";
import Link from "next/link";

interface PostItemProps {
  post: {
    category: string;
    post: string;
    metadata: metadataType;
    content: string;
    excerpt: string;
    href: string;
    img: string;
  };
}

const PostItem = ({ post }: PostItemProps) => {
  // console.log(post);

  return (
    <div className="w-10/12 lg:w-8/12 border shadow-custom-inset overflow-hidden rounded-xl ">
      <Link className="w-full flex content relative" href={post.href}>
        <div className="w-full sm:w-3/5 p-3 sm:p-7 sm:pr-5">
          <h1 className="text-xl mb-2 line-clamp-2 text-gray-950">
            {post.metadata.title}
          </h1>
          <p className="overflow-hidden text-ellipsis break-all line-clamp-2 mb-4 leading-normal">
            {post.content}
          </p>
          <div className="text-gray-600 text-sm flex gap justify-between">
            <p className="text-sm">{post.category}</p>
            {post.metadata.data}
          </div>
        </div>
        <div className="relative flex-1">
          <Image
            src={post.img}
            fill
            priority
            sizes="(min-width: 808px) 50vw, 100vw"
            className="hidden sm:block"
            style={{ objectFit: "fill" }}
            quality={100} // 품질을 조정할 수 있습니다.
            alt="대표 이미지"
          />
        </div>
      </Link>
    </div>
  );
};

export default PostItem;
