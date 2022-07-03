'use strict';

// 1 ==========================================================================
// as an experiment, i also tried to make it so the function could change its
// own function object within itself by using `call()`. it works, even in
// firefox. this is sort of cheating, because the context for this is provided
// by call.
let f0 = function() { 
    this.someProp = 'hello';
}


f0(); 
f0.call(f0);
f0.someProp === 'hello';


// 2 ==========================================================================
// true empty object suitable as a hashmap. all hashmap keys in javascript must
// be convertible to string apparently
let emptyObject = Object.create(null)

// javascript also has this map object which takes any key.
// you can read more about it in [1]
let someMap = new Map();
someMap.set(-99, 4);
someMap.set(3, 4);
someMap.set(2, 6);
someMap.set(1, 700);
someMap.set(0, 99);
someMap.set(-1, 990);
someMap.set({a: 6}, 888);
someMap.set({a: 9}, 889);

// it seems to retain order of insertion
for(let [key, value] of someMap) {
    console.log(`${key}: ${value}`);
}

// strangely enough the keys of a normal object ARE ordered, even tho it only 
// accepts types that can be converted to string (which would suggest a
// hashmap rather than a binary tree). according to `[3]`, one shouldn't rely
// on this ordering. it also indicates `Map` is actually faster for adding and
// removing keys.

// 3 ==========================================================================
// the name of a symbol seems to be completely meaningless outside
// documentation purposes
const func1Symbol = Symbol('func1');

class Class0 {
    [func1Symbol]() { return 'hello'; }
}

const i00 = new Class0();
//console.log(i00.func1()); // doesnt work
console.log(i00[func1Symbol]());

// `[4]` lists a nummber of static properties for the global Symbol class. this
// can act as a global symbol registry. this includes `toStringTag`, which is
// used internally by `toString()`


class Class1 {
    // you have to add the `get` if you want toString() to be able to use it
    get [Symbol.toStringTag]() {
        return 'poop';
    }
}

const i10 = new Class1();

// notice the toString() method adds certain formatting, and that there is no
// additional direct `toString()` symbol.
console.log(i10.toString());

// 4 ==========================================================================


