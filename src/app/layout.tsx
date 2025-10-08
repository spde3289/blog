import Header from "@/components/layout/Header";
import DesigeProvider from "@/components/provider/DesigeProvider";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const NotoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "700"], // 필요한 두께 지정 (선택)
  display: "swap", // 렌더링 최적화 옵션
  preload: true, // 성능 최적화를 위해 preload
  // variable: "--font-noto-sans-kr", // 커스텀 변수 사용 시
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
      <body
        className={`${NotoSansKR.className} antialiased bg-white dark:bg-neutral-900 dark:text-white/90`}
      >
        {/* Google Analytics Script */}
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown.css"
          rel="stylesheet"
        />
        <DesigeProvider>
          <Header />
          {/* <NavBar />
          <Backdrop /> */}
          {children}
        </DesigeProvider>
        <div id="modal-root" />
      </body>
    </html>
  );
}
