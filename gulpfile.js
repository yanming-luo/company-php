//更动通知 (gulp-notify)
var version = 'v1.1.0',
	dest = 'static-mb/'+version,
	gulp = require('gulp'),							//导入工具包
	sass = require('gulp-sass'),				//编译Sass (gulp-ruby-sass)
	// autoprefixer = require('gulp-autoprefixer'),	//Autoprefixer (gulp-autoprefixer)
	minifycss = require('gulp-minify-css'),			//缩小化(minify)CSS (gulp-minify-css)
	// csslint = require('gulp-csslint'),				//
	// assetpaths = require('gulp-assetpaths'),		//替换图片路劲
	// jshint = require('gulp-jshint'),				//JSHint (gulp-jshint)
	uglify = require('gulp-uglify'),				//丑化(Uglify) (gulp-uglify)
	imagemin = require('gulp-imagemin'),			//图片压缩 (gulp-imagemin)
	clean = require('gulp-clean'),					//清理档案 (gulp-clean)
	// concat = require('gulp-concat'),				//拼接 (gulp-concat)
	// notify = require('gulp-notify'),				//显示报错信息(gulp-notify)
	// rename = require('gulp-rename'),				
	// cache = require('gulp-cache'),					//图片快取，只有更改过得图片会进行压缩 (gulp-cache)
	livereload = require('gulp-livereload');		//即时重整(LiveReload) (gulp-livereload)

gulp.task('cssmin', function(){
	return gulp.src('dist/**/*.css')
			.pipe(minifycss())
			.pipe(gulp.dest(dest))
			.pipe(livereload());
});

gulp.task('sass', function(){
	return gulp.src('dist/**/*.scss')
			.pipe(sass())
			.pipe(minifycss())
			.pipe(gulp.dest(dest))
			.pipe(livereload());
});

gulp.task('jsmin', function(){
	return gulp.src(['dist/**/*.js','!dist/assets/**/*.min.js'])
			.pipe(uglify({
				mangle: {except: ['require' ,'exports' ,'module' ,'$']}
			}))
			.pipe(gulp.dest(dest))
			.pipe(livereload());
});

gulp.task('minjs', function(){
	return gulp.src('dist/**/*.min.js')
			.pipe(gulp.dest(dest));
});

gulp.task('imagesmin', function(){
	return gulp.src('dist/**/*.{png,jpg,gif,svg,ico}')
			.pipe(imagemin())
			.pipe(gulp.dest(dest))
			.pipe(livereload());
});

gulp.task('clean', function() {
    gulp.src(['assets/css-mb', 'assets/js-mb', 'assets/images-mb'], {read: false})
        .pipe(clean());
});

// 默认任务 清空图片、样式、js并重建 运行语句 gulp
gulp.task('default', ['clean'], function(){
    gulp.start('cssmin','sass','jsmin','minjs','imagesmin');
});

//// 监听任务 运行语句 gulp watch
gulp.task('watch', function() {
    gulp.watch('dist/**/*.css', ['cssmin']);
    gulp.watch('dist/**/*.scss', ['sass']);
    gulp.watch(['dist/**/*.js','!dist/assets/**/*.min.js'], ['jsmin']);
    gulp.watch('dist/**/*.min.js', ['minjs']);
    gulp.watch('dist/**/*.{png,jpg,gif,svg,ico}', ['imagesmin']);
});
