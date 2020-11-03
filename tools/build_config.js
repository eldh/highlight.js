const cjsPlugin = require('rollup-plugin-commonjs')
const jsonPlugin = require('rollup-plugin-json')

module.exports = {
  build_dir: 'build',
  copyrightYears: '2006-2020',
  clean_css: {},
  rollup: {
    node: {
      output: { format: 'cjs', strict: false, exports: 'auto' },
      input: {
        plugins: [
          cjsPlugin(),
          jsonPlugin(),
          {
            transform: (x) => {
              if (/var module/.exec(x)) {
                // remove shim that only breaks things for rollup
                return x.replace(/var module\s*=.*$/m, '')
              }
            },
          },
        ],
      },
    },
    browser_core: {
      input: {
        plugins: [jsonPlugin()],
      },
      output: { format: 'esm' },
    },
    browser: {
      node: {
        output: { format: 'esm' },
        input: {
          plugins: [
            jsonPlugin(),
            {
              transform: (x) => {
                if (/var module/.exec(x)) {
                  // remove shim that only breaks things for rollup
                  return x.replace(/var module\s*=.*$/m, '')
                }
              },
            },
          ],
        },
      },
    },
  },
  terser: {
    format: {
      max_line_len: 80,
      ascii_only: true,
    },
    compress: {
      passes: 2,
      unsafe: true,
      warnings: true,
      dead_code: true,
      toplevel: 'funcs',
    },
  },
}
