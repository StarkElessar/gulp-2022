const copyRootFiles = () => {
  const config = {
    dot: true,
    allowEmpty: true,
  };
  /** Добавляем файлы, которые нужны в корне проекта */
  const files = ['favicon.ico', '.htaccess'];

  return app.gulp
    .src(app.plugins.concat(app.path.srcFolder, files), config)
    .pipe(app.gulp.dest(app.path.buildFolder));
};

export { copyRootFiles };