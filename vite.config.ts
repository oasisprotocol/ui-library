import dts from 'vite-plugin-dts'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pkg from './package.json' assert { type: 'json' }

export default defineConfig({
  base: './',
  plugins: [tailwindcss(), react(), dts()],
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: '@oasisprotocol/ui-library',
      formats: ['es'],
      fileName: format => `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        ...Object.keys(pkg.dependencies), // don't bundle dependencies
        /^node:.*/,
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
} satisfies UserConfig)
