"use client";
import Form from "next/form";
import Link from "next/link";
import { useRef, useState } from "react";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";

const Header = () => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const DeleteText = () => {
    setInputValue("");
  };

  const inputOnClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <header className="w-full h-16 flex justify-center items-center sticky top-0 bg-[#fffc] shadow-custom-inset backdrop-saturate-180 backdrop-blur-custom z-50">
      <div className="max-w-1024 box-border md:max-w-1024 lg:max-w-1400 mx-auto px-2 sm:px-5 lg:px-24 w-full h-full flex items-center">
        <nav className="flex w-full flex-1 gap-6 items-center">
          <Link href="/">
            <div className="text-xl sm:text-2xl font-bold text-black">
              spde3289.dev
            </div>
          </Link>
          <Link className="hidden sm:block" href="/posts">
            <div>Posts</div>
          </Link>
          <Link className="hidden sm:block" href="/archives">
            <div>Archives</div>
          </Link>
          <Link className="hidden sm:block" href="/about">
            <div>About</div>
          </Link>
        </nav>
        <div className="h-full flex items-center">
          <nav className="flex sm:hidden w-full gap-3 items-center">
            <Link href="/posts">
              <div className="text-sm">Posts</div>
            </Link>
            <Link href="/archives">
              <div className="text-sm">Archives</div>
            </Link>
            <Link href="/about">
              <div className="text-sm">About</div>
            </Link>
          </nav>
          <Form
            action="/search"
            onClick={inputOnClick}
            className="wrapperClassName flex h-fit relative text-sm box-border"
          >
            <AiOutlineSearch
              size={18}
              className="hidden sm:block absolute left-3 top-1/2 -translate-y-1/2"
            />
            <input
              name="q"
              type="text"
              placeholder="search..."
              onChange={handleInputChange}
              value={inputValue}
              ref={inputRef}
              className="hidden w-44 sm:block md:w-full border border-[#ebeced] pt-2 pr-9 pl-9 pb-2 outline-none rounded-3xl"
            />
            <AiOutlineClose
              style={{ strokeWidth: 1 }}
              size={18}
              onClick={DeleteText}
              className={`hidden sm:block absolute right-3 top-1/2 -translate-y-1/2 ${
                inputValue.length === 0 ? "hidden" : ""
              }`}
            />
          </Form>
        </div>
      </div>
    </header>
  );
};
export default Header;
