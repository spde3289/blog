interface ImageCardProps {
  img: {
    src: string;
    alt: string;
    options?: {
      [key: string]: string | boolean;
    };
  };
  size?: string;
}

const ImageCard = ({ img, size = "size-10" }: ImageCardProps) => {
  return (
    <div className="group relative flex flex-col items-center">
      <div className={`${size} z-1 overflow-hidden rounded`}>
        <img
          className="h-full w-full object-cover"
          src={img.src}
          alt={img.alt}
          {...img.options}
        />
      </div>
      <div
        className="absolute -bottom-1 left-1/2 z-99 hidden -translate-x-1/2
          translate-y-full rounded bg-[#313131] px-1.5 py-0.5 text-center
          font-normal whitespace-nowrap text-white group-hover:block"
      >
        {img.alt}
      </div>
    </div>
  );
};

export default ImageCard;
