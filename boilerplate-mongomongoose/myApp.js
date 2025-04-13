require('dotenv').config();
let mongoose = require('mongoose');

let Person;

// creating a schema
// you can define type in 2 ways as below
// ref: https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/
// for more details
let personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
})

Person = mongoose.model('Person',personSchema);

// connecting to db
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// woah...
let person = new Person({
  name: "who-knows",
  age: 21,
  favoriteFoods: ["cold-pizza"]
});
const createAndSavePerson = (done) => {
  person.save((err,data)=> {
    if (err) return done(err);
    return done(null, data)
  });
  // done(null /*, data*/);
};

//maybe do this:
// Person.create(data) just lev this


// creating multiple records at once... 
// its sort of cofucious. take care 
// Model.create() takes 2 args; arrayOfPeople: array of records callback: the usual (err,data){if (err) return done(err) else return done(null,data)}


// let arrayOfPeople = 
// [{
//   name: "sh",
//   age: 22,
//   favoriteFoods: ["none"]
// },
// {
//   name: "kam",
//   age: 21,
//   favoriteFoods: ["some"]
// },
// {
//   name: "man",
//   age: 21,
//   favoriteFoods: ["maybe"]
// }];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,(err,data)=>{
    if (err) return done(err);
    done(null, data);
});
  
  // done(null /*, data*/);
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName},(err,data)=>{
    if (err) return console.log(done(err));
    done(null, data);
});
  // done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food },(err,data)=> {
    if (err) return done(err);
    return done(null,data)
  })
  // done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  Person.findById(personId,(err,data)=> {
    if (err) return done(err);
    return done(null,data)
  })
  // done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId,(err,data)=> {
    if (err) return done(err);
    console.log("@@",data);
    data.favoriteFoods.push(foodToAdd);
    data.save((err,data)=> {
      if (err) return done(err);
      return done(null,data);
  });
})

  // done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
