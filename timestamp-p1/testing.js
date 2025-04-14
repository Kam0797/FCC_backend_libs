// trash --dont mind

let datstr = "2015-12-25";

let dat = new Date(datstr);
console.log("dt:",datstr);
console.log("dat:",dat);

let unix = 1451001600000;
let stamp = new Date(unix);
console.log("#",unix,"##",Date(unix));

let shit = "1451001600000";
console.log(!isNaN(new Date(unix)),!isNaN(new Date(datstr)),!isNaN(new Date(shit)));

console.log(new Date(shit));

  let  unix_ts = Math.floor(new Date().getTime());
  let  utc_tim = new Date();
console.log(unix_ts,utc_tim)

let e = "1-2";
let f = "30";
e = Number(e);
f = Number(f);
console.log(Number(e),Number(f),e+f,isNaN(isNaN));

console.log(new Date().toUTCString())
