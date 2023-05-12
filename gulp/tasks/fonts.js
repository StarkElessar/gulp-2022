import gulp from 'gulp';
import fs from 'fs';
import chalk from 'chalk';
import fonter from 'gulp-fonter-fix';
import ttf2woff2 from 'gulp-ttf2woff2';

import { filePaths } from '../config/paths.js';
import { plugins } from '../config/plugins.js';

const fontWeights = {
  thin: 100,
  extralight: 200,
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  heavy: 800,
  black: 900,
};

const otfToTtf = () => {
  return (
    gulp // Ищем файлы шрифтов .otf
      .src(`${filePaths.srcFolder}/fonts/*.otf`, {})
      .pipe(plugins.handleError('FONTS'))
      // Конвертируем в .ttf
      .pipe(fonter({ formats: ['ttf'] }))
      // Выгружаем в исходную папку
      .pipe(gulp.dest(`${filePaths.srcFolder}/fonts/`))
  );
};

const ttfToWoff = () => {
  return (
    gulp // Ищем файлы шрифтов .ttf
      .src(`${filePaths.srcFolder}/fonts/*.ttf`, {})
      .pipe(plugins.handleError('FONTS'))
      // конвертируем в .woff
      .pipe(fonter({ formats: ['woff'] }))
      // выгружаем в папку с результатом
      .pipe(gulp.dest(`${filePaths.build.fonts}`))
      // ищем файлы шрифтов .ttf
      .pipe(gulp.src(`${filePaths.srcFolder}/fonts/*.ttf`))
      // конвертируем в .woff2
      .pipe(ttf2woff2())
      // выгружаем в папку с результатом
      .pipe(gulp.dest(`${filePaths.build.fonts}`))
      // Ищем файлы шрифтов .woff и woff2
      .pipe(gulp.src(`${filePaths.srcFolder}/fonts/*.{woff,woff2}`))
      // Выгружаем в папку с результатом
      .pipe(gulp.dest(`${filePaths.build.fonts}`))
  );
};

const fontStyle = () => {
  // Файл стилей подключения шрифтов
  const fontStylesFile = `${filePaths.srcFolder}/scss/config/fonts.scss`;
  // Проверяем существуют ли файлы шрифтов
  fs.readdir(filePaths.build.fonts, (err, fontFiles) => {
    if (fontFiles) {
      // Проверяем существует ли файл стилей для подключения шрифтов
      if (!fs.existsSync(fontStylesFile)) {
        // Если файла нет, создаем его
        fs.writeFile(fontStylesFile, '', cb);
        let newFileOnly;

        fontFiles.forEach((file) => {
          // Записываем подключения шрифтов в файл стилей
          const fileName = file.split('.')[0];

          if (newFileOnly !== fileName) {
            const [fontName, fontWeight = 'regular'] = fileName.split('-');
            const fontWeightValue = fontWeights[fontWeight.toLowerCase()];

            fs.appendFile(
              fontStylesFile,
              `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fileName}.woff2") format("woff2"), url("../fonts/${fileName}.woff") format("woff");\n\tfont-weight: ${fontWeightValue};\n\tfont-style: normal;\n}\r\n`,
              cb
            );

            newFileOnly = fileName;
          }
        });
      } else {
        // Если файл есть нужно его удалить
        console.log(
          chalk.bold.white.bgGreenBright(
            'Файл scss/config/fonts.scss уже существует.\nДля обновления файла нужно его удалить!'
          )
        );
      }
    }
  });

  return gulp.src(filePaths.srcFolder);

  function cb(err) {
    if (err) {
      console.log(chalk.bold.white.bgRed('Ошибка записи файла:'), err);
    } else {
      console.log(
        chalk.bold.white.bgGreenBright('[Файл fonts.scss успешно записан]')
      );
    }
  }
};

export { otfToTtf, ttfToWoff, fontStyle };