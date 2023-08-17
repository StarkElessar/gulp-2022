import gulp from 'gulp';
import webpHtml from 'gulp-webp-html-nosvg';
import versionNumber from 'gulp-version-number';
import htmlMin from 'gulp-htmlmin';
import pug from 'gulp-pug';

import data from '../../src/static/data.json' assert { type: 'json' };
import { filePaths } from "../config/paths.js";
import { plugins } from "../config/plugins.js";

const html = (isBuild) => {
	return gulp
		.src(filePaths.src.html)
		.pipe(plugins.handleError('PUG'))
		.pipe(
			pug({
				/** File compression */
				pretty: true,
				/** Show in the terminal which file has been processed */
				verbose: true,
				locals: { data },
			})
		)
		.pipe(plugins.replace(/@img\//g, 'images/'))
		.pipe(plugins.if(isBuild, webpHtml()))
		.pipe(
			htmlMin({
				useShortDoctype: true,
				sortClassName: true,
				removeComments: isBuild,

				/** Uncomment if html minification is required */
				// collapseWhitespace: isBuild,
			})
		)
		.pipe(
			plugins.if(
				isBuild,
				versionNumber({
					value: '%DT%',

					append: {
						key: '_v',
						cover: 0,
						to: ['css', 'js'],
					},

					output: {
						file: 'gulp/version.json',
					},
				})
			)
		)
		.pipe(gulp.dest(filePaths.buildFolder))
		.pipe(plugins.browserSync.stream());
};

export { html };
