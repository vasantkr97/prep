//Closure: A closure is a function that has access to variables in its outer (enclosing) lexical scope, even after the outer function has returned. Closures are created every time a function is created.

// function Outer() {
//     let count = 0;

//     function inner() {
//         count++;
//         console.log(count);
//     }

//     return inner;
// }

// const counter = Outer()
// counter()




// Function declarations are hoisted and can be called before they're defined. Function expressions are not hoisted.

// greet()
// function greet() {
//     console.log("functional hoisting!!!")
// }


// sayHi()

// const sayHi = function() {
//     console.log("function expressions!")
// }

// sayHi()


//curried function 

// function curried(a) {
//     return function (b) {
//         return function (c) {
//             return a + b + c
//         }
//     }
// }

// console.log(curried(1)(2)(3))


// const curried = a => b => c => a + b + c
// console.log(curried(1)(2)(3));



// Higher Order Function: Functions that take other functions as arguments or return functions. Examples include map, filter, reduce.

// function HOF(fn)  {
//     return fn
// }

// HOF()

// function higherOrderFunction(n, action) {
//     for (let i = 0; i<n; i++){
//         action(i)
//     }
//     return 
// }

// higherOrderFunction(4, console.log)



//this - KeyBoard

// const obj = {
//     name: "vasanth",
//     person: function() {
//         console.log(this.name)
//     }
// }
// obj.person()


