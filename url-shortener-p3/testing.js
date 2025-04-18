// const dns = require('dns')
//
// dns.lookup("wwwole.in",(err,address,family)=> {
//   if (err) return console.log("Not found",err.errno,err.code);
//   return console.log(`ipaddress ${address} ipfamily ${family}`);
// });
//
// let count=0;
// function b62incr(){
//   const base62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
//   
//   let part1 = '';
//   let len = 62;
//   if (count<62){
//   let part2 = base62[count+1];
//     console.log(part1+part2);
//     count++;
//   }
//   if (count == 62) 
// }

// base62[0]--[62]
// [0][0]--[0][62]
// [1][0]--[1][62]
// |
// |
// [62][0]--[62][62]
// [0][0][0]--[0][0][62]
//

// let b = [0,0,0,0,0,0,0];
function base62(id) {
const b62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

let b = [];
for(let i of id) {
  b.unshift(b62.indexOf(i));
}

let i= 0;
let j =1;
const lim = 61;

if (b[i]<lim) {
  b[i]++;
}
else while(b[i+j]<=lim){

  if (b[i+j]<lim) {
    b[i] = 0;
    b[i+j]=b[i+j]+1;
    break;
  }
  else{
    if(i+j>=b.length-1){
      b.push(0);
    }
    else{
    b[i+j]=0;
    j++;
    }

  }
}
// j=1;
b = b.map(i=>b62[i]);
return b.reverse().join('');
}

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);
const UrlSchema = new mongoose.Schema({
  url: String,
  uid: String,
  clicks: Number
});
const Url = mongoose.model("Url",UrlSchema);

async function checkAndCreate(InputUrl) {
  // try{
  // let data =await Url.findOne().sort({_id:-1});
  //   console.log(data.url);
  // } catch(err) {
  //   console.log(err);
  // } 

    try {
      let exists = await Url.findOne({url:InputUrl});
      return console.log('#',{original_url:exists.url, short_url:exists.uid});
      
    }catch(err) {
      let last_uid = await Url.findOne({},{uid:1, _id:0}).sort({_id:(-1)});
      exists = await Url.create({url: InputUrl,
                          uid: base62(last_uid.uid),
                          clicks:0 });
      return console.log({original_url:exists.url, short_url:exists.uid});

    }
  

  // Url.create({url: InputUrl,
  //             uid: base62('1'),
  //             clicks:1});
}

checkAndCreate('kam');

console.log(base62("1009"));

let ffo = [25,45,48]
let list1 = [1,2,3];
list1 = list1.map(i=>ffo[list1.indexOf(i)]);
/* console.log(list1); */





