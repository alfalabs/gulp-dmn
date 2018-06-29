# gulp-dmn


*Because I don't need your tests in my production!*

---
**dmn** (*"<b>d</b>ependency <b>m</b>i<b>n</b>ifier" or "<b>d</b>amn <b>m</b>issing .<b>n</b>pmignore" or "<b>d</b>mn is a <b>m</b>eaningless <b>n</b>ame"*) - is a 
wrapper for command line utility `dmn`  
Operations are based on list of ignore targets in `lib/targets.js`

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
            install({args: ['--only=production' ]})
        ], _cb);
    }

    /** 2. purge node_modules folder */
    function step2(_cb){
       gulpDmn(dest, {dryRun: false, list: false}, _cb);
    }

    /** 3. JavaScript is the superior language */
});
```


## Credits
dmn crator [Ivan Nikulin](https://github.com/inikulin) (ifaaan@gmail.com)

