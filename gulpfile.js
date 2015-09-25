'use strict';

/**
 * Dependencies
 **/
var gulp = require('gulp'),
	pkg = require('./package.json'),
	runSequence = require('run-sequence'),
	connect = require('gulp-connect'),
	watchify = require('watchify'),
	browserify = require('browserify'),
	stringify = require('stringify'),
	sourcemaps = require('gulp-sourcemaps'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	template = require('gulp-template'),
	del = require('del'),
	rename = require('gulp-rename'),
	path = require('path'),
	gutil = require('gulp-util'),
	uglify = require('gulp-uglify'),
	less = require('gulp-less'),
	livereload = require('gulp-livereload');

var browserified = browserify({
	cache: {},
    packageCache: {},
	entries: pkg.project.source+pkg.project.bundle.main,
	debug:true
});

var watchified = watchify(browserified);

function bundle(b){
	var basename = path.basename(pkg.project.build+pkg.project.bundle.dest);
	var dirname = path.dirname(pkg.project.build+pkg.project.bundle.dest);
	return b
		.transform(stringify({
		  extensions: ['.html']/*,
		  minify: true,
		  minifier: {
		    extensions: ['.html'],
		    options: {
		      // html-minifier options 
		    }
		  }*/
		}))
	    .bundle()
		.on('error', gutil.log.bind(gutil, 'Browserify Error'))
	   	.pipe(source(basename))
	   	.pipe(buffer())
	   	.pipe(sourcemaps.init({loadMaps: true}))
	   		//.pipe(uglify())
    	.pipe(sourcemaps.write('./'))
    	.pipe(gulp.dest(dirname))
    	//.pipe(livereload());
}

/**
 * Clean build directory
 */
gulp.task('clean', function(cb) {
  return del([pkg.project.build+'/*']);
});

/**
 * Launch dev server
 */
gulp.task('connect',function(){
	connect.server({
		root:pkg.project.build,
		port:pkg.project.server.port/*,
		livereload:{
			port:pkg.project.server['livereload-port']
		}*/
	});
	 /*livereload.listen({
	 	port:pkg.project.server['livereload-port']
	 });*/
})

gulp.task('browserify',function(){
	return bundle(browserified);
});

gulp.task('watchify',function(){
	watchified.on('update',function(){
		bundle(watchified);
	});
	watchified.on('log', gutil.log);
	return bundle(watchified);
});

gulp.task('build-index',function(){
	return gulp.src(pkg.project.source+'/index.html')
        .pipe(template({
        	title:pkg.name,
        	bundle: pkg.project.bundle.dest
        }))
        .pipe(gulp.dest(pkg.project.build));
});

gulp.task('assets',function(){
	return gulp.src(pkg.project.source+pkg.project.bundle.assets+'/**/*')
	.pipe(gulp.dest(pkg.project.build+pkg.project.bundle.assets));
});


gulp.task('less', function () {
  return gulp.src(pkg.project.source+'/less/bundle.less')
  	.on('error', gutil.log)
    .pipe(less())
    .pipe(buffer())
	   	.pipe(sourcemaps.init({loadMaps: true}))
	   		//.pipe(uglify())
    	.pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(pkg.project.build+'/css'));
});
/*
gulp.task('less', function () {
  return gulp.src(pkg.project.source+'/bundle.less')
    .pipe(less())
    .pipe(gulp.dest(pkg.project.build+'/css'));
});
*/



gulp.task('default',function(){
	gulp.watch(pkg.project.source+'/**/*.less',['less']);
	runSequence(
		['clean'],
		['build-index','assets','watchify','less'],
		['connect']
	);

});



