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
	gulpif = require('gulp-if'),
	del = require('del'),
	rename = require('gulp-rename'),
	path = require('path'),
	gutil = require('gulp-util'),
	uglify = require('gulp-uglify'),
	less = require('gulp-less'),
	livereload = require('gulp-livereload');

var options = require("minimist")(process.argv.slice(2));
var buildDir = options.production?pkg.project.dist:pkg.project.build;

var browserified = browserify({
	cache: {},
    packageCache: {},
	entries: pkg.project.source+pkg.project.bundle.main,
	debug:true,
	transform:[
		[stringify,{extensions: ['.html']}]
	]
});

var watchified = watchify(browserified);

function bundle(b){
	var basename = path.basename(buildDir+pkg.project.bundle.dest);
	var dirname = path.dirname(buildDir+pkg.project.bundle.dest);
	return b
	    .bundle()
		.on('error', gutil.log.bind(gutil, 'Browserify Error'))
	   	.pipe(source(basename))
	   	.pipe(buffer())
	   	.pipe(sourcemaps.init({loadMaps: true}))
	   	.pipe(gulpif(options.production, uglify()))
    	.pipe(sourcemaps.write('./'))
    	.pipe(gulp.dest(dirname))
    	.pipe(livereload());
}

/**
 * Clean build directory
 */
gulp.task('clean', function(cb) {
  return del([buildDir+'/*']);
});

/**
 * Launch dev server
 */
gulp.task('connect',function(){
	connect.server({
		root:buildDir,
		port:pkg.project.server.port,
		livereload:{
			port:pkg.project.server['livereload-port']
		}
	});
	 livereload.listen({
	 	port:pkg.project.server['livereload-port']
	 });
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
        	bundleJS: pkg.project.bundle.dest,
        	bundleCSS: pkg.project.bundle.css+'/bundle.css',
        }))
        .pipe(gulp.dest(buildDir));
});

gulp.task('assets',function(){
	return gulp.src(pkg.project.source+pkg.project.bundle.assets+'/**/*')
	.pipe(gulp.dest(buildDir+pkg.project.bundle.assets))
	.pipe(livereload());
});


gulp.task('less', function () {
  return gulp.src(pkg.project.source+'/less/bundle.less')
  	.on('error', gutil.log)
    .pipe(less())
    .pipe(buffer())
	   	.pipe(sourcemaps.init({loadMaps: true}))
	   		//.pipe(uglify())
    	.pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(buildDir+pkg.project.bundle.css))
    .pipe(livereload());
});


gulp.task('default',function(){
	if(options.production){
		return runSequence(
			['clean'],
			['build-index','assets','browserify','less'],
			['connect']
		);
	}else{
		gulp.watch(pkg.project.source+'/**/*.less',['less']);
		gulp.watch(pkg.project.source+'/assets/**/*',['assets']);
		runSequence(
			['clean'],
			['build-index','assets','watchify','less'],
			['connect']
		);
	}
	

});



