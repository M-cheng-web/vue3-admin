import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'

import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
const path = require('path')

const isDev = process.env.NODE_ENV === 'development'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    viteMockServe({
      mockPath: 'mock',
      supportTs: false,
      localEnabled: isDev,
      prodEnabled: !isDev,
      injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `
    })
  ],

  resolve: {
    // 设置别名
    alias: {
      views: path.resolve(__dirname, 'src/views'),
      styles: path.resolve(__dirname, 'src/styles'),
      api: path.resolve(__dirname, 'src/api'),
      '@': path.resolve(__dirname, 'src')
    }
  },

  css: {
    preprocessorOptions: {
      // 引入公用的样式
      scss: {
        additionalData: '@use "@/styles/index.scss" as *;'
      }
    }
  }
})
