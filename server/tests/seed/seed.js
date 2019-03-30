const {ObjectID} = require('mongodb');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const jwt = require('jsonwebtoken');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
  _id: userOneId,
  email: 'thienhiep171193@gmail.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id:userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
},
{
  _id: userTwoId,
  email: 'nthienhiep93@gmail.com',
  password: 'userTwoPass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id:userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
}]

const todos = [{
  _id: new ObjectID(),
  title: 'First test todo',
  _creator: userOneId
},{
  _id: new ObjectID(),
  title: 'Second test todo',
  note: 'Note',
  completed:true,
  completedAt:123,
  _creator: userTwoId
}]


const populateUsers = (done) => {
  User.deleteMany({}).then(() => {
    var  userOne = new User(users[0]).save();
    var  userTwo = new User(users[1]).save();
    return Promise.all([userOne, userTwo])
  }).then(() => done());
}

const populateTodos = (done) => {
  Todo.deleteMany({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
}

module.exports = {todos, users, populateTodos ,populateUsers};