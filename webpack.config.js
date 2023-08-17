import path from 'path';

const paths = {
  src: path.resolve('src'),
  build: path.resolve('dist'),
};

export const webpackConfig = (isMode) => {
  return {
    entry: path.join(paths.src, 'js/app.js'),

    mode: isMode ? 'development' : 'production',

    output: {
      path: path.join(paths.build, 'js'),
      filename: 'app.min.js',
      publicPath: '/',
    },

    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,

          use: {
            loader: 'esbuild-loader',
            options: { target: 'ES2015' },
          },

          resolve: {
            fullySpecified: false,
          },
        },
      ],
    },
  };
};
