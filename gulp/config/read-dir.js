import { promises } from "fs";
import { extname } from "path";

export const readDir = async (directoryPath) => {
	const result = {};
	try {
		const files = await promises.readdir(directoryPath);
		// Фильтрация файлов с расширением .js
		const jsFiles = files.filter(file => extname(file) === '.js');
		// Вывод найденных .js файлов
		console.log('JS файлы в директории: ', jsFiles);

		jsFiles.forEach((file) => {
			const [name] = file.split('.');
			result[name] = `./${file}`;
		});

		return result;
	} catch (err) {
		console.error('Ошибка чтения директории:', err);
	}
};