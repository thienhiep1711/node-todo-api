const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text,

  })
  todo.save().then((doc) => {
    res.send(doc)
  }, (e) => {
    res.status(400).send(e);
  })
})

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  })
})


app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

app.delete('/todos/:id', (req, res) => {
  var id =  req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send(todo);
  }).catch((e) => {
    res.status(400).send();
  })
  // get the id

  // validate the id -> not valid? return 404

  // remove todo by id
    // success
        // if no doc sent 404
        // if doc, sent doc back with 200
    // error
        // 400 with empty body

})

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text','completed']);
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })

})

app.listen(port , () => {
  console.log(`Started on port ${port}`)
});





// var newTodo = new Todo({
//   text: 'Cook dinner',

// })

// newTodo.save().then((doc) => {
//   console.log('Save todo', doc);
// }, (e) => {
//   console.log('Unable to save todo');
// })

// var otherTodo = new Todo({
//   text:'    Edit this video',
// });

// otherTodo.save().then((doc) => {
//   console.log('Save todo:', doc);
// }, (e) => {
//   console.log('Unable to save todo', e);
// })


//User
//Email - requierd it - trim it, set type - set minlength of 1
// var user = new User({
//   email:'thienhiep171193@gmail.com'
// })

// user.save().then((doc) => {
//   console.log('Save todo:', doc);
// }, (e) => {
//   console.log('Unable to save todo', e);
// })

module.exports = {app};