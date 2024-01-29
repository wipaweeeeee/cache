import * as path from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables.scss" as *;`
      }
    }
  },
  resolve: {
    // alias: {
    //   '@': path.resolve(__dirname, './src'),
    // }
      alias: [{
        find: '@',
        replacement: path.resolve(__dirname, './src')
      }]
  }
})
