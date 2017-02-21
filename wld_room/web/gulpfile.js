//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方  基础库

    // livereload = require('gulp-livereload');  // 本地监听
    //css
    // less = require('gulp-less');  // less转化成css
    //js
    uglify = require('gulp-uglify');  // js压缩插件
    rename = require('gulp-rename'); // 文件重命名
    sourcemaps = require('gulp-sourcemaps'); // 来源地图
    //image
    // imagemin = require('gulp-imagemin'); // 图片压缩
    // pngquant = require('imagemin-pngquant'); // 深度压缩
    // changed = require('gulp-changed'); // 只操作有过修改的文件
    

//定义一个testLess任务（自定义任务名称）
// gulp.task('testLess', function () {
//     gulp.src('src/less/index.less') //该任务针对的文件
//         // .pipe(less()) //该任务调用的模块
//         .pipe(gulp.dest('src/css')) //将会在src/css下生成index.css
//         // .pipe(livereload());
// });


//压缩js任务
gulp.task('script', function () {
    gulp.src(['src/js/home/*.js','!*.min.js']) 
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify({ preserveComments:'some' }))
        .pipe(sourcemaps.write('maps')) // 地图输出路径（存放位置）
        .pipe(gulp.dest('dist/js'));
});

//压缩图片任务
// gulp.task('images', function(){
//   return gulp.src('src/images/**/*.{png,jpg,gif,svg}') // 指明源文件路径、并进行文件匹配
//     .pipe(changed('dist/images')) // 对比文件是否有过改动（此处填写的路径和输出路径保持一致）
//     .pipe(imagemin({
//       progressive: true, // 无损压缩JPG图片
//       svgoPlugins: [{removeViewBox: false}], // 不移除svg的viewbox属性
//       use: [pngquant()] // 使用pngquant插件进行深度压缩
//     }))
//     .pipe(gulp.dest('dist/images')); // 输出路径
// });


// gulp.task('default',['testLess','script','images']); //定义默认任务

// gulp.task('watch',function(){
// 	livereload.listen();
// 	gulp.watch('src/less/**/*.less', ['testLess']);
// });

//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径