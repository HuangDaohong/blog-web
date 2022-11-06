import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteEslint from 'vite-plugin-eslint';
import * as path from 'path';
import compressPlugin from 'vite-plugin-compression';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compressPlugin(),
    viteEslint({
      failOnError: false
    }),
    createSvgIconsPlugin({
      // 导入svg图标,
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svgs')], // 图标路径,  process.cwd() 获取当前文件所在目录, 获取当前文件所在目录下的src/assets/svgs目录
      symbolId: 'icon-[dir]-[name]' // 图标id, 可以自定义, 默认为 icon-[dir]-[name], 其中[dir]为文件夹名, [name]为文件名, 如 icon-antd-form,
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // 此处也可设置直角、边框色、字体大小等
          'primary-color': 'rgb(49 191 210)'
        },
        javascriptEnabled: true // 允许 less (或改为sass)使用 javascript,
      }
    }
  },
  server: {
    open: true,
    port: 5000,
    cors: true
    // proxy: {
    //   '/api': {
    //     target: 'https://172.24.29.128',
    //     changeOrigin: true,
    //     rewrite: path => path.replace(/^\/api/, '')
    //   }
    // }
  }
});
