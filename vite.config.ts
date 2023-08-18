import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteEslint from 'vite-plugin-eslint';
import * as path from 'path';
import viteCompression from 'vite-plugin-compression';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import vitePluginImp from 'vite-plugin-imp';

import viteImagemin from 'vite-plugin-imagemin';
// viteImagemin=>package.json中
// "resolutions": {
//   "bin-wrapper": "npm:bin-wrapper-china"
// }

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),

    /** Gzip 压缩 */
    viteCompression(),
    // viteCompression({
    //   verbose: true, // 是否在控制台中输出压缩结果
    //   disable: false, //是否禁用压缩，默认为 false
    //   threshold: 10240, // 如果体积大于阈值，将被压缩，单位为b，体积过小时请不要压缩，以免适得其反
    //   algorithm: 'brotliCompress', // 压缩算法，默认gzip，可选brotliCompress
    //   ext: '.br',
    //   deleteOriginFile: false // 是否删除原文件,默认为false
    // }),

    /** 图片压缩 */
    viteImagemin(),
    // viteImagemin({
    //   gifsicle: {
    //     optimizationLevel: 7,
    //     interlaced: false
    //   },
    //   optipng: {
    //     optimizationLevel: 7
    //   },
    //   mozjpeg: {
    //     quality: 20
    //   },
    //   pngquant: {
    //     quality: [0.8, 0.9],
    //     speed: 4
    //   },
    //   svgo: {
    //     plugins: [
    //       {
    //         name: 'removeViewBox'
    //       },
    //       {
    //         name: 'removeEmptyAttrs',
    //         active: false
    //       }
    //     ]
    //   }
    // }),

    /** eslint */
    viteEslint({
      failOnError: false
    }),

    /** 按需加载antd */
    vitePluginImp({
      optimize: true, // 是否优化
      libList: [
        {
          libName: 'antd',
          style: name => `antd/es/${name}/style`
        }
      ]
    }),

    /** svg图标 */
    createSvgIconsPlugin({
      // 导入svg图标,
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svgs')], // 图标路径,  process.cwd() 获取当前文件所在目录, 获取当前文件所在目录下的src/assets/svgs目录
      symbolId: 'icon-[dir]-[name]' // 图标id, 可以自定义, 默认为 icon-[dir]-[name], 其中[dir]为文件夹名, [name]为文件名, 如 icon-antd-form,
    })
  ],
  build: {
    // /** 消除打包大小超过 500kb 警告 */
    // chunkSizeWarningLimit: 2000,
    // /** Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效 */
    // minify: 'terser',
    // // vite打包是通过rollup来打包的
    // rollupOptions: {
    //   output: {
    //     chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
    //     entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
    //     assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
    //     manualChunks(id) {
    //       if (id.includes('node_modules')) {
    //         return 'vendor';
    //       }
    //     }
    //   }
    // },

    /** 在打包代码时移除 console.log、debugger 和 注释 */
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log']
      },
      format: {
        /** 删除注释 */
        comments: false
      }
    },
    reportCompressedSize: false,
    /** 打包后是否生成 source map 文件 */
    sourcemap: false,
    // /** 打包后静态资源目录 */
    assetsDir: 'static'
  },

  /** 别名 */
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },

  /** css预处理器 */
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

  /** 本地服务 */
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
