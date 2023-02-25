import * as pathNode from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const srcFolder = 'src'
const builFolder = 'dist'

const path = {
  root: pathNode.dirname(__filename),
  src: pathNode.resolve(srcFolder),
  build: pathNode.resolve(builFolder),
}

console.log(path.root);

export const webpackConfig = (isMode) => ({
  entry: ['@babel/polyfill', `${path.src}/js/app.js`],
  mode: isMode ? 'development' : 'production',
  cache: {
    type: 'filesystem', // По умолчанию 'memory'
    cacheDirectory: `${path.root}/.temporary_cache`,
  },
  output: {
    path: `${path.build}/js`,
    filename: 'app.min.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
})
