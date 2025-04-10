let express = require('express');
let app = express();
require('dotenv').config()

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

app.get('/now',function(req,res,next) {
    req.time = new Date().toString();
    next();
},function(req,res) {
    res.json({"time": req.time})
})


























 module.exports = app;
