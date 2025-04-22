let e = new Date().toUTCString()

// console.log(e);
//
let arr = [{a:'2025-04-19T18:30:00.000Z'},{a:'2025-04-19T18:30:00.000Z'},{a:'2025-04-19T18:30:00.000Z'},{a:'2025-04-19T18:30:00.000Z'}];

for (let i in arr) {
  i.a = i.a.toDateString();
}
console.log(arr);
