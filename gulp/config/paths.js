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
    js: `${srcFolder}/js/*.js`,
    images: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/images/**/*.svg`,
    scss: [`${srcFolder}/scss/main.scss`, `${srcFolder}/scss/pages/*.scss`],
    html: `${srcFolder}/*.html`,
    static: `${srcFolder}/static/**/*.*`,
    svgIcons: `${srcFolder}/icons/*.svg`,
    fontFacesFile: `${srcFolder}/scss/config/fonts.scss`,
    fonts: `${srcFolder}/fonts/`,
  },
  watch: {
    js: `${srcFolder}/js/**/*.js`,
    scss: `${srcFolder}/scss/**/*.scss`,
    html: `${srcFolder}/**/*.html`,
    images: `${srcFolder}/**/*.{jpg,jpeg,png,svg,gif,webp,ico}`,
    static: `${srcFolder}/static/**/*.*`,
  },
  buildFolder,
  srcFolder,
  projectDirName: path.basename(path.resolve()),
  ftp: ``, // Путь к нужной папке на удаленном сервере. Gulp добавит имя папки проекта автоматически
};

export { filePaths };