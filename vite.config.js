
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'
import eslintPlugin from 'vite-plugin-eslint'
import { svgBuilder } from './src/plugin/svgBuilder'

import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const path = require('path')

const isDev = process.env.NODE_ENV === 'development'

export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      include: ['src/**/*.vue', 'src/**/*.js'] // 检查的文件
    }),
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
    }),
    svgBuilder('./src/icons/svg/')
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
