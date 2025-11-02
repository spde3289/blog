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
    <div className="flex flex-col items-center relative group">
      <div className={`${size} z-1 overflow-hidden rounded`}>
        <img
          className="w-full h-full object-cover "
          src={img.src}
          alt={img.alt}
          {...img.options}
        />
      </div>
      <div className="translate-y-full left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-[#313131] text-white rounded text-center font-normal whitespace-nowrap z-99 absolute -bottom-1 hidden group-hover:block">
        {img.alt}
      </div>
    </div>
  );
};

export default ImageCard;
