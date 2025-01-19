"use client";
import { useRouter } from "next/navigation";
import { TfiBackLeft } from "react-icons/tfi";

const NotFound = () => {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back(); // 이전 페이지로 이동
    } else {
      router.push("/"); // 기본 경로로 이동
    }
  };
  return (
    <div
      className="flex flex-col w-full  justify-center items-center"
      style={{ height: "calc(100svh - var(--header-size))" }}
    >
      <h1 className="text-5xl font-medium">404 ERROR</h1>
      <p className="mb-4 text-xl">
        입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.
      </p>
      <button
        onClick={handleBack}
        className="bg-[#dbdee2] text-[#101c33] block rounded-lg w-36 py-3 text-sm font-medium"
      >
        <span className="flex justify-center items-center gap-2">
          이전으로
          <TfiBackLeft className="text-[#101c33] scale-y-[-1]" />
        </span>
      </button>
    </div>
  );
};

export default NotFound;
