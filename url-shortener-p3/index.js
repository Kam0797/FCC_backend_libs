

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const dns = require('dns');
const mongoose = require('mongoose');


app.use(cors({optionsSuccessStatus: 200}));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));

mongoose.connect(process.env.MONGO_URI);
const UrlSchema = new mongoose.Schema({
  url: String,
  uid: String,
  clicks: Number
});
const Url = mongoose.model("Url",UrlSchema);


// keep funcs here?

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

async function checkAndCreate(InputUrl,res) {
  try {
    let exists = await Url.findOne({url:InputUrl});
    // return console.log('#',{original_url:exists.url, short_url:exists.uid});
    return res.json({original_url:exists.url, short_url:exists.uid});
    
  }catch(err) {
    let last_uid = await Url.findOne({},{uid:1, _id:0}).sort({_id:(-1)});
    exists = await Url.create({url: InputUrl,
                        uid: base62(last_uid.uid),
                        clicks:0 });
    return res.json({original_url:exists.url, short_url:exists.uid});

  }
}







// till  here

const listener = app.listen(3000,'0.0.0.0',()=> {
  console.log("Listening at port 3000")
});

app.get('/',(req,res)=> {
  res.sendFile(__dirname +  '/views/index.html');
})

app.post('/api/shorturl',(req,res,next)=> {
  
  let OrigUrl = req.body.url;
  console.log(OrigUrl);
  let hostname;
  try{
    hostname = new URL(OrigUrl).hostname;
    console.log(hostname);
  }catch(err) {
    return res.json({error: 'invalid url'});
  }
  dns.lookup(hostname, async (err, addr)=> {
    if (err) {
      console.log("error, but passed hostname [site doesnt exist]")
      return res.json({error: 'invalid url'});
    }

    try{
    checkAndCreate(req.body.url,res);
    }catch(dbError) {
      res.json({err: 'serverbusy'})
    }
  })
})


app.get('/api/shorturl/:urlid',(req,res)=> {
  Url.findOne({uid:req.params.urlid},{url:1})
  .then(destin => {
    console.log(req.params.urlid,destin);
    res.redirect(destin.url);
  })
})
