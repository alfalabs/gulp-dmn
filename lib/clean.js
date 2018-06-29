const path = require('path'),
      fs = require('co-fs-extra'),
      thunk = require('thunkify'),
      targets = require('./targets');

var dirSize = require('du'),
    glob = require('globby');
    // console = require('./console_ex'),
   
var _options;

/**
 * Thunks
 */
dirSize = thunk(dirSize);
glob = thunk(glob);



/**
 * Measurement utils
 */
function toKbString(bytes) {
    return (bytes && (bytes / 1024).toFixed(2)) + ' Kb';
}

function percentsLess(newVal, oldVal) {
    return oldVal && (100 - 100 * newVal / oldVal).toFixed(1);
}


/**
 * Create array of patterns which will be used for cleaning
 */
function getCleanTargets() {
    var directDeps = targets.map(function (pattern) {
            return '*/' + pattern;
        }),

        indirectDeps = targets.map(function (pattern) {
            return '**/node_modules/*/' + pattern;
        });

    return directDeps.concat(indirectDeps);
}


/**
 * Remove files that should be ignored
 */
function* removeFiles(nmDir, filesToDelete, initialSize) {
  

    console.log('Deleting...');
   
    // Delete files in parallel
    yield filesToDelete.map(function (filePath) {
        filePath = path.join(nmDir, filePath);
        return fs.remove(filePath);
    });


    // Obtain new node_modules dir size
    var newSize = yield dirSize(nmDir);


    // Tell how awesome we are now
    console.log(`Done! 
Your node_modules in '${nmDir}'
directory size was ${toKbString(initialSize)} but now it\'s ${toKbString(newSize)} which is ${percentsLess(newSize, initialSize)}% less.`);
    

    return 'OK: cleaned';
}


/**
 * Clean module entry point
 */
module.exports = function* (projectDir, options) {
    var nmDir = path.join(projectDir, './node_modules');
    _options = options || {};

    console.log(`[gulp-dmn] ${_options.dryRun ? 'dryRun':''}`);
    console.log(`Searching for items to clean in: 
${nmDir}
(it may take a while for big projects)...`);
    


    // Ensure we have a node_modules dir
    var nmExists = yield fs.exists(nmDir);

    if (!nmExists) {
        console.log('No need for a clean-up: project doesn\'t have node_modules.');
        // console.ok('No need for a clean-up: project doesn\'t have node_modules.');
        return 'OK: no-deps';
    }


    // Get initial size of the node_modules dir and try
    // to fetch files to clean in parallel
    var initialSize = dirSize(nmDir),
        files = glob(getCleanTargets(), {cwd: nmDir});

    initialSize = yield initialSize;
    files = yield files;


    // Nothing to delete, we're done here
    if (!files.length) {
        console.log('No need for a clean-up: your dependencies are already perfect.');
        // console.ok('No need for a clean-up: your dependencies are already perfect.');
        return 'OK: already-perfect';
    }


    // Report about found items
    console.log(files.length + ' item(s) are set for deletion');
    // console.info(files.length + ' item(s) are set for deletion');

    if (options.list)
        console.log(files.join('\n'));
        // console.list(files);

    if (_options.dryRun) {
        console.log(`
[gulp-dmn]
dryRun nothing deleted.    ${files.length} item(s) found for deletion in ${nmDir}`);
        return 'OK: canceled';} // -- >

        return yield removeFiles(nmDir, files, initialSize);

};
