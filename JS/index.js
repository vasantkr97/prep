
//Maps: the maps method creates a new array with a results of calling a function on every element. it does not modify the orginal array.
// const numbers = [1, 2, 3]
// const doubled = numbers.map(n => n*2)
// console.log(doubled)



// const users = [
//     { id:1, name: "alice", age: 25 },
//     { id:2, name: "Bob", age: 30 },
//     { id:3, name: "charlie", age: 35 } 
// ]
// const names = users.map(obj => obj.name)
// console.log(names)



// const prices = [100, 200, 50, 150]
// const discount = prices.map(p => p - p*0.10)
// console.log(discount)


// const stringNumbers = ["10", "20", "30", "40"];
// const numbers =stringNumbers.map(s => parseInt(s))
// const numbers2 =stringNumbers.map(s => Number(s))
// console.log(numbers)




//Filters: filter() method creates a new array with elements that pass a test. It returns true or false for each element.

// const numbers = [1,2,3,4,5]
// const even = numbers.filter(n => n%2 === 0)
// console.log(even)


// const users = [
//   { name: "Alice", age: 25 },
//   { name: "Bob", age: 17 },
//   { name: "Charlie", age: 30 },
//   { name: "David", age: 16 }
// ];
// const adults = users.filter(u => u.age > 18);
// console.log(adults);


// const words = ["hello", "world", "javascript", "code", "programming"];
// const arr = words.filter(w => w.length > 5)
// console.log(arr)


// const products = [
//   { name: "Laptop", price: 800 },
//   { name: "Mouse", price: 25 },
//   { name: "Keyboard", price: 75 },
//   { name: "Monitor", price: 300 },
//   { name: "Desk", price: 150 }
// ];
// const arr = products.filter(p =      > p.price>50 && p.price < 200)
// console.log(arr)



// const users = [
//   { id: 1, name: "Alice", active: true },
//   { id: 2, name: "Bob", active: false },
//   { id: 3, name: "Charlie", active: true },
//   { id: 4, name: "David", active: false }
// ];
// const arr = users.filter(u => u.active === true)
// console.log(arr)





//Reduce(): reduce() method applies a function against an accumalator and each element to reduce to a single value

// const numbers = [1,2,3,4]
// const sum = numbers.reduce((acc, num) => acc + num, 0)
// console.log(sum)


// const numbers = [2,3,4,5]
// const p = numbers.reduce((acc, num ) => acc*num, 1)
// console.log(p)


// const fruits = ["apple", "banana", "apple", "cherry", "banana", "apple"];
// const acc = fruits.reduce((acc, curr) => {

//     if (curr === "apple") {
//         acc.apple += 1
//     } else if (curr === "banana") {
//         acc.banana += 1
//     } else {
//         acc.cherry += 1
//     }
//     return acc
// } , {apple: 0, banana: 0, cherry: 0})

// const acc2 = fruits.reduce((acc, curr) => {
//     acc[curr] = (acc[curr] || 0) + 1
//     return acc
// }, {})
// console.log(acc2)


// const products = [
//   { name: "Laptop", price: 800 },
//   { name: "Mouse", price: 25 },
//   { name: "Keyboard", price: 75 }
// ];
// const acc = products.reduce((acc, cur) => { return  acc + cur.price}, 0)
// console.log(acc)'


// const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
// const acc = matrix.reduce((acc, cur) => {
//     return acc.concat(cur)
// }, []);
// console.log(acc)





//Slice:::: returns a shallow copy of a portion of an array. Original array is not modified.

// const arr = [1,2,3,4,5];
// const sliced = arr.slice(1,4)
// console.log(sliced)

// const numbers = [10, 20, 30, 40, 50];
// const s = numbers.slice(0, 3)
// console.log(s)

// const letters = ["a", "b", "c", "d", "e"];
// const s = letters.slice(-3)
// console.log(s);


// const original = [1, 2, 3, 4, 5];
// const s = original.slice()
// console.log(s)




//SPLICE: Modify Array In Place
//The splice() method changes the contents of an array by removing or replacing existing elements and or adding new Ones. ""It modifies the original Array"
// const arr = [1,2,3,4,5]
// arr.splice(2,1,99);
// console.log(arr)


// const numbers = [10, 20, 30, 40, 50];
// const arr = numbers.splice(2,1)
// console.log(numbers)


// const numbers = [10, 20, 30, 40, 50];
// const arr = numbers.splice(1,2,99,99)
// console.log(numbers)


// const numbers = [10, 20, 30, 40, 50];
// const arr = numbers.splice(2,0,100)
// console.log(numbers)

// const numbers = [10, 20, 30, 40, 50];
// const arr = numbers.splice(-1)
// console.log(numbers)

// const numbers = [10, 20, 30, 40, 50];
// numbers.splice(1,3,"x", "y")
// console.log(numbers)



//FOREACH: EXECUTE A FUNCTION FOR EACH ELEMENT
//The forEach() method executes a provided function once for rach array element. It returns undefined and does not create a  new array

// const arr = [1,2,3]
// arr.forEach(num => console.log(num*))

// const number = [1,3,4,5,6]
// number.forEach(n => console.log(n*2))

// const words = ["Hello", "World", "JavaScript"];
// let str = ""
// words.forEach((w, index) => {
//     str += index === 0 ? w : `,${w}`
// })
// console.log(str)


// const numbers = [10, 20, 30, 40];
// let sum = 0
// let count = 0
// numbers.forEach((n) => {
//     count += 1
//     sum += n
// });

// console.log(sum, count)



// const users = [
//   { name: "Alice" },
//   { name: "Bob" },
//   { name: "Charlie" }
// ];

// users.forEach((user, index) => {
//     user.id = index + 1
// })

// console.log(users)


// const numbers = [45, 12, 78, 23, 56, 34];

// let v = 0

// numbers.forEach((n) => {
//     if (n > v) v = n
// })
// console.log(v)








//INCLUDES::::: Check if element exists
//The includes() method determines whether an array contains a certain value, returning true or false.

// const arr = [1,2,4,5]
// console.log(arr.includes(3))


// const languages = ["python", "java", "cpp", "javascript", "go"];
// console.log(languages.includes("javascript"))
// console.log(languages.includes("Java"))


// const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com"];
// const userDomain = "gmail.com";

// console.log(allowedDomains.includes(userDomain))



//JOIN: convert Array to string
//The join() method creates and returns a new string by concentrating array elements, separated by a specific separator.

// const arr = ["a", "b", "c"]
// console.log(arr.join("-"))

// const words = ["apple", "banana", "cherry"]
// console.log(words.join(","))
// console.log(words.join(" "))

// const letters = ["H", "e", "l", "l", "o"];
// console.log(letters.join(""))




//REVERSE():::: the reverse() method reverses the order of elements in an array ""IN PLACE"". ITS modifies the original array

// const arr = [1,2,3]
// const arr1 = arr.slice()
// arr1.reverse()
// console.log(arr)
// console.log(arr1)

// const arr1 = [1, 2, 3, 2, 1];
// const arr2 = [1, 2, 3, 4, 5];

// const Ispalindrome = (arr) => {
//     return arr.join() === arr.reverse().join()
// }

// console.log(Ispalindrome(arr1))
// console.log(Ispalindrome(arr2))

// console.log(arr1.join() === arr1.reverse().join())
// console.log(arr2.join() === arr2.reverse().join())




//PUSH:::::  add elements to END
//THe push() method adds one or more elements to the end of an array and returns the new length. "It modifies the Original ARRAY."

// const arr = [1,2,3,4]
// arr.push(5)
// console.log(arr)


// const numbers = [10, 20, 30];
// const n2 = numbers.push(50)
// numbers.push(5, 6,7,8)
// console.log(numbers)


// const users = [
//   { id: 1, name: "Alice" },
//   { id: 2, name: "Bob" }
// ];

// users.push({id:3, name: "vasant"})

// console.log(users)





//POP:::::::  The pop() method removes the last element from an array and returns it. IT modifies the original array

// const arr = [1,2,3,4];
// const removed = arr.pop()
// console.log(removed)
// console.log(arr)

// const numbers = [1, 2, 3];

// while (numbers.length > 0) {
//     numbers.pop()
// }
// console.log(numbers)





//SHIFT: the shift() method removes the firt element from an array and returns it. it modifies the original array.

// const arr = [1,2,3,4,5]
// const removed = arr.shift()
// console.log(removed);
// console.log(arr)

// const tasks = ["task1", "task2", "task3"];
// while (tasks.length > 0) {
//     tasks.shift()
// }
// console.log(tasks)


// const original = [1, 2, 3, 4, 5]
// let arr = []
// for (let i =0; i<2; i++) {
//     n = original.shift()
//     arr.push(n)
// }

// console.log(arr)
// console.log(original)





//UNSHIFT(): The unshift() method adds one or more elements to the beginning of an array and returns the new length. ""ITS MODIFIES THE ORIGINAL array."""

// const arr = [2, 3, 4]
// arr.unshift(1);
// console.log(arr);


// const numbers = [3, 4, 5]
// console.log(numbers.unshift(1,2))
// console.log(numbers)

// const data = [["Alice", 25, "NYC"], ["Bob", 30, "LA"]];
// data.unshift("Name, Age, City")
// console.log(data)


// const items = [1, 2, 3, 4]
// console.log(items.unshift(5))










//SORT::::: The sort() method sorts element of an array in place and returns the sorted array. Default sorts as strings in ascending order

// const arr = [3, 1,4 ,2]
// console.log(arr.sort())

//Sort Numbers Descending
// const numbers = [5, 2, 8, 1, 9]
// console.log(numbers.sort((a, b) => b - a))

// const words = ["zebra", "apple", "mango", "banana"];
// console.log(words.sort())

//Sort Objects by Property
// const students = [
//   { name: "Alice", marks: 85 },
//   { name: "Bob", marks: 92 },
//   { name: "Charlie", marks: 78 }
// ];

// console.log(students.sort((a,b) => b.marks - a.marks))

// const words = ["apple", "cat", "elephant", "dog"];
// console.log(words.sort((a, b) => a.length - b.length))








//fill():::::: fill() method fills all array elements with a static value. it mpdify the original array

// const arr = [1,2,3,4,5];
// arr.fill(0);
// console.log(arr)

//console.log(new Array(5).fill("X"))

// console.log(new Array(9).fill(0))

// const arr = [10, 20, 30, 40, 50]
// console.log(arr.fill(-1, 1, 3))






//CONCAT::::: the concat() method combines two or more arrays and returns a new array. Original arrays are not modified.

// const arr1 = [1,2];
// const arr2 = [3,4];
// console.log(arr1.concat(arr2))

// const arr1 = [1, 2];
// const arr2 = [3, 4];
// const arr3 = [5, 6];
// console.log(arr1.concat(arr2, arr3))

// const arr = [1,2,3]
// console.log(arr.concat(4, [5,6]))


//combine array of objects

// const users1 = [{ id: 1, name: "vasant"}];
// const users2 = [{ id: 2,  name: "kumar"}];
// console.log(users1.concat(users2))








//EVERY():::::::::: the every() method tests whether all elements in an array pass the provided test. Returns true only if all pass

// const arr = [2, 4, 6, 8];
// console.log(arr.every(num => num % 2 === 0));

// const numbers = [2,4,6,8,10]
// console.log(numbers.every(n => n%2 === 0))

// const numbers = [5, 10, 15, 20]
// console.log(numbers.every(n => n>0))
// const numbers2 = [-5, 10, 15, 20]
// console.log(numbers2.every(n => n>0))

// const users = [
//   { name: "Alice", age: 25 },
//   { name: "Bob", age: 30 },
//   { name: "Charlie", age: 20 }
// ];

// console.log(users.every(u => u > 18))







//SUM::::::::::::: sum is a common operation using reduce() to add all elements.

// const numbers = [1,2,3,4];
// const sum = numbers.reduce((acc, num) => acc + num, 0)
// console.log(sum)

// const numbers = [5, 15, 8, 25, 12];
// let sum = 0
// console.log(numbers.filter((n) => {
//   if (n>10) sum += n
//   return sum
// }))
// console.log(sum)

// const numbers = [5, 15, 8, 25, 12];
// const results = numbers.filter(n => n > 10).reduce((acc, sum) => acc + sum, 0)
// console.log(results)

// const employees = [
//   { name: "Alice", salary: 50000 },
//   { name: "Bob", salary: 60000 },
//   { name: "Charlie", salary: 55000 }
// ];

// console.log(employees.reduce((acc, sum) => acc + sum.salary, 0))

// const items = [
//   { name: "Book", price: 10, inStock: true },
//   { name: "Pen", price: 2, inStock: false },
//   { name: "Notebook", price: 5, inStock: true }
// ];


// const sum = items.reduce((acc, cur) => {
//   if (cur.inStock === true) {
//     acc += cur.price
//   }
//   return acc
// }, 0)
// console.log(sum)


// const orders = [
//   { id: 1, items: [{ qty: 2}, { qty: 3 }]},
//   { id: 2, items: [{ qty: 1}]}
// ]
// const sum = orders.reduce((acc, cur) => {
//     for (const qty of cur.items) {
//       acc += qty.qty
//     }
//   return acc
// },0)
// console.log(sum)









//find::::the find() method returns the "first element" that satisfies the provided test. Returns undefined if no element matches.

// const arr = [1,2,3,4,5,6]
// console.log(arr.find(num => num >4))

// const users = [
//   { id: 1, name: "Alice" },
//   { id: 2, name: "Bob" },
//   { id: 3, name: "Charlie" }
// ];
// console.log(users.find(u => u.id === 2))


// const products = [
//   { name: "Milk", expiry: "2025-12-10", expired: false },
//   { name: "Bread", expiry: "2025-12-05", expired: true },
//   { name: "Cheese", expiry: "2025-12-08", expired: false }
// ];
// const ex = products.find(obj => obj.expired === true)
// console.log(ex)

// const products = [
//   { name: "Laptop", price: 800 },
//   { name: "Mouse", price: 25 },
//   { name: "Keyboard", price: 75 },
//   { name: "Monitor", price: 300 }
// ];
// const f = products.find(obj => obj.price > 50 && obj.price < 100)
// console.log(f)






//toString:::::: Convert to String
//The toString() method returns a string representation of an array. 
//Elements are converted to strings and separated by commas.

// const arr = [1,2,3];
// console.log(arr.toString());

// const words = ["apple", "banana", "cherry"];
// console.log(words.toString())

// const matrix = [[1,2],[3,4]]
// console.log(matrix.toString())

// const mixed = [1, "hello", true, null]
// console.log(mixed.toString())

// const items = ["task1", "task2", "task3"];
// console.log(items.toString())


//findIndex()::::::: get position of first match
//the findIndex() method returns the ""index"" of the first element that satisfies the test. Returns -1 if not element matches.

// const arr = [1,2,3,4,5]
// console.log(arr.findIndex(num => num > 3))

// const numbers = [1,3,5,8,9]
// const i = numbers.findIndex(num => num%2 === 0)
// console.log(i)

// const items = ["apple", "banana", "cherry"];
// console.log(items.findIndex(n => n === "grape"))

// const students = [
//   { name: "Alice", marks: 85 },
//   { name: "Bob", marks: 92 },
//   { name: "Charlie", marks: 78 }
// ];
// const mi = Math.min(...students.map(s => s.marks))
// console.log(students.findIndex( obj => obj.marks === mi))

// const products = [
//   { id: 1, name: "Laptop" },
//   { id: 2, name: "Mouse" },
//   { id: 3, name: "Keyboard" }
// ];
// const ind = products.findIndex(obj => obj.name === "Mouse")
// products.splice(1,1)
// console.log(products)








// console.log(Array.isArray([1, 2, 3]));     // true
// console.log(Array.isArray("hello"));       // false
// console.log(Array.isArray({ a: 1 })); 

// function process(data) {
//   if (Array.isArray(data)) {
//     return "Array processing"
//   } else {
//     return "Not an Array"
//   }
// }

// console.log(process(1,2,3))



// const values = [[1, 2], "string", [3, 4], 42, [5, 6]];
// const result = values.filter(v => Array.isArray(v))
// console.log(result)



//Array.from() is a static method that creates a new Array froma iterable (string, Set, Map, NodeList, etc)

// console.log(Array.from("hello"));
// console.log(Array.from([1,2,3]))

// console.log(Array.of(5))
// console.log(new Array(5))