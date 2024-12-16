import del from 'del';
import { filePaths } from '../config/paths.js';

export const reset = () => del(filePaths.buildFolder);
