"use client";

import { ThemeProvider } from "@/contexts/ThemeContext";

/** 테마, 사이드바등 디자인 영역 Provider */
const DesigeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      {children}
      {/* <SidebarProvider>
      </SidebarProvider> */}
    </ThemeProvider>
  );
};

export default DesigeProvider;
