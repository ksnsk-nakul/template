import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const base = process.env.VITE_BASE_PATH || '/'

export default defineConfig({
  plugins: [
    vue(),
    svgLoader({
      svgoConfig: {
        plugins: [
          {
            name: 'convertColors',
            params: {
              currentColor: true,
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Keep build output clean (Bootstrap + this template still uses patterns Sass warns about).
        // This only silences warnings; it does not change generated CSS.
        loadPaths: ['node_modules'],
        quietDeps: true,
        silenceDeprecations: [
          'legacy-js-api',
          'import',
          'if-function',
          'global-builtin',
          'color-functions',
          'slash-div',
        ],
      },
    },
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    // This template intentionally bundles many dashboard features; keep build output noise-free.
    chunkSizeWarningLimit: 2000,
  },
  base,
})
