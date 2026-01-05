// function sumOfThreeElements(...elements){
//   return new Promise((resolve,reject)=>{
//     if(elements.length > 3 ){
//       reject("Only three elements or less are allowed");
//     }
//     else{
//       let sum = 0;
//       let i = 0;
//       while(i < elements.length){
//         sum += elements[i];
//         i++;
//       }
//       resolve("Sum has been calculated: "+sum);
//     }
//   })
// }
// sumOfThreeElements(1,2,3)
// .then((result) => console.log(result))




// 1. Microtask Queue and Promise Timing
// Simple Explanation:
// Think of JavaScript as a restaurant kitchen with two order boards:

// Macrotask board (slow): Regular orders like setTimeout
// Microtask board (fast): VIP orders like Promises

// Promises always get served before setTimeout, even if setTimeout was called first!


// console.log("1")

// setTimeout(() => {
//   console.log("setTImeout")
// }, 5000);

// Promise((resolve, reject) => {
//   resolve(console.log("resolve promise"))
// })

// console.log("2")




// 2. Implement Promise.all() from Scratch
// Simple Explanation:
// Promise.all() is like waiting for ALL your friends to finish their homework before you can play together. If even ONE friend gives up, the whole plan fails.


// function allmyPromises(promises) {
//   return new Promise((resolve, reject) => {
//     let results = [];
//     let count = 0;

//     promises.forEach((promise, index) => {
//       Promise.resolve(promise)
//       .then((value) => {

//         results[index] = value;
//         count += 1

//         if (count === promises.length)  {
//           return resolve(results)
//         }
//       }
//       )
//       .catch(error => reject(error))
//     })
//   })
// }

// allmyPromises([
//   Promise.resolve(5),
//   Promise.resolve(4),
//   Promise.resolve(3)
// ])
// .then((value) => console.log(value) )




function allsettledPromise(promises) {
  return new Promise((resolve, reject) => {

    let results = [];
    let count = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
      .then((value) => {
        results[index] = { status: "resolved", value: value };
        count += 1
        
        if (count === promises.length ) {
          resolve(results)
        }
      })
      .catch((error) =>{
        results[index] = { status: "rejected", reason: error }
        count += 1
        
        if (count === promises.length) {
          resolve(results)
        }
      })
    })
  })
}

allsettledPromise([
  Promise.resolve(5),
  Promise.resolve(3),
  Promise.resolve(2),
])
.then((value) => console.log(value))