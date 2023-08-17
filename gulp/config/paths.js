import path from 'path';

const buildFolder = './dist';
const srcFolder = './src';

const filePaths = {
  build: {
    js: `${buildFolder}/js/`,
    css: `${buildFolder}/css/`,
    images: `${buildFolder}/images/`,
    fonts: `${buildFolder}/fonts/`,
    static: `${buildFolder}/static/`,
  },
  src: {
    js: `${srcFolder}/js/app.js`,
    images: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/images/**/*.svg`,
    scss: `${srcFolder}/scss/style.scss`,
    static: `${srcFolder}/static/**/*.*`,
    html: [`${srcFolder}/pug/index.pug`, `${srcFolder}/pug/pages/*.pug`],
    svgIcons: `${srcFolder}/icons/*.svg`,
  },
  watch: {
    js: `${srcFolder}/js/**/*.js`,
    scss: `${srcFolder}/scss/**/*.scss`,
    html: `${srcFolder}/pug/**/*.pug`,
    images: `${srcFolder}/**/*.{jpg,jpeg,png,svg,gif,webp,ico}`,
    static: `${srcFolder}/static/**/*.*`,
  },
  buildFolder,
  srcFolder,
  projectDirName: path.basename(path.resolve()),
  /**
   * The path to the desired folder on the remote server.
   * Gulp will add the project name automatically - based on the folder name:
   * */
  ftp: ``,
};

export { filePaths };