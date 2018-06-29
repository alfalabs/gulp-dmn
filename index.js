'use strict';
const co = require('co'); // for IDIOTENKODE, gets generator function returning Promise and yelds Promise result - bla-bla-bla
const clean = require('./lib/clean'); // generator function

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

/*  IDIOTENKODE:
    some programmers, let's call them see-blunt, like C!# or see-minus-minus, like C--
    can not understand that JavaScript is a superior language - asynchronous and non blocking.
    There is so much effort and wasted energy to convert it to a linear spagetti code as in C languages.

    promises - are for politicians not to keep.
    classes - are for uneducated (go to school)
    types - are for...

*/