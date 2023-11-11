import { resolve, join } from 'path';

export const webpackConfig = (isMode) => {
  const paths = {
    src: resolve('src'),
    build: resolve('dist'),
  };

  return {
    context: join(paths.src, 'js'),

    entry: {
      main: './main.js',
      test: './test.js'
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
