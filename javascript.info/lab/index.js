"use strict";
// ============================================================================
// this experiments 1: i just want to test different things with the this
// keyword in strict mode

/*
function a() {
    return {
        word: 'hello',
        ref: this
    }
}


const b = {
    word: 'hello',
    ref: this
};


function c() {
    const cobj = {
        word: 'hello',
        ref: this
    }

    return cobj;
}

function d() {
    console.log(this === undefined);
    //this.hello = 'aloha'; // will cause fuckery
    return this;
}


function e() { 
    this.someProp = 'hello';
}


// using a and c here will shit the bed.
//console.log(a().ref.word);
//console.log(c().ref.word);


// just like the book said, this here refers to the window object, so this
// will work
console.log(b.ref);
console.log(b.ref.word);


//d();


//e(); // will cause fuckery for the same reason it would in d
e.call(e);
console.log(e.someProp === 'hello');

*/
// ============================================================================



// the calculator exercise
const calculator = {
    // i'll write it like this for clarity's sake
    x: undefined,
    y: undefined,
    
    read() {
        const both = prompt("please enter two comma-separated numbers:");
        
    }


};









