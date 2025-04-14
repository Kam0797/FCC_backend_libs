let express = require('express');
let app = express();
let cors = require('cors');

app.use(cors({optionsSuccessStatus: 200}));

app.use(express.static('public'));

let listener = app.listen(3000,'0.0.0.0',()=> {
  console.log("listening on port 3000");
})

app.get('/',(req,res)=> {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/whoami',(req,res)=> {
  res.json({"ipaddress": req.ip,"language": req.headers["accept-language"], software: req.headers["user-agent"] });
});
