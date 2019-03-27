const { MongoClient, ObjectID } = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/todoapp', { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log('Unable connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('todoapp');
  
  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5c99f727e2e0523b74e5f2a9')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // })

    db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5c99f1894461b63840e38714')
  }, {
    $set: {
      name: 'ThienHiep'
    },
    $inc: {
      age: 12
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  })
  
  // client.close();
});