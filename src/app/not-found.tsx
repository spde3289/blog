"use client";
import { useRouter } from "next/navigation";

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
      className="flex w-full flex-col items-center justify-center"
      style={{ height: "calc(100svh - var(--header-size))" }}
    >
      <h1 className="text-5xl font-medium">404 ERROR</h1>
      <p className="mb-4 text-xl">
        입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.
      </p>
      <button
        onClick={handleBack}
        className="block w-36 rounded-lg bg-[#dbdee2] py-3 text-sm font-medium
          text-[#101c33]"
      >
        <span className="flex items-center justify-center gap-2">이전으로</span>
      </button>
    </div>
  );
};

export default NotFound;
