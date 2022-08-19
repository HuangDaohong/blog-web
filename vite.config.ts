import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteEslint from 'vite-plugin-eslint';
import * as path from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'; // 导入svg图标
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
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
    // 解析器
    alias: {
      // 别名, 可以在引用的时候直接用别名
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@store': path.resolve(__dirname, 'src/store')
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true // 允许 less (或改为sass)使用 javascript,
      }
    }
  },
  server: {
    open: true, // 服务启动时自动在浏览器中打开应用, 默认为true
    port: 5000
  }
});
