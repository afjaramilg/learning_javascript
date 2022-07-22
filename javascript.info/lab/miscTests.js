"use strict";

// ============================================================================
// this experiments 1: i just want to test different things with the this
// keyword in strict mode
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


const thisExperiment1 = () => {
    // using a and c here will shit the bed.
    //console.log(a().ref.word);
    //console.log(c().ref.word);


    // just like the book said, this here refers to the window object, so this
    // will work
    console.log(b.ref);
    console.log(b.ref.word);

    d();
    //e(); // will cause fuckery for the same reason it would in d
    e.call(e);
    console.log(e.someProp === 'hello');
}
// ============================================================================



// ============================================================================
// the "traditional objects" version of the calculator

function Calculator() {
    // i'll write these two comments here indicating what properties you can
    // expect this object to have. i leave them commented since at the time i
    // am not sure if a minifiyer would remove them if they werent, but i am
    // pretty sure it'd remove comments.
    // this.a = undefined;
    // this.b = undefined;

    this.read = function() {
        let abArr = [];
        let readNums = true;
        while (readNums) {
            const abStr = prompt("please enter two comma-separated numbers:");
            const abArr = abStr?.split(',');
            if (abArr && abArr.length === 2) {
                this.a = Number(abArr[0]);
                this.b = Number(abArr[1]);
                readNums = Number.isNaN(this.a) && Number.isNaN(this.b);
            }
        }
    };

    this.sum = function() {
        return this.a + this.b;
    };

    this.mul = function() {
        return this.a * this.b;
    };
}


const calculatorExercise1 = () => {
    const calculator = new Calculator();
    calculator.read();
    alert("Sum=" + calculator.sum());
    alert("Mul=" + calculator.mul());
}
// ============================================================================


// ============================================================================
// tests related to the so called "object wrapper" around primitives

// this option i think will always be worse becase of additional copying in all
// sorts of places in this function
function myToUpperCase(str) {
    // str parameter will be a copy

    let newStr = ''; // new string
    for (let c of str) {
        newStr += c.toUpperCase(); //im too lazy to do conversions here
    }

    return newStr;
}

const objectWrapperExperiment1() = () => {
    // indeed, b is a copy of a. it seems in memory there's only ever 2 strings.
    const a = "string1";
    const b = a.toUpperCase();
    const c = myToUpperCase(a);
}
// ============================================================================



// ============================================================================
// test return copy rules for strings in the browser (firefox)

// both of these options seem to be comparatively fast, maybe the string doesnt
// get copied on return but simply labeled differently? in the debugger, it
// appears once the return in reached, a space called `<return>` gets filled.

function expensiveFunction1(len) {
    let str = "";
    for (let i = 0; i < len; i++) {
        str += 'a';
    }
    return str;
}


const copyRulesExperiment1 = () => {
    expensiveFunction1(800000000);
    let str = "";
    for (let i = 0; i < 800000000; i++) {
        str += 'a';
    }
}

// ============================================================================



export {
    thisExperiment1,
    calculatorExercise1,
    objectWrapperExperiment1,
    copyRulesExperiment1
};
