
import json from "@rollup/plugin-json";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import swc from '@rollup/plugin-swc';
// @ts-check
/** @type {import('rollup').RollupOptions} */
export default {
  input: 'src/index.ts', // 入口文件
  output: {
    dir: 'dist', // 输出目录
    format: 'esm', //  格式
    sourcemap: false, // 生成 sourcemap
    preserveModules: false, // 保持模块结构
    
  },
  cache: false,
  plugins: [
    nodeResolve({
      extensions: ['.js', '.ts', '.json'], // 支持的文件扩展名
      preferBuiltins: true, // 优先使用 Node.js 内置模块
    }),
    json(),
    swc(),
    
  ],
  external: [
        // 将 node 内置模块和依赖标记为外部依赖
        ...(await import('module')).builtinModules,
        // 手动排除的依赖
        'dotenv',
        'date-fns',
        'drizzle-orm',
        'pg',
        '@types/pg',
        // 排除 drizzle-kit 相关依赖
        // 'drizzle-kit',
        // 排除 TypeScript 相关依赖
        // 'typescript',
        // 'tslib',
        // 排除 Node.js 相关工具
        // 'tsx',
        // 排除 Rollup 插件
        // '@rollup/plugin-commonjs',
        // '@rollup/plugin-json',
        // '@rollup/plugin-node-resolve',
        // '@rollup/plugin-typescript'
      ]
};