import * as pathNode from 'path'

const srcFolder = 'src'
const builFolder = 'dist'
const tempCache = '.temporary_cache'

const path = {
  cache: pathNode.resolve(tempCache),
  src: pathNode.resolve(srcFolder),
  build: pathNode.resolve(builFolder),
}

export const webpackConfig = (isDev) => ({
  entry: ['@babel/polyfill', `${path.src}/js/app.ts`],
  devtool: 'inline-source-map',
  mode: isDev ? 'development' : 'production',
  cache: {
    type: 'filesystem', // По умолчанию 'memory'
    cacheDirectory: path.cache,
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
        use: 'babel-loader',
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
})
