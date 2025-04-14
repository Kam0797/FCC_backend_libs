
let express = require('express');
let cors = require('cors');

let app = express();

app.use(cors({optionsSuccessStatus: 200}));

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res)=> {
  res.sendFile(__dirname + '/views/index.html');
})

let listener = app.listen('3000','0.0.0.0',(err,data)=> {
  if (!err) return console.log("listening  at :3000")
})

app.get('/api',(req,res)=> {
  res.json({
    unix: Math.floor(new Date().getTime()),
    utc: new Date().toUTCString()
  })
})

app.get('/api/:date',(req,res)=> {
  console.log(req.params.date);
  let isDate = !isNaN(new Date(req.params.date));
  let unix_ts, utc_tim;

  function isTs(ts) {
    for (let i=0;i<ts.length;i++) {
      if (isNaN(Number(ts[i]))) return false;
    }
    return true;
  }

  if (isDate) {
    unix_ts = Math.floor(new Date(req.params.date).getTime());
    utc_tim = new Date(req.params.date).toUTCString();
  }
  else if(isTs(req.params.date)) {
    unix_ts = Number(req.params.date);
    utc_tim = new Date(unix_ts).toUTCString();
  }
  else {
    return res.json({error: "Invalid Date"});
  }
  return res.json({unix: unix_ts,
            utc: utc_tim});
});
