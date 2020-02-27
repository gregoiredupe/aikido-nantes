"use strict";

const { src, dest, parallel } = require('gulp');
const less = require('gulp-less');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const merge = require('merge-stream');

function mincss() {
	return src('css/*')
		.pipe(less())
		.pipe(minifyCSS())
		.pipe(dest('build/css'))
	}

function clean() {
	return del(["./vendor/"]);
}

function initVendorDir() {
	var bootstrap = src('node_modules/bootstrap/dist/**/*')
		.pipe(dest('build/vendor/bootstrap'));
	var fontAwesomeCSS = src('node_modules/@fortawesome/fontawesome-free/css/**/*')
		.pipe(dest('build/vendor/fontawesome-free/css'));
	var fontAwesomeWebfonts = src('node_modules/@fortawesome/fontawesome-free/webfonts/**/*')
		.pipe(dest('build/vendor/fontawesome-free/webfonts'));
	var jqueryEasing = src('node_modules/jquery.easing/*.js')
		.pipe(dest('build/vendor/jquery-easing'));
	var jquery = src([
			'node_modules/jquery/dist/*',
			'!node_modules/jquery/dist/core.js'
			])
		.pipe(dest('build/vendor/jquery'));
	var simpleLineIconsFonts = src('node_modules/simple-line-icons/fonts/**')
		.pipe(dest('build/vendor/simple-line-icons/fonts'));
	var simpleLineIconsCSS = src('node_modules/simple-line-icons/css/**')
		.pipe(dest('build/vendor/simple-line-icons/css'));
	return merge(bootstrap, fontAwesomeCSS, fontAwesomeWebfonts, jquery, jqueryEasing, simpleLineIconsFonts, simpleLineIconsCSS);
}

function img() {
	var imgdir = src('img/**/*')
		.pipe(dest('build/img'));
	return merge(imgdir);
}

function html() {
	return src('index.html')
		.pipe(dest('build'))
}

exports.css = mincss;
exports.html = html;
exports.vendor = initVendorDir;
exports.img = img;
exports.default = parallel(html, mincss, initVendorDir, img);