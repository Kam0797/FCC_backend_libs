let express = require('express');
let app = express();
require('dotenv').config()
let bodyParser = require('body-parser')
console.log("Hello World");

// sending a string -res.send("string")
// app.get('/',function(req,res) {
//     res.send('Hello Express');
// })

//logger -middleware function -place this before responses, respoonses before this line arent logged
app.use('/',function(req,res,next) {
    console.log(req.method+' '+req.path+" - "+req.ip);
    next()
})

// sending a file -res.sendFile("abs-path") -__dirname is Node global variable for server root path
app.get('/',function(req,res) {
    res.sendFile(__dirname + "/views/index.html");
})

// middleware 
app.use('/public',express.static(__dirname + "/public"))


// modifying response accord to .env variables
app.get('/json',function(req,res) {
    if(process.env.MESSAGE_STYLE == "uppercase") 
        res.json({"message":"HELLO JSON"});
    else
    res.json({"message":"Hello json"});
})

// conditional response
app.get('/now',function(req,res,next) {
    req.time = new Date().toString();
    next();
},function(req,res) {
    res.json({"time": req.time})
})

// getting route params input from user
// '/param_key/:param_value'
// param_key - has to be same in this function and user query
// :param_value - this str itself is the key in req.params and the str passed by user becomes its value
// that is, user request: server_url/word/some_word/
// and req.params = {"echo":"some_word"}
// the route in app.get() is as below - '/word/:echo'
// my note is not so good, this is what i can do for now
app.get('/word/:echo',(req,res)=> {
    res.json({"echo": req.params});
})

// getting query parameter
// this data goes to req.query objec
//
//
//
//
// t. i was looking at req.params, my bad
app.get('/name',(req,res) => {
    // console.log('#',req.params)
    res.json({"name":req.query.first+' '+req.query.last});
})

// body-parser
// see README.md
app.use(bodyParser.urlencoded({extended:false}));

// get data from POST requests
app.post('/name',(req,res)=> {
    // console.log('#',req.body);
    res.json({name:`${req.body.first} ${req.body.last}`});
    // console.log(req.headers);
})



















 module.exports = app;
