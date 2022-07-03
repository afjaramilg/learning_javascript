# the secret life of objects
## encapsulation
the book indicates that, as fo the tie of writing, javascript had no real equivalent for private attributes. however, as per `[1]`, they are now  a feature. it is worth noting that they are only compatible with firefox 90 onwards. this browser version came out in 2021. therefore, for compatibility reasons, i think i will favor the convention the book mentions and use the `_` syntax instead.

i found some additional context on the `this` keyword `[2]`. most interesting to me was its usage inside a function but outside an object. most importantly, using `strict mode`.
```js
    function f2() {
        'use strict'; // see strict mode
        return this;
    }

    f2() === undefined; // true
```

## prototypes
object literals are treated as prototypes. i guess this would allow you to create a shallow copy of them using `Object.create()`.

## the iterator interface
of this chapter i found notable that he had to use `Matrix.prototype` to add a method to the class. it make sense based on what we saw in the rest of the chapter.

## other
i found the chapter to be lacking in terms of private fields and static properties and things for classes. `[5,6`] deal with these

## bibliography
1. `https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields`
2. `https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this`
3. `https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map`
4. `https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol#instance_properties`
5. `https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static`
