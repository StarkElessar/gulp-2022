import * as pathNode from 'path'

const srcFolder = 'src'
const builFolder = 'dist'

const path = {
  src: pathNode.resolve(srcFolder),
  build: pathNode.resolve(builFolder),
}

export const webpackConfig = (isMode) => {
  return {
    entry: ['@babel/polyfill', `${path.src}/js/app.js`],
    mode: isMode ? 'development' : 'production',
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
        },
      ],
    },
  }
}
