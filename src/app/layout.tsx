import Header from "@/components/Header";
import ScrollToTopButton from "@/components/ScrolltoTopButton";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  title: "spde3289의 개발 블로그",
  description:
    "spde3289의 성장을 기록하는 개발 블로그 입니다. 사용자들이 불편함을 느끼는 문제를 빠르게 해결하는 것을 즐기며 다양한 서비스를 운영하고 있습니다.",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko">
      <body className={` bg-white dark:bg-neutral-900 dark:text-white/90`}>
        {/* Google Analytics Script */}
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
        <ThemeProvider>
          <Header />
          {children}
          <ScrollToTopButton />
        </ThemeProvider>
        {/* <div id="modal-root" /> */}
      </body>
    </html>
  );
};
export default RootLayout;
