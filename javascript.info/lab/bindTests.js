"use strict";

// ============================================================================
// the mdn example found in [7]. i put it here cuz i wanted to see if calling
// it with undefined makes any difference. i can't think of an inmediate
// sideffect of using one or the other aside from the differences between null
// and undefined. i think i prefer undefined cuz it almost "enforces" the way
// an unbound this would normally work in strict mode inside a function.

function list() {
    return Array.prototype.slice.call(arguments);
}

function addArguments(arg1, arg2) {
    return arg1 + arg2;
}

const list1 = list(1, 2, 3); //  [1, 2, 3]

const result1 = addArguments(1, 2); //  3

// Create a function with a preset leading argument
const leadingThirtySevenList = list.bind(undefined, 37);

// Create a function with a preset first argument.
const addThirtySeven = addArguments.bind(undefined, 37);


console.log(leadingThirtySevenList()); // [37]
console.log(leadingThirtySevenList(1, 2, 3)) // [37, 1, 2, 3]
console.log(addThirtySeven(5)); // 37 + 5 = 42
console.log(addThirtySeven(5, 10)); //  37 + 5 = 42
//  (the second argument is ignored)
// ============================================================================
