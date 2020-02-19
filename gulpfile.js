let gulp = require('gulp');

var run = {
	less: require('gulp-less'),
	concat: require('gulp-concat'),
	css_minify: require('gulp-csso'),
	css_beutify: require('gulp-cssbeautify'),
	js_minify: require('gulp-uglify'),
	js_beutify: require('gulp-jsbeautifier'),
	plumber: require('gulp-plumber'),
	rename: require('gulp-rename'),
	path: require('path'),
};

let build_styles  = run.path.resolve('.');
let build_scripts = run.path.resolve('.');
let build_assets  = run.path.resolve('./sources');


function less_watcher() {
	return gulp.watch([build_assets + "/*.less" ], less_builder);
}

function less_builder() {
	return gulp.src( build_assets + "/*.less")
		.pipe(run.plumber())
		.pipe(run.less())
		.pipe(run.rename(function (path) {
			path.extname = ".min.css"
		}))
		.pipe(run.css_minify())
		.pipe(run.plumber.stop())
		.pipe(gulp.dest( build_styles + "/" ))
}

function css_minify_watcher() {
	return gulp.watch([ build_styles + "/*.min.css" ], css_minify);
}

function css_minify() {
	return gulp.src(build_styles + "/*.min.css")
		.pipe(run.plumber())
		.pipe(run.rename(function (path) {
			path.basename = path.basename.replace(".min", "")
			path.extname = ".css"
		}))
		.pipe(run.css_beutify())
		.pipe(run.plumber.stop())
		.pipe(gulp.dest(build_styles + "/"))
}

function js_watcher() {
	return gulp.watch([ build_assets + "/*.js"], js_minify);
}


function js_minify() {
	return gulp.src([ build_assets + "/*.js"])
		.pipe(run.plumber())
		.pipe(run.rename(function (path) {
			path.extname = ".min.js"
		}))
		.pipe(run.js_minify())
		.pipe(run.plumber.stop())
		.pipe(gulp.dest( build_scripts + "/"))
}

function js_watcher() {
	return gulp.watch([ build_scripts + "/*.min.js" ], js_beutify );
}

function js_beutify() {
	return gulp.src([ build_scripts + "/*.min.js"])
		.pipe(run.plumber())
		.pipe(run.rename(function (path) {
			path.basename = path.basename.replace(".min", "")
			path.extname = ".js"
		}))
		.pipe(run.js_beutify())
		.pipe(run.plumber.stop())
		.pipe(gulp.dest( build_scripts + "/"))
}

exports.default = gulp.parallel(
	gulp.parallel(less_watcher, css_minify_watcher, js_watcher),
	gulp.parallel(less_builder, js_minify, js_beutify,),
);
