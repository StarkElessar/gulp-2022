import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css'; // CSS file compression
import webpCss from 'gulp-webpcss'; // Output WEBP images
import groupMediaQueries from 'gulp-group-css-media-queries';
import autoprefixer from 'autoprefixer';
import postcss from 'gulp-postcss';
import sourcemaps from "gulp-sourcemaps";
import postcssPresetEnv from 'postcss-preset-env';

import { filePaths } from '../config/paths.js';
import { plugins } from '../config/plugins.js';

const sass = gulpSass(dartSass);

const scss = (isBuild) => {
	const webpConfig = {
		webpClass: '.webp',
		noWebpClass: '.no-webp',
	};

	return gulp
		.src(filePaths.src.scss)
		.pipe(plugins.if(!isBuild, sourcemaps.init()))
		.pipe(plugins.handleError('SCSS'))

		.pipe(sass({outputStyle: 'expanded'}, false))
		.pipe(plugins.replace(/@img\//g, '../images/'))

		/** Grouping media requests for production only */
		.pipe(plugins.if(isBuild, groupMediaQueries()))

		.pipe(plugins.if(isBuild, webpCss(webpConfig)))
		.pipe(plugins.if(isBuild, postcss([autoprefixer(), postcssPresetEnv()])))

		/** Uncomment if you need an uncompressed duplicate of the style file */
		// .pipe(gulp.dest(filePaths.build.css))

		.pipe(plugins.if(isBuild, cleanCss()))
		.pipe(rename({extname: '.min.css'}))
		.pipe(plugins.if(!isBuild, sourcemaps.write('./')))
		.pipe(gulp.dest(filePaths.build.css))
		.pipe(plugins.browserSync.stream());
};

export { scss };
