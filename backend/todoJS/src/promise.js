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
// }, 0);

// new Promise((resolve, reject) => {
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




// function allsettledPromise(promises) {
//   return new Promise((resolve, reject) => {

//     let results = [];
//     let count = 0;

//     promises.forEach((promise, index) => {
//       Promise.resolve(promise)
//       .then((value) => {
//         results[index] = { status: "resolved", value: value };
//         count += 1
        
//         if (count === promises.length ) {
//           resolve(results)
//         }
//       })
//       .catch((error) =>{
//         results[index] = { status: "rejected", reason: error }
//         count += 1
        
//         if (count === promises.length) {
//           resolve(results)
//         }
//       })
//     })
//   })
// }

// allsettledPromise([
//   Promise.resolve(5),
//   Promise.resolve(3),
//   Promise.resolve(2),
// ])
// .then((value) => console.log(value))



// async function processItems(items) {
//   items.forEach(async (item) => {
//     await process(item)
//   })
//   console.log("Done")

// }



//3. This reveals understanding of async/await pitfalls, particularly that forEach doesn't await async callbacks.


// async function processItem(item) {
//   console.log(`done ${item}`)
// }
// async function processItems(items) {
//   for (const item of items) {
//     await processItem(item)
//   }
//   console.log("Done");
// }
// processItems([1,2,3,4,5])


// 4. Explain Promise memory leaks. How can an unresolved Promise cause a memory leak, and how would you debug it in production?

// let data;

// new Promise((resolve, reject) => {
//   fetchData()
// })


// const timeoutPromise = new Promise((resolve, reject) => {
//   const timeout = setTimeout(() => {
//     console.log("timoue");
//     reject(new Error("Timeout"));
//   }, 5000)

//   fetchData()
//     .then(()=> {
//       clearTimeout(timeout);
//       resolve(result)
//     })
//     .catch(error => {
//       clearTimeout(timeout);
//       reject(error)
//     })
// })


// async function fetchData() {
//   console.log("data fetch")
//   return 5
// }

// const timeOutPromise = new Promise((resolve, reject) => {
//   const timeOut = setTimeout(() => {
//     reject(new Error("timeout"))
//   }, 5000)

//   fetchData()
//     .then((res) => {
//       clearTimeout(timeOut);
//       resolve(res);
//     })
//     .catch((error) => {
//       clearTimeout(timeOut)
//       reject(error)
//     })
// }) 

// timeOutPromise
// .then((value) => console.log(value))



// 5. Implement a retry mechanism that attempts a Promise-based operation up to N times with exponential backoff. 
// Retry with Exponential Backoff
// Simple Explanation:
// Like knocking on a door: knock, wait 1 second, knock, wait 2 seconds, knock, wait 4 seconds... each time you wait longer.


// async function retryWithBackOff(fn , maxRetries) {
//   for (let attempt = 0; attempt < maxRetries; attempt++) {
//       try {
//         const result = await fn();
//         return result
//       } catch (error) {
//         if (attempt === maxRetries-1) {
//           throw error
//         }
//       } 
      
//       const exponentialWaitTime = Math.pow(2,attempt)*1000;
//       await new Promise((resolve) => {
//         setTimeout(() => {
//           //console.log("retry in seconds", exponentialWaitTim)
//           resolve()
//         }, exponentialWaitTime);
//       })

//       console.log("after 10 seconds")
//   }
// };

// retryWithBackOff(
//   () => fetch("https://api.example.com/data"),
//   5
// )
// .then((value) => console.log(value))
// .catch((error) => console.log(error))



// What's the difference between returning a Promise vs returning await promise in an async function? When does it matter?
//Rule of thumb: return a await in try catch block other just return is enough.
// async function awaitPromise() {
//   return fetchData()
// }
// awaitPromise();


// async function awaitInTryCatch() {
//   try {
//     return await fetchData()
//   } catch (error) {
//     return error
//   }
// }
// Rule of thumb: Use return await inside try-catch blocks, otherwise just return is fine.






//AbortController()

// async function timeoutAbort() {
//   const controller = new AbortController()

//   const timeOut = setTimeout(() => {
//     controller.abort()
//   }, 0)

//   return fetch("https://api.examples/data", { signal: controller.signal })
// }

// timeoutAbort()
// .then(res => res.json())
// .then(res => console.log(res))
// .catch((error) => {
//   if (error.name === "AbortError") {
//     console.log("abort error")
//   } else {
//     console.log("fetching error")
//   }
// })



// Implement Promise.race()
// Simple Explanation:
// Promise.race() is like a race between friends - whoever finishes first wins, everyone else is ignored!

// function myPromiseRace(promises) {
//     return new Promise((resolve) => {
//         promises.forEach( promise => {
//             Promise.resolve(promise)
//             .then((result) => resolve(result))
//             .catch((error) => resolve(error))
//         });
//     })
// }

// myPromiseRace([
//     new Promise((resolve) => setTimeout(() => resolve("fast"), 520)),
//     new Promise((resolve) => setTimeout(() => resolve("slow"), 500))
// ])
// .then((value) => console.log(value))
// .catch((error) => console.log(error))



//setting a timer on a test - if you dont finish in time, time's up!

// function waitTimeout(promise, ms) {
//     const timeoutPromise = new Promise((_, reject) => {
//         setTimeout(() => reject("timeUp!"), ms);
//     })

// return Promise.race([promise, timeoutPromise])
// }


// waitTimeout(fetch('https://slow-api.com'), 300)
// .then((value) => console.log(value))
// .catch((error) => console.log(error))



