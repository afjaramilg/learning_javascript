'use strict';

// 1 ===========================================================================
// the 3 commented lines below dont work, `Function()` doesn't seem to be able
// to access environment variables

//let num0 = 10;
//let f0 = Function('n', 'return n + a;');
//console.log(f0());


// 2 ==========================================================================
// trying to create a "global" scope using var does not work with nodeJS. none
// of the following statements will even get past the interpreter, strict mode
// or not.

//console.log(`${valueA}, ${valueB}`);
const module0 = require('./module0.js');
//console.log(`${valueA}, ${valueB}`);
console.log(valueB);

