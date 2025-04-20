const express = require('express')
const app = express()

const cors = require('cors')
require('dotenv').config()

const bodyParser = require('body-parser')
const mongoose = require('mongoose')

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('public'));
app.get('/',(req,res)=> {
  res.sendFile(__dirname+'/views/index.html')
})

const listener = app.listen(3000,'0.0.0.0',()=>{
  console.log("Listening to port "+listener.address().port);
})

// mongoose setup
const UsersSchema = new mongoose.Schema({ username: String});
const Users = new mongoose.model("Users",UsersSchema);

const LogsSchema = new mongoose.Schema({
  userid: String,
  username: {
    type: String,
    required: false
  },
  description: String,
  duration: Number,
  date: Date
});
const Logs = new mongoose.model("Logs",LogsSchema);

console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)

// if you have func , keep here

async function addUser(req,res) {
  try{
  let user = await Users.findOne({username: req.body.username});
  if (!user) {
    user = await Users.create({username: req.body.username});
  }
  return res.json({username: user.username, _id: user._id});
  } catch(err) {
    console.log("E::",err);
    return res.json({error: "probably db error"})
  }
}

async function getUsers(res) {
  let allUsers = await Users.find({},{__v:0});
  return res.json(allUsers);
}

async function postExercise(req,res) {
  // verify _id 
  console.log(res.body);
  let userExists = await Users.findOne({_id:req.params._id});
  if (!userExists) return res.json({error: "User doesnt exist, add user first"});
  console.log(req.body.date,new Date().toUTCString());
  let exer_date = (req.body.date)?new Date(req.body.date).toUTCString():new Date().toUTCString();
  console.log('$#',exer_date);

  let exercise = await Logs.create({
    userid: req.params._id,
    description: req.body.description,
    duration: req.body.duration,
    date: exer_date
  });
  console.log(exercise);
  return res.json(exercise);
    
}

async function getLogs(req,res) {
  console.log('ido');
  let logs;
  let user = await Users.findOne({_id:req.params._id})
  let {from, to, limit} = req.query;
  console.log('foo',from,to,limit)
  if(from && to && limit) {
    console.log('qq');
    logs = await Logs.find({$and: [{userid: req.params._id},
                                {date: {$lte: new Date(from)}},
                                {date: {$gte: new Date(to)}}]},{__v:0,_id:0}).limit(limit);
    }
  else {
    console.log('noq');
    logs = await Logs.find({userid: req.params._id},{__v:0,_id:0});
  }
  return res.json({
    _id: user._id,
    username: user.username,
    logs: logs
  })
}



// till her

app.post('/api/users',(req,res)=> {
  addUser(req,res);
})

app.get('/api/users',(req,res)=> {
  getUsers(res);
})

app.post('/api/users/:_id/exercises',(req,res)=> {
  console.log('gf');
  postExercise(req,res);
  console.log("www");
})

app.get('/api/users/:_id/logs',(req,res)=> {
  getLogs(req,res);
})
