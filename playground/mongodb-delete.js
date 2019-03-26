const { MongoClient, ObjectID } = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/todoapp', { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log('Unable connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('todoapp');
  
  // deleteMany
  // db.collection('Todos').deleteMany({
  //   text:'Eat lunch'
  // }).then((result) => {
  //   console.log(result);
  // })

  // deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // })
  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // })

  db.collection('Users').findOneAndDelete({
    _id: new ObjectID('5c99f32e1c412942acf56d41')
  }).then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  })
  // client.close();
});