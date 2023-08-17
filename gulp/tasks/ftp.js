import gulp from 'gulp';
import vinylFTP from 'vinyl-ftp';
import util from 'gulp-util';

import { configFTP } from '../config/ftp.js';
import { filePaths } from '../config/paths.js';
import { plugins } from '../config/plugins.js';

const ftp = () => {
  configFTP.log = util.log;
  const ftpConnect = vinylFTP.create(configFTP);

  return gulp
    .src(`${filePaths.buildFolder}/**/*.*`, {})
    .pipe(plugins.handleError('FTP'))
    .pipe(ftpConnect.dest(`/${filePaths.ftp}/${filePaths.projectDirName}`));
};

export { ftp };