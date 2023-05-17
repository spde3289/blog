// vite.config.ts 

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base:'/my-ts-vite-app/' // 이 부분을 수정
})