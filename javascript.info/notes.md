# [javascript.info](https://javascript.info)
## objects: the basics
### object references and copying
`Object.assign` property seems pretty useful when you only need a shallow copy. i specially like this syntax:
```javascript
let clone = Object.assign({}, user);
```
but, it is possible to do things more succinctly with the `...` operator.
```javascript
let arrCopy = [...arr];
let objCopy = { ...obj };
```

i could swear i had already written notes about deepcopying in javascript somewhere, but i cant find them. this tutorial suggests you use an alredady existing implementation, like [this one](https://github.com/lodash/lodash/blob/ddfd9b11a0126db2302cb70ec9973b66baec0975/lodash.js#L2620), which seems to be implemented exactly how you'd think it is, even using a stack. knowing the pitfalls of importing a library the wrong way (with webpack specifically) then i'd be cautious to use this. also, given an object-copying-intensive program, it could be worth it to implement a version with less if checks, maybe even taking advantage of knowing the structure.


### garbage collection
i want to find out more about garbage collection in general. i've added a bunch of the resources mentioned at the end here to my to-read list elsewhere. a different explanation with approximately the same content however, exists `[1]`. `[2]` contains marginally more information related to the specific identity of roots.

### object methods, "this"
the tutorial mentions thr shorthand syntax for method declaration has some implications when doing inheritance. oddly enough, the MDN documentation `[3]` does not say anything about it...

as i future guide for myself, i will summarize here what `this` is in different contexts. you can assume strict mode is turned on during all of this.
- inside a class, its the object.
- inside an object literal in the outtermost scope, its the global object
- inside a function that is not inside an object, its undefined, unless ofc youre calling it using something like `apply()` or `call()`, in which case it is whatever context youre giving it with those functions. if you pass a function unto an object as a property, calling it through the object will make `this` be the object but calling it as it was initially defined will still have it be undefined.
- inside a function that is within an object it will be the object. 

#### `bind()`, `call()`, `apply()`
all of these functions can, to some extent, do the same thing. the following are my notes on them:

`fn.bind(thisArgs, args)`
unlike the other two, `bind()` returns a new function with a specific `this` and set arguments. according to `[7]`, the two following statements are semantically equivalent:
```javascript
const boundFn1 = fn.bind(thisArg, arg1, arg2);
const boundFn1 = (...restArgs) => fn.call(thisArg, arg1, arg2, ...restArgs).
```
 other applications include creating functions with pre-set initial arguments, by making the `thisArg` argument `null` or `undefined` (for now i see no difference, however see `[8]`) and adding some parameters. since all functions in javascript have an `arguments` object, the resulting function can still be called with additional arbitrary parameters.

a specific usage mentioned by `[12]` is to provide a callback function with a set this in contexts where the `this` value can be unexpected, such as in `timeOut()`, whose `this` is not inherited from the environment. 

`fn.call(thisArg, arg1, ..., argN)` **and** `fn.apply(thisArg, argsArray)`
by `[9]` and `[10]`'s own admission, these two functions are almost the same, only that one takes a list of parameters and the other takes the parameters directly.


**the performance comparison**
as per `[11]` it seems (and i confirmed) that `call()` is faster than `apply()`. i also compared it to `bind()` being called different ways and found that, in my tests, `call()` and `bind()` were pretty close with regards to their speed for small speeds. the advantage of `bind()` only becomes apparent as the iteration count becomes rather large, and even then the javascript engine applied some sort of optimization after a certain point that put them head-to-head once more. 

### constructor, operator "new"
the site mentions the `return this` is implicit at the end. as a lark, i tried to see what happens if you forcibly make it return another thing. After trying it on firefox, it appears it ignored any other return statements.
```javascript
function Dude() {
    this.name = 'hallo';
    return 5;
}

const dave = new Dude(); // will be an object
```
i think this pattern can be useful if you wanna create an object literal that needs to be initialized with some dynamic statement.
```javascript
let dude = new function() {
    this.name = "John";
    this.isAdmin = false;
};
```
i think its also worth noting that constructors actually obey the return statement if they return an object, and that gets returned instead of the `this` object.


### symbols
i find the idea of the global symbol registry interesting, but i am not very sure what i'd use it for, it seems to contradict the whole point of symbols. i'd imagine you'd expose whatever symbols you think the user might need, and internally you'd know what variables correspond to what without having to look it up.

### object to primitve conversion
i found this part interesting
> All built-in objects except for one case (Date object, we’ll learn it later) implement "default" conversion the same way as "number". And we probably should do the same.


## data types
### methods of primitives
i think the nitty-gritty details of the temporary "object wrapper" are probably interesting from a performance perspective. im not sure if there are situations in which it is better to write something else rather than using these methods, but i would think there arent, or they rely on a completely different approach.

### numbers
just to have a summary of the ways to write long numbers:
```javascript
const num1 = 1_9_8_0_22_22;
const num2 = 1e9;
const num3 = 1e-6;
const num4 = 0xff
const num5 = 0b11111111;
const num6 = 0o377;
```

remember that `Infinity` is not the same as `NaN`.

### strings
i will include a reference to [4] here cuz i thought it was neat too.
i will also include one to [5], because i guess it might come in handy when sorting things. it also contains a bunch of nuances and complicaitons. also, i havent been able to find a place that explicitly says how the function gets the locale (it just says "from the environment", but how could i use that?). maybe its buried in that long ECMA specification document[6]. 

### array
i always forget this, so i will remind myself about the existence of `push/pop` and `unshift/shift`. also, it is unclear to what extent the engine can correctly predict the way the array is being used and optimize accordingly. they do mention some optimizations are turned on and off depending if you treat it as an object or not, but not if, for example, when used as a queue/dequeue the internal representation is turned into a linked list or something. it does say `unshift/shift` are slower than `pop/push`, but that could also apply to a linked list implementation...tho they do describe elements being shifted.

i also thought this method of clearing an array was pretty neat
```javascript
array.length = 0;
```
also, `new Array()` is apparently the way to create an array with pre-fixed length.

### array methods
a useful technique that DOESNT shift the array is `delete array[i];`, which just makes it undefined.
i think they main use i will give `.splice()` will be as a way to merge arrays into one without creating a new one. it is important to note the following diference.
```javascript
arr.splice(-1, 0, ...arr2); //insert all elements of arr2 into arr
arr.splice(-1, 0, arr2); // insert arr2 itself into arr
```
its worth noting that `.slice()` returns a copy of the slice instead of a reference to the array. without parameters it will copy the whole array.
i will mention `.concat()` mostly because i know i will forget that array sum is not a thing in javascript, since objects dont have operator overloading. also, concat creates a new array instead of modifying the old one.

i also think the `filter()` method might the most useful out of the search ones.
```javascript
let results = arr.filter(function(item, index, array) {
  // if true item is pushed to results and the iteration continues
  // returns empty array if nothing found
});

```

i thought the idea of just writing sort functions as arrow functions is nice. i like the idea that the condition has to be to return a positive, negative, or 0. 
```javascript
arr.sort((a, b) => a - b);
arr.sort((a, b) => b - a);
```

i think its worth mentioning that `.reduce((accum, item, index, arr) => {}, init)` will start on the second element and take the first as init if no init is specified.

the `thisArg` pattern in interesting. it is an optional parameter that many array functions have in order to pass 

### bibliography
1. [mdn's article on memory](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
2. [more info on roots](https://developer.chrome.com/docs/devtools/memory-problems/memory-101/#retained_size)
3. [method declaration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions#description)
4. [tagged templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates)
5. [`localeCompare()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare)
6. [ECMA-401](https://402.ecma-international.org/1.0/ECMA-402.pdf)
7. [`bind()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind)
8. [bind with null/undefined out of strict mode](https://stackoverflow.com/questions/38497738/binding-a-javascript-function-with-null-or-undefined-as-thisarg)
9. [`call()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
10. [`apply()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
11. [performance of `call()` vs `apply()`](https://stackoverflow.com/questions/33054907/javascript-performance-call-vs-apply)
12. [the `timeout()` `this` problem](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout#the_this_problem)
