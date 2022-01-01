
exports.myinsert = (dbName, mycollection, insertData) => {
  const MongoClient = require('mongodb').MongoClient;
  const assert = require('assert');
  
  const url = 'mongodb://172.21.2.236:27017/190110910408';

  const client = new MongoClient(url, { useUnifiedTopology: true });
  client.connect(function (err) {

    const db = client.db(dbName);

    const collection = db.collection(mycollection);
    collection.insertMany(insertData, function (err, result) {

      if (err) console.log('Inserte fail!')

      else console.log("Inserted 3 documents into the collection");
      console.log(result);
      client.close();
    });

    //client.close();
  });
}

exports.myfind = (dbName, mycollection, findData, callback) => {
  const MongoClient = require('mongodb').MongoClient;
  const assert = require('assert');

  const url = 'mongodb://172.21.2.236:27017/190110910408';
  const client = new MongoClient(url, { useUnifiedTopology: true });
  client.connect(function (err) {

    const db = client.db(dbName);
    const collection = db.collection(mycollection);
    
    collection.find(findData).toArray(function (err, docs) {

      console.log(docs);
      callback(docs);
    });

  })
}
