"use strict";

const gulp = require('gulp');
const less = require('gulp-less');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const merge = require('merge-stream');
const { src, dest, series } = require('gulp');
const markdown = require('gulp-markdown');
const rename = require('gulp-rename');
const fileInclude = require('gulp-file-include');
const path = require("path");
const template = require('gulp-template');

const LOCALES_PATH = "locales";
const DIST_PATH = "build";

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

function htmlFactory(lang) {
	return function html() {
		const dict = require('./'+LOCALES_PATH + '/' + lang+'.json');
		return gulp.src('index.html')
			.pipe(
				template(dict)
			)
			.pipe(fileInclude({
				prefix: '@@',
				basepath: 'tmp/includes/'+lang
			}))
    		.pipe(gulp.dest(DIST_PATH+'/'+lang));
	}
}

function js() {
	return gulp.src('*.js')
		.pipe(gulp.dest('build'))
}

function mdToHtmlFactory(lang) {
	return function mdToHtml() {
		return gulp.src('includes/'+lang+'/*.md')
			.pipe(markdown())
			.pipe(rename({ extname: '.html' }))
			.pipe(dest('tmp/includes/'+lang));
	}
}

exports.mdToHtml = mdToHtmlFactory;
exports.css = mincss;
exports.html = htmlFactory;
exports.js = js;
exports.vendor = initVendorDir;
exports.img = img;
exports.docs = docs;

function main(done) {
	const locales = fs.readdirSync(LOCALES_PATH);
	const tasks = locales.reduce((acc,localeFile) => {
		const lang = path.basename(localeFile, ".json");
		console.log("lang="+lang);
		acc.push(mdToHtmlFactory(lang));
		acc.push(htmlFactory(lang));
		return acc
	},[]);
	tasks.push(mincss);
	tasks.push(initVendorDir);
	tasks.push(img);
	tasks.push(js);
	tasks.push(docs);
	return tasks;
}

exports.default = gulp.series(main());
