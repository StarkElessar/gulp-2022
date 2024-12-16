import { filePaths } from '../config/paths.js';

export const server = (instance) => {
	instance.init({
		server: {
			baseDir: filePaths.buildFolder,
		},
		logLevel: 'info',
		cors: true,
		notify: true,
		open: false,
		reloadOnRestart: true,
		port: 3000,
	});
};
