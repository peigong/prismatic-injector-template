'use strict';

var del = require('del');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();

// 清理构建输出
gulp.task('clean', function(){
    del.sync(['template.md', './dist/**']);
});

// 复制模板开发规范
gulp.task('build:doc', function(){
    return gulp.src('node_modules/prismatic-injector/doc/template.md')
        .pipe(gulp.dest('.'));
});

// 复制针头脚本
gulp.task('build:needle', function(){
    return gulp.src('node_modules/prismatic-injector/lib/needle.js')
        .pipe(gulp.dest('./dist'));
});

// 复制宿主页面
gulp.task('build:parasitifer', function(){
    return gulp.src('node_modules/prismatic-injector-stub/src/index.html')
        .pipe(gulp.dest('./dist'));
});

// 构建模板
gulp.task('build:templates', function(){
    var dest = './dist/templates/fullscreenbar',
        js = dest + '/js';
    gulp.src('./src/templates/js/config/**')
        .pipe($.concat('config.js'))
        .pipe(gulp.dest(js));
    gulp.src('./src/templates/js/filters/**')
        .pipe($.concat('filters.js'))
        .pipe(gulp.dest(js));
    gulp.src('./src/templates/js/factories/**')
        .pipe($.concat('factories.js'))
        .pipe(gulp.dest(js));
    gulp.src('./src/templates/js/directives/**')
        .pipe($.concat('directives.js'))
        .pipe(gulp.dest(js));
    gulp.src('./src/templates/js/services/**')
        .pipe($.concat('services.js'))
        .pipe(gulp.dest(js));
    gulp.src('./src/templates/js/controllers/**')
        .pipe($.concat('controllers.js'))
        .pipe(gulp.dest(js));
    gulp.src([
        './src/templates/js/angular.js',
        './src/templates/js/insert.js',
        './src/templates/js/lstore.js',
        './src/templates/js/settings.js',
        './src/templates/js/ui-core.js',
        './src/templates/js/pages/templates.js'
    ], { base: './src/templates' })
        .pipe(gulp.dest(dest));
    return gulp.src(['./src/templates/template.json', './src/templates/css/**', './src/templates/images/**'], { base: './src/templates' })
        .pipe(gulp.dest(dest));
});

// 复制数据服务桩文件
gulp.task('build:stub', function(){
    return gulp.src('./src/stub/**')
        .pipe(gulp.dest('./dist/stub'));
});

// 实时运行宿主页面
gulp.task('serve', function(){
    var settings = {
        server: {
            baseDir: './dist'
        }
    }
    browserSync.init(settings);

    gulp.watch(['./dist/**'])
    .on('change', browserSync.reload);
});

gulp.task('default', ['clean', 'build:doc', 'build:needle', 'build:parasitifer', 'build:templates', 'build:stub']);
