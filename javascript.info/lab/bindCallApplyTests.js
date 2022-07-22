"use strict";

function work(a, b, c) {
    let j = 0;
    for (let i = 0; i < arguments.length; i++) {
        j += arguments[i];
    }
    return j + this.z;
}


const obj = {
    z: 69
};


const a = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
];

const totalIters = 1e8;


for (let j = 0; j < 4; j++) {
    console.log("------");

    console.time('apply-ing');
    for (let i = 0; i < totalIters; i++) {
        work.apply(obj, a);
    }
    console.timeEnd('apply-ing');

    console.time('call-ing');
    for (let i = 0; i < totalIters; i++) {
        work.call(obj, 1, 2, 3);
    }
    console.timeEnd('call-ing');

    console.time('call-ing (by ... the array)');
    for (let i = 0; i < totalIters; i++) {
        work.call(obj, ...a);
    }
    console.timeEnd('call-ing (by ... the array)');

    const bound = work.bind(obj);
    console.time('bind-ing (this only)');
    for (let i = 0; i < totalIters; i++) {
        bound(1, 2, 3);
    }
    console.timeEnd('bind-ing (this only)');

    const bound2 = work.bind(obj, 1, 2, 3);
    console.time('bind-ing (with params)');
    for (let i = 0; i < totalIters; i++) {
        bound2();
    }
    console.timeEnd('bind-ing (with params)');
}
