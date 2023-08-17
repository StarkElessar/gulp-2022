import path from 'path';

export const webpackConfig = (isMode) => {
  const paths = {
    src: path.resolve('src'),
    build: path.resolve('dist'),
  };

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
