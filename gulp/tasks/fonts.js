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
    gulp /** Поиск шрифтов .otf */
      .src(`${filePaths.srcFolder}/fonts/*.otf`, {})
      .pipe(plugins.handleError('FONTS'))

      /** Конвертация в .ttf */
      .pipe(fonter({ formats: ['ttf'] }))

      /** Выгрузка в исходную папку */
      .pipe(gulp.dest(`${filePaths.srcFolder}/fonts/`))
  );
};

const ttfToWoff = () => {
  return (
    gulp /** Поиск шрифтов [.ttf] и конвертация в [.woff2] */
      .src(`${filePaths.srcFolder}/fonts/*.ttf`, {})
      .pipe(plugins.handleError('FONTS'))
      .pipe(ttf2woff2())
      .pipe(gulp.dest(`${filePaths.build.fonts}`))

      /**
       * Если нужно раскомментировать.
       * Конвертация в [.woff]
       * */
      //.pipe(gulp.src(`${filePaths.srcFolder}/fonts/*.ttf`))
      //.pipe(fonter({ formats: ['woff'] }))
      //.pipe(gulp.dest(`${filePaths.build.fonts}`))

      /** Поиск шрифтов [.woff, .woff2] и выгрузка в финальную папку */
      .pipe(gulp.src(`${filePaths.srcFolder}/fonts/*.{woff,woff2}`))
      .pipe(gulp.dest(`${filePaths.build.fonts}`))
  );
};

const fontStyle = () => {
  /** Файл стилей подключения шрифтов */
  const fontStylesFile = `${filePaths.srcFolder}/scss/config/fonts.scss`;

  /** Чтение папки шрифтов и проверка существуют ли они */
  fs.readdir(filePaths.build.fonts, (err, fontFiles) => {
    if (fontFiles) {
      /** Проверка, существует ли файл стилей для подключения шрифтов */
      if (!fs.existsSync(fontStylesFile)) {
        /** Если файла нет, создаем его */
        fs.writeFile(fontStylesFile, '', cb);
        let newFileOnly;

        fontFiles.forEach((file) => {
          /** Запись подключения шрифтов в файл стилей */
          const fileName = file.split('.')[0];

          if (newFileOnly !== fileName) {
            const [fontName, fontWeight = 'regular'] = fileName.split('-');
            const fontWeightValue = fontWeights[fontWeight.toLowerCase()];

            fs.appendFile(
              fontStylesFile,
              `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fileName}.woff2") format("woff2");\n\tfont-weight: ${fontWeightValue};\n\tfont-style: normal;\n}\n`,
              cb
            );

            newFileOnly = fileName;
          }
        });
      } else {
        /** Предупреждение, если файл есть - его нужно удалить */
        console.log(
          chalk.bold.white.bgGreenBright(
            'Файл scss/config/fonts.scss уже существует.\nДля обновления файла его нужно удалить!'
          )
        );
      }
    }
  });

  return gulp.src(filePaths.srcFolder);

  function cb(err) {
    if (err) {
      console.log(chalk.bold.white.bgRed('Ошибка записи файла: '), err);
    } else {
      console.log(
        chalk.bold.white.bgGreenBright('[Файл fonts.scss успешно записан]')
      );
    }
  }
};

export { otfToTtf, ttfToWoff, fontStyle };
