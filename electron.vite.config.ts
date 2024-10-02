import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@/utils': resolve('src/main/utils'),
        '@shared': resolve('src/shared'),
        '@/browserWindows': resolve('src/main/browserWindows'),
        '@/worker': resolve('src/main/worker'),
        '@config': resolve('src/config'),
        '@db': resolve('src/db')
      }
    },
    build: {
      rollupOptions: {
        external: ['better-sqlite3']
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    assetsInclude: 'src/renderer/assets/**',
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@shared': resolve('src/shared'),
        '@/hooks': resolve('src/renderer/src/hooks'),
        '@/assets': resolve('src/renderer/src/assets'),
        '@/store': resolve('src/renderer/src/store'),
        '@/components': resolve('src/renderer/src/components'),
        '@/lib': resolve('src/renderer/src/lib')
      }
    },
    plugins: [react()],
    optimizeDeps: { exclude: ['node_modules/.cache', 'chunk-KFEKTWHE.js'] }
  }
})
