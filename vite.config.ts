import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production'

  return {
    plugins: [vue()],

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: true,
      port: 5173,
      strictPort: true,
    },

    preview: {
      port: 4173,
      strictPort: true,
    },

    build: {
      sourcemap: !isProd,
      target: 'es2019',
      cssCodeSplit: true,
      reportCompressedSize: false,
    },
  }
})
