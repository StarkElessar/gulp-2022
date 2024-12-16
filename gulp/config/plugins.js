// Поиск и замена
import replace from 'gulp-replace';
// Локальный сервер для разработки
import browserSync from 'browser-sync';
// Проверка обновления
import newer from 'gulp-newer';
// Условное ветление
import ifPlugin from 'gulp-if';

const concatPathAndFileName = (path, files) => {
	return files.map((file) => `${path}/${file}`);
};

export const plugins = {
	if: ifPlugin,
	replace,
	browserSync,
	newer,
	concat: concatPathAndFileName,
};
