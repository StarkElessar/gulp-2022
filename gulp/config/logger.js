import plumber from 'gulp-plumber'; // Обработка ошибок
import notify from 'gulp-notify'; // Сообщения (подсказки)
import chalk from 'chalk';

class Logger {
	handleError(taskName) {
		return plumber({
			errorHandler: notify.onError({
				title: taskName,
				message: 'Error: <%= error.message %>',
			}),
		});
	};

	warning(message) {
		console.log(chalk.bold.white.bgGreenBright(message));
	}

	error(message, errors = []) {
		console.log(chalk.bold.white.bgRed(message), errors);
	}
}

export const logger = new Logger();