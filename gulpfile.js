"use strict";

const gulp = require('gulp');
const less = require('gulp-less');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const merge = require('merge-stream');

function mincss() {
	return gulp.src('css/*')
		.pipe(less())
		.pipe(minifyCSS())
		.pipe(gulp.dest('build/css'))
	}

function clean() {
	return del(["./vendor/"]);
}

function initVendorDir() {
	var bootstrap = gulp.src('node_modules/bootstrap/dist/**/*')
		.pipe(gulp.dest('build/vendor/bootstrap'));
	var fontAwesomeCSS = gulp.src('node_modules/@fortawesome/fontawesome-free/css/**/*')
		.pipe(gulp.dest('build/vendor/fontawesome-free/css'));
	var fontAwesomeWebfonts = gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/**/*')
		.pipe(gulp.dest('build/vendor/fontawesome-free/webfonts'));
	var jqueryEasing = gulp.src('node_modules/jquery.easing/*.js')
		.pipe(gulp.dest('build/vendor/jquery-easing'));
	var jquery = gulp.src([
			'node_modules/jquery/dist/*',
			'!node_modules/jquery/dist/core.js'
			])
		.pipe(gulp.dest('build/vendor/jquery'));
	var simpleLineIconsFonts = gulp.src('node_modules/simple-line-icons/fonts/**')
		.pipe(gulp.dest('build/vendor/simple-line-icons/fonts'));
	var simpleLineIconsCSS = gulp.src('node_modules/simple-line-icons/css/**')
		.pipe(gulp.dest('build/vendor/simple-line-icons/css'));
	return merge(bootstrap, fontAwesomeCSS, fontAwesomeWebfonts, jquery, jqueryEasing, simpleLineIconsFonts, simpleLineIconsCSS);
}

function img() {
	var imgdir = gulp.src('img/**/*')
		.pipe(gulp.dest('build/img'));
	return merge(imgdir);
}

function docs() {
	var imgdir = gulp.src('docs/**/*')
		.pipe(gulp.dest('build/docs'));
	return merge(imgdir);
}

function html() {
	return gulp.src('index.html')
		.pipe(gulp.dest('build'))
}

function js() {
	return gulp.src('*.js')
		.pipe(gulp.dest('build'))
}

exports.css = mincss;
exports.html = html;
exports.js = js;
exports.vendor = initVendorDir;
exports.img = img;
exports.docs = docs;
exports.default = gulp.parallel(html, mincss, initVendorDir, img, js, docs);