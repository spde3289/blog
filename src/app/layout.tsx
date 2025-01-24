import Header from "@/components/layout/Header";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const NotoSansKR = Noto_Sans_KR({
  subsets: ["latin"], // 사용할 언어 서브셋
  weight: ["300", "400", "500", "600", "700"], // 사용할 폰트 두께
  style: ["normal"], // 사용할 스타일
  display: "swap", // 폰트 로딩 전략
});

export const metadata: Metadata = {
  title: "spde3289의 개발 블로그",
  description:
    "spde3289의 성장을 기록하는 개발 블로그 입니다. 사용자들이 불편함을 느끼는 문제를 빠르게 해결하는 것을 즐기며 다양한 서비스를 운영하고 있습니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${NotoSansKR.className} antialiased`}>
        <Header />
        {/* Google Analytics Script */}
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown.css"
          rel="stylesheet"
        />
        <main className="w-full h-full relative">
          <div className=" lg:max-w-1400 lg:mx-auto px-0 lg:px-24 mb-5">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
