import { plugins } from '../config/plugins.js';
import { filePaths } from '../config/paths.js';

const server = () => {
  plugins.browserSync.init({
    server: {
      baseDir: filePaths.buildFolder,
    },
    logLevel: 'info',
    cors: true,
    notify: true,
    port: 3000,
  });
};

export { server };
