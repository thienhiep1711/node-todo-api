const { MongoClient, ObjectID } = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/todoapp', { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log('Unable connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('todoapp');
  // db.collection('Todos').find({
  //   _id: new ObjectID('5c99f727e2e0523b74e5f2a9')
  // }).toArray().then((docs) => {
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // })

  // const db = client.db('todoapp');
  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Total todos: ${count}`);
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // })

  db.collection('Users').find({
    name:'John'
  }).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
  })
  
  // client.close();
});