import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

export default {
  input: 'src/input-formatting/index.js',
  output: {
    file: 'dist/input-formatting.min.js',
    format: 'umd',
    name: 'InputFormatting'
  },
  plugins: [
    resolve(), // rollup 不知道如何处理 node_modules 里的依赖，配置此项，可以解决此问题
    babel({
      exclude: 'node_modules/**', // only transpile our source code
      plugins: ['external-helpers']
    }),
    uglify()
  ]
}
