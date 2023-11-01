import { resolve, join } from 'path';

const paths = {
  src: resolve('src'),
  build: resolve('dist'),
};

export const webpackConfig = (isMode) => {
  return {
    context: join(paths.src, 'js'),

    entry: {
      app: './app.js',
    },

    mode: isMode ? 'development' : 'production',

    output: {
      path: join(paths.build, 'js'),
      filename: '[name].min.js',
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
  };
};
