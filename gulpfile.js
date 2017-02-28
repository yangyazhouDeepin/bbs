var gulp = require('gulp'),
	sass = require('gulp-sass'),
	webserver = require('gulp-webserver')


	var htmlFiles = ['src/html/**/*'];
	gulp.task("copy-html", function(){
		return gulp.src(htmlFiles)
		.pipe(gulp.dest("dist/html"))
	});
	//编译sass文件
	var scssFiles = ['src/sass/**/*'];
	gulp.task("copy-sass",function(){
		return gulp.src(scssFiles)
		.pipe(sass().on("error",sass.logError))    //当sass有错误时,服务不会挂,继续执行
		.pipe(gulp.dest("dist/css"))
	});

	//复制img
	var imgFiles = ['src/image/**/*'];
	gulp.task("copy-img",function(){
		gulp.src(imgFiles)
		.pipe(gulp.dest("dist/image"));
	});

	//复制index.html 文件
	gulp.task("copy-index",function(){
		gulp.src("src/index.html")
		.pipe(gulp.dest("dist"));
	});

	var jsFiles = 'src/js/**/*';
	gulp.task('copy-js',function(){
		gulp.src(jsFiles)
		.pipe(gulp.dest("dist/js"));
	})

	gulp.task("server",function(){
		gulp.src("./")
		.pipe(webserver({
			livereload: true,
			directoryListing:{
				enable: true,
				path: './'
			},
			port: '8888',
			host: '10.0.13.58'
		}))
	})
	
	gulp.task('watch',function(){
		gulp.watch(scssFiles,['copy-sass']);
		gulp.watch(imgFiles,['copy-img']);
		gulp.watch(htmlFiles,['copy-html']);
		gulp.watch(jsFiles,["copy-js"]);
		gulp.watch("src/index.html",["copy-index"]);
	})

	gulp.task("default",['watch','server']);
