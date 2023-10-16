const gulp = require("gulp");
const pug = require("gulp-pug");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const browserSync = require("browser-sync").create();

gulp.task("build:pug", () => {
    return gulp.src("src/*.pug").pipe(pug()).pipe(gulp.dest("build"));
});

gulp.task("build:scss", () => {
    return gulp
        .src("src/scss/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(postcss())
        .pipe(gulp.dest("build/css"));
});

gulp.task("build:images", () => {
    return gulp
        .src("src/img/**/*", {
            dot: true,
            allowEmpty: true,
        })
        .pipe(gulp.dest("build/img"));
});

gulp.task("build", gulp.parallel("build:pug", "build:scss", "build:images"));

gulp.task("serve", () => {
    browserSync.init({
        server: {
            baseDir: "build",
        },
    });
});

gulp.task("watch", () => {
    gulp.watch("src/**/*.pug", gulp.series("build:pug"));
    gulp.watch("src/scss/**/*.scss", gulp.series("build:scss"));
    gulp.watch("src/img/**/*", gulp.series("build:images"));
    gulp.watch("build/**/*").on("change", browserSync.reload);
});

gulp.task("default", gulp.series("build", gulp.parallel("serve", "watch")));
