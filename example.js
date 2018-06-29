'use strict';

const gulpDmn = require('./index');


gulpDmn(
    __dirname, 
    {dryRun: false, list: false}, 
    function(){console.log('callback for gulp to proceed to the next task');}
);