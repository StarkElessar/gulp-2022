import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const srcFolder = 'src';
const buildFolder = 'dist';
const tempCache = '.temporary_cache';

const paths = {
  root: path.dirname(__filename),
  src: path.resolve(srcFolder),
  build: path.resolve(buildFolder),
  cache: path.resolve(tempCache),
};

export const webpackConfig = (isMode) => ({
  entry: ['@babel/polyfill', `${paths.src}/js/app.js`],
  mode: isMode ? 'development' : 'production',
  cache: {
    type: 'filesystem', // По умолчанию 'memory'
    cacheDirectory: paths.cache,
  },
  output: {
    path: `${paths.build}/js`,
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
});