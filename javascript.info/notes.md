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



### constructor, operator "new"
the site mentions the `return this` is implicit at the end. as a lark, i tried to see what happens if you forcibly make it return another thing. After trying it on firefox, it appears it ignored any other return statements.
```javascript
function Dude() {
    this.name = 'hallo';
    return 5;
}

const dave = new Dude(); // will be an object

```

### bibliography
1. [mdn's article on memory](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
2. [more info on roots](https://developer.chrome.com/docs/devtools/memory-problems/memory-101/#retained_size)
3. [method declaration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions#description)
