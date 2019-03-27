
const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


// var id = '5c9b14a124a365521cccfd0b';

// if (!ObjectID.isValid()) {
//   console.log('ID not vaild');
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todo:', todos); 
// })

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo:', todo); 
// })

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo:', todo); 
// }).catch((e) => console.log(e))


User.findById('5c9aef15d2fd150734f2280c').then((user) => {
  if (!user) {
    return console.log('Unable to find User');
  }
  console.log(JSON.stringify(user, undefined, 2))
}, (e) => {
  console.log(e);
})