import del from 'del';
import { filePaths } from '../config/paths.js';

const reset = () => del(filePaths.clean);

export { reset };