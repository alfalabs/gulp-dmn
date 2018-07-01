'use strict';
const co = require('co'); // for C!#, gets generator function returning Promise and yelds Promise result - bla-bla-bla
const clean = require('./clean'); // generator function

module.exports = function(projectDir, opts, cb){

    var response;

    co(function* () {
        //try {
            response = yield clean(projectDir, opts);
            //console.log(response);
            if (typeof cb==='function') cb();
        // }
        // catch (err) {
        //     console.error(err);
        // }    
    })();
};

/*  C!#  read see-blunt
    There is so much effort and wasted energy to convert asynchronous JS to a linear spagetti code as in C languages.

    promises - are for politicians not to keep.
    classes - are for uneducated (go to school)
    types - are for...

*/