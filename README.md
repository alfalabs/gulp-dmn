# gulp-dmn


*Because I don't need your tests in my production!*

---
**dmn** (*"<b>d</b>ependency <b>m</b>i<b>n</b>ifier" or "<b>d</b>amn <b>m</b>issing .<b>n</b>pmignore" or "<b>d</b>mn is a <b>m</b>eaningless <b>n</b>ame"*)  
**gulp-dmn** is a wrapper for command line utility  [dmn](http://inikulin.github.io/dmn/).
Operations are based on list of ignore targets in `targets.js`

## Install
```
npm install gulp-dmn --save-dev
```

## Usage
```javascript
const gulpDmn = require('gulp-dmn');

var dest = 'your_build_folder';

gulp.task('npm-purge', function(cb){
    gulpDmn(dest, {dryRun: false, list: false}, cb);
});

dest - path to node_modules folder to be processed, usually /build folder
{dryRun: true, list:true} - shows list of files to be deleted without deleting them
```

## advanced example
install dependencies and cleanup after, in one gulp task
```javascript
const gulpDmn = require('gulp-dmn');
const install = require('gulp-install');
const pump = require('pump'); 

var dest = 'your_build_folder';

gulp.task('npm-install-and-purge', function(cb){

    // callback heaven! hell for C!# (read: see-blunt) programmers! 
    // promises are for politicians not to keep
    step1(function(){
        step2(cb);
    });

    /** 1. run npm install */
    function step1(_cb){
        pump([
            gulp.src([`${dest}package.json`]), 
            install({args: ['--only=production' ]}),
            gulp.dest(dest)
        ], _cb);
    }

    /** 2. purge node_modules folder */
    function step2(_cb){
       gulpDmn(dest, {dryRun: false, list: false}, _cb);
    }

    /** 3. JavaScript is the superior language */
});
```
## copy node_modules with symbolic links to production
try [copy-with-symlinks](https://www.npmjs.com/package/copy-with-symlinks)

## similar utility for bower

npm: [bower-purge](https://www.npmjs.com/package/bower-purge)  
github: [bower-purge](https://github.com/alfalabs/bower-purge)

## requirements
tested on Win7 with NodeJS v8 and gulp v3
## Credits
dmn crator [Ivan Nikulin](https://github.com/inikulin) (ifaaan@gmail.com)

