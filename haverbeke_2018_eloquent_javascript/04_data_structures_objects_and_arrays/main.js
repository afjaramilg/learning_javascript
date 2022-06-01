'use strict';
// 1 ==========================================================================
// just thought it could be useful to save this example on multivariable args
// and how it behaves with arrays.

function max(...numbers) {
    let result = -Infinity;
    for (let number of numbers) {
        if (number > result) result = number;
    }
    return result;
}

console.log(max(4, 1, 9, -2));

let numbers = [5, 1, 7];
console.log(max(...numbers));


// 2 ==========================================================================
// obviously, inmutable strings are easy to comprehend and safer than mutable
// strings, but for performance reasons, i looked up how to safely convert a
// string to an array of unicode characters. see `[1]`
//
// in chapter 5 they talk about how
// characters in js work, for now i will only include the snippets

const arr1 = [...'𝟘𝟙𝟚𝟛'];
const arr2 = Array.from('𝟘𝟙𝟚𝟛');

// but these two can apparently fuck up if youre not careful with considering
// all possible characters, see `[2]`

const arr3 = [..."अनुच्छेद"];
console.log(arr3); // apparently it should be ["अ","नु","च्","छे","द"]

// so you better look for a "grapheme splitting library" if you really need
// this to work. tho the comments in `[2]` also say this is not a common case
// and it is annoying.
