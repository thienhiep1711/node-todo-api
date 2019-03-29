require('./config/config.js');

const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
  var todo = new Todo({
    title: req.body.title,
    note: req.body.note,
    _creator: req.user._id

  })
  todo.save().then((doc) => {
    res.send(doc)
  }, (e) => {
    res.status(400).send(e);
  })
})

app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  })
})


app.get('/todos/:id', authenticate,  (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

app.delete('/todos/:id', authenticate , (req, res) => {
  var id =  req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
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
  var body = _.pick(req.body, ['title', 'note', 'completed']);
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
    body.note = '';
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


/* 
USER MODEL
*/

// POST /user
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
    
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
})


app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user)
})

app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  })
})

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
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