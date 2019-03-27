const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.deleteMany({})
Todo.deleteMany({}).then((reslut) => {
  console.log(reslut);
}, (e) => {
  console.log('Unable to remove todos' , e)
})


// User.findOneAndRemove()
User.findByIdAndRemove('5c9b4775a22b023ad47feda6').then((user) => {
  console.log(user);
})