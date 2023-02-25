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
  entry: ['@babel/polyfill', `${path.src}/js/app.ts`],
  devtool: 'inline-source-map',
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
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
          },
        },
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
})
