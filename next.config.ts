const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // 프로덕션 빌드에서 모든 console.log 제거
    removeConsole: {
      exclude: ["error", "warn"], // 'console.error', 'console.warn'은 유지 (선택 사항)
    },
  },
};

export default nextConfig;
